var sqlite3 = require('sqlite3'), //.verbose(),
    fs      = require('fs'),
    //dsn        = ':memory:',
    dsn        = './var/data/proxy.db',
    db         = new sqlite3.Database(dsn),
    schemaFile = './etc/schema/db-schema.sql',
    isInit     = false,
    stmCache   = {};

var queries = {
    insert: "INSERT INTO `proxy` VALUES(NULL, $ipAddress, $port, $country, $status, $dateAdded, $dateUpdated, $testHistory, $testCount, $totalPass, $totalFail, $totalError, $totalTimeout);",
    updateTest: "UPDATE `proxy` SET status = $status, dateUpdated = $dateUpdated, testHistory = $testHistory, testCount = $testCount, totalPass = $totalPass, totalFail = $totalFail, totalError = $totalError, totalTimeout = $totalTimeout WHERE id = $id;",
    all: "SELECT * FROM `proxy` WHERE country NOT IN ('CN', 'TW', 'HK');",
    allNotCN: "SELECT * FROM `proxy` WHERE country NOT IN ('CN', 'TW', 'HK');",
    getByProxy: 'SELECT * FROM `proxy` WHERE ipAddress = $ipAddress and port = $port;',
    getLength: 'SELECT count(*) AS total FROM `proxy`;'
};


function withDb(done) {
    if (!isInit && dsn === ':memory:') {
        fs.readFile(
            schemaFile, { encoding: 'utf8' }, 
            function(err, schema) {
                //console.log('Executing schema from', schemaFile);
                db.exec(schema, function(err) {
                    if (err) {
                        console.log(err);
                    } else {
                        isInit = true;
                        done();
                    }
                });
            }
        );

    } else {
        isInit = true;
        done();
    }
};


function withStatement(stmName, callback) {
    var stm;

    if (stmCache[stmName]) {
        //console.log('Cache hit', stmName);
        stm = stmCache[stmName];
        callback(stm);
    } else if (queries[stmName]) {
        //console.log('Cache miss', stmName);
        sql = queries[stmName];
        stm = db.prepare(sql);
        stmCache[stmName] = stm;
        callback(stm);
    } else {
        //console.log('Unknown statment', stmName);
        throw new Error('Missing query name: ' + stmName);
    }
}


function getByProxy(proxy, callback) {
    withStatement('getByProxy', function(stm) {
        stm.get(
            { $ipAddress: proxy.ipAddress, $port: proxy.port },
            function(err, row) {
                if (err) {
                    // Make a note
                    console.log('Error', err);
                }

                callback(row);
            }
        );
    });
}


function getLength(callback) {
    db.get(
        queries.getLength,
        function(err, row) {
            if (err) {
                console.log('Error', err);
            }

            callback(row.total);
        }
    );
}


function createProxyInsertDoc(proxy) {
    var now = (new Date()).toJSON();

    var proxyDoc = {
        $ipAddress:    proxy.ipAddress,
        $port:         proxy.port,
        $country:      proxy.country      || '',
        $status:       proxy.status       || 'N',

        $dateAdded:    proxy.dateAdded    || now,
        $dateUpdated:  proxy.dateUpdated  || now,

        $testHistory:  proxy.testHistory  || '',
        $testCount:    proxy.testCount    || 0,
        $totalPass:    proxy.totalPass    || 0,
        $totalFail:    proxy.totalFail    || 0,
        $totalError:   proxy.totalError   || 0,
        $totalTimeout: proxy.totalTimeout || 0
    };

    return proxyDoc;
}


function createProxyTestUpdateDoc(proxy) {
    var proxyDoc = {
        $id:           proxy.id,
        $status:       proxy.status       || 'N',
        $dateUpdated:  proxy.dateUpdated  || now,
        $testHistory:  proxy.testHistory  || '',
        $testCount:    proxy.testCount    || 0,
        $totalPass:    proxy.totalPass    || 0,
        $totalFail:    proxy.totalFail    || 0,
        $totalError:   proxy.totalError   || 0,
        $totalTimeout: proxy.totalTimeout || 0
    };

    return proxyDoc;
}


function add(proxy, callback) {
    var newProxy = createProxyInsertDoc(proxy);

    withStatement('insert', function(stm) {
        stm.run(
            newProxy,
            function(err) {
                if (err) {
                    console.log('Error', err);
                }

                callback(proxy);
            }
        );
    });
}


function update(proxy, callback) {
    callback(proxy);
}


function updateTest(proxy, callback) {
    var updateProxy = createProxyTestUpdateDoc(proxy);

    if (proxy.id) {
        withStatement('updateTest', function(stm) {
            stm.run(
                updateProxy,
                function(err) {
                    if (err) {
                        console.log('Error', err);
                    }

                    callback(proxy);
                }
            );
        });
    }
}


function save(proxy, options, callback) {
    if (!callback) {
        callback = options;
        options  = {};
    }

    getByProxy(proxy, function(doc) {
        if (!doc) {
            process.stdout.write('A');
            add(proxy, callback);
        } else if (!options.skipUpdate) {
            process.stdout.write('U');
            //console.log('Updating proxy');
            update(proxy, callback);
        } else {
            callback();
        }
    });
};


function iterate(queryName, callback) {
    withStatement(queryName, function(stm) {
        stm.each(
            function(err, row) {
                if (err) {
                    console.log('Error', err);
                }

                callback(row);
            },
            function() {
                //console.log('row.end');
                callback(null);
            }
        );
    });
};





module.exports = {
    has:      false,

    save: function(proxy, callback) {
        withDb(function() {
            save(proxy, function() {
                callback();
            });
        });
    },

    updateTest: function(proxy, callback) {
        withDb(function() {
            updateTest(proxy, function() {
                callback();
            });
        });
    },

    add:      false,
    update:   false,

    length:   function(callback) {
        withDb(function() {
            getLength(callback);
        });
    },

    iterate: function(queryName, callback) {
        if (!callback) {
            callback = queryName;
            queryName = 'all';
        }

        if (!queries[queryName]) {
            queryName = 'all';
        }

        withDb(function() {
            iterate(queryName, function(iterator) {
                callback(iterator);
            });
        });
    }
};
