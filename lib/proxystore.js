var util   = require('util'),
    stream = require('stream');

// Generic storage utility methods
var proxyLib = {
    newDoc: function(ipAddress, port) {
        return {
            ipAddress: ipAddress,
            port: port
        };
    }
};


// Fake persistent data store
var dbHash = {},
    dbHashLib = {
    createKey: function(proxy) {
        return proxy.ipAddress + ':' + proxy.port;
    },


    has: function(proxy) {
        var hashKey = this.createKey(proxy);
        return !!(dbHash[hashKey]);
    },


    add: function(proxy) {
        var hashKey = this.createKey(proxy);
        dbHash[hashKey] = proxy;
        return true;
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
    //console.log('ProxySave', proxy);
    if (!dbHashLib.has(proxy)) {
        response = dbHashLib.add(proxy);
    }

    done();
}



module.exports = {
    newProxy: proxyLib.newDoc,

    proxySaver: function() {
        return new ProxySave()
    },

    add: function(proxy) {
        var response = false;

        if (!dbHashLib.has(proxy)) {
            response = dbHashLib.add(proxy);
        }

        return response;
    },
   
    // For debugging: return array of proxies. 
    dump: function() {
        return dbHash;
    },

    // Iterate through all known proxies. possibly crazy
    iterator: function() {
        var i = 0,
            keys = Object.keys(dbHash),
            j = keys.length;

        function getNextKey() {
            var key, nextKey;

            if (i < j) {
                do {
                    nextKey = keys[i];
                    i++;
                } while (i < j && !dbHash.hasOwnProperty(nextKey));

                key = nextKey;
            }

            return key;
        }

        function getNextValue() {
            var key,
                value;

            key = getNextKey();
            if (key) {
                value = dbHash[key];
            }

            return value;
        }

        return function() {
            var value = getNextValue();
            return value;            
        }
    }

};
