var util   = require('util'),
    stream = require('stream'),
    dbStore,
    proxyLib;

// Fake a dbStore
dbStore = require('./proxystore-hash');

// Generic storage utility methods
proxyLib = {
    newDoc: function(ipAddress, port) {
        return {
            ipAddress: ipAddress,
            port: port
        };
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
    if (!dbStore.has(proxy)) {
        response = dbStore.add(proxy);
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

        if (!dbStore.has(proxy)) {
            response = dbStore.add(proxy);
        }

        return response;
    },
   
    dump: function() {
        return {};
    },

    length: function() {
        return dbStore.length()
    },

    iterator: function() {
        return dbStore.iterator();
    }

};
