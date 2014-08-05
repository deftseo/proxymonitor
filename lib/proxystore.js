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
    dbStore.save(proxy);
    done();
}



module.exports = {
    newProxy: proxyLib.newDoc,

    proxySaver: function() {
        return new ProxySave()
    },

    save: function(proxy) {
        return dbStore.save(proxy);
    },
   
    dump: function() {
        return dbStore.dump();
    },

    length: function() {
        return dbStore.length()
    },

    iterator: function() {
        return dbStore.iterator();
    }
};
