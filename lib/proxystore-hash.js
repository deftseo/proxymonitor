
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


        save: function(proxy) {
            var response = false;

            if (!dbHashLib.has(proxy)) {
                response = dbHashLib.add(proxy);
            }

            return response;
        },


        add: function(proxy) {
            var hashKey = this.createKey(proxy);
            dbHash[hashKey] = proxy;
            return true;
        },

        // For debugging: return array of proxies
        dump: function() {
            return dbHash;
        },

        length: function() {
            var keys = Object.keys(dbHash);
            return keys.length;
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
