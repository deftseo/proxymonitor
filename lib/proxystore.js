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


    updateTestResult: function(proxy, callback) {
        callback();
    }
};
