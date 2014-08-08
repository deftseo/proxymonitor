var util   = require('util'),
    stream = require('stream'),
    dbStore,
    proxyLib;

// Fake a dbStore
//dbStore = require('./proxystore-hash');

// Sqlite dbStore
dbStore = require('./proxystore-sqlite');


// Generic storage utility methods
proxyLib = {
    newDoc: function(ipAddress, port) {
        return {
            ipAddress: ipAddress,
            port: port
        };
    },

    isProxyDoc: function(proxy) {
        var isDoc = false;

        if (proxy && proxy.id) {
            isDoc = true;
        }

        return isDoc;
    },

    prepareTestResult: function(proxy) {
        var result = proxy.testResult;

        switch(result) {
            case 'pass':
                proxy.status = 'P';
                proxy.totalPass++;
                break;
            case 'fail':
                proxy.status = 'F';
                proxy.totalFail++;
                break;
            case 'time':
                proxy.status = 'T';
                proxy.totalTimeout++;
                break;
            case 'error':
                proxy.status = 'E';
                proxy.totalError++;
                break;
        }

        proxy.testCount++;
        proxy.testHistory += proxy.status;
        proxy.testHistory = proxy.testHistory.slice(-255);
        proxy.dateUpdated = proxy.testDate;

        return proxy;
    },

    updateTestResult: function(proxy, callback) {
        if (!proxyLib.isProxyDoc(proxy)) {
            console.log('updateTestResult', "proxy isn't a document");
            callback();
        } else {
            proxy = proxyLib.prepareTestResult(proxy);
            dbStore.updateTest(proxy, callback);
            //console.log(proxy);
        }
    }
};


// Stream-capable proxy saver
function ProxySave(options) {
    if (!(this instanceof ProxySave)) {
        return new ProxySave(options);
    }

    if (!options) {
        options = {};
    }

    options.objectMode = true;
    stream.Transform.call(this, options);
}

util.inherits(ProxySave, stream.Transform);

ProxySave.prototype._transform = function(proxy, enc, done) {
    dbStore.save(proxy, function() {
        done();
    });
}


/**
    ProxyStream - stream through proxy documents
**/
function ProxyStream(options) {
    var self = this;

    if (!(this instanceof ProxyStream)) {
        return new ProxyStream(options);
    }

    if (!options) {
        options = {};
    }

    options.objectMode = true;
    stream.Readable.call(this, options);

    this.isActive = true;
    this.proxies = [];
    this.pause();

    dbStore.iterate(function(proxy) {
        self.proxies.push(proxy);

        if (!proxy) {
            self.resume();
        }
    });
}

util.inherits(ProxyStream, stream.Readable);

ProxyStream.prototype._read = function() {
    var self = this, next;

    if (self.proxies.length) {
        next = self.proxies.shift();
        self.push(next);
    }
}


module.exports = {
    newProxy: proxyLib.newDoc,

    proxySaver: function() {
        return new ProxySave();
    },

    proxyStream: function() {
        return new ProxyStream();
    },

    save: function(proxy, callback) {
        dbStore.save(proxy, callback);
    },
   
    dump: function() {
        return dbStore.dump();
    },

    length: function(callback) {
        dbStore.length(callback);
    },

    //iterator: function() {
    //    return dbStore.iterator();
    //},


    iterate: function(callback) {
        dbStore.iterate(callback);
    },


    updateTestResult: proxyLib.updateTestResult
};
