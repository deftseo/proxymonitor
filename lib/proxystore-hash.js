
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


        save: function(proxy, callback) {
            if (!dbHashLib.has(proxy)) {
                dbHashLib.add(proxy, callback);
            } else {
                dbHashLib.update(proxy, callback);
            }
        },


        add: function(proxy, callback) {
            var hashKey = this.createKey(proxy);
            dbHash[hashKey] = proxy;
            callback();
        },


        update: function(proxy, callback) {
            var hashKey = this.createKey(proxy);
            dbHash[hashKey] = proxy;
            callback();
        },

        // For debugging: return array of proxies
        dump: function() {
            return dbHash;
        },

        length: function(callback) {
            var keys = Object.keys(dbHash);
            callback(keys.length);
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
            };

            function getNextValue() {
                var key,
                    value;

                key = getNextKey();
                if (key) {
                    value = dbHash[key];
                }

                return value;
            };

            return function() {
                var value = getNextValue();
                return value;            
            }
        }
    };


module.exports = dbHashLib;
