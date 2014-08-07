var util   = require('util'),
    stream = require('stream'),
    ip2cc  = require('ip2cc');


/**
    parseProxy -- parses a string looking for a proxy server. Currently supports:
        127.0.0.1   8192
        127.0.0.1:8192

    @returns proxy object containing two properties:
        * ipAddress
        * port
**/
parseProxy = function (proxyString) {
    var proxy, found;

    if (proxyString.indexOf(':') > -1) {
        found = proxyString.split(':');
        proxy = {
            ipAddress: found[0],
            port: found[1]
        };
    }
    else if (found = proxyString.match(/(\d+\.\d+\.\d+\.\d+)\s+(\d+)/)) {
        proxy = {
            ipAddress: found[1],
            port: found[2]
        };
    }

    return proxy;
}


/**
    LineChunk - a Transform stream that takes a chunk of text and breaks it
        down into separate lines.
**/
function LineChunk(options) {
    if (!(this instanceof LineChunk)) {
        return new LineChunk(options);
    }

    stream.Transform.call(this, options);
}

util.inherits(LineChunk, stream.Transform);

LineChunk.prototype._transform = function(chunk, enc, done) {
    var data = chunk.toString(),
        lines,
        self = this;

    if (this.lastLine) {
        data = this.lastLine + data;
        this.lastLine = null;
    }

    lines = data.split("\n");
    //console.log('LineChunk received', lines.length, 'items');
    this.lastLine = lines.pop();

    lines.map(function(line) {
        //console.log('Line:', line);
        self.push(line);
    });

    done();
}

LineChunk.prototype._flush = function(done) {
    if (this.lastLine) {
        this.push(this.lastLine);
        this.lastLine = null;
    }
    done();
}


/**
    ProxyParse - a Transform stream that takes a string and converts it into a
        Proxy object (with ipAddress and port properties).
**/
ProxyParse = function(options) {
    if (!(this instanceof ProxyParse)) {
        return new ProxyParse(options);
    }

    if (!options) {
        options = {};
    }
    options.objectMode = true;


    stream.Transform.call(this, options);
}

util.inherits(ProxyParse, stream.Transform);

ProxyParse.prototype._transform = function(chunk, enc, done) {
    var proxy = parseProxy(chunk.toString());
    this.push(proxy);
    done();
}


/**
    CountryLookup -- takes a Proxy object and updates it with the country code the
        IP address belongs to.
**/
CountryLookup = function(options) {
    if (!(this instanceof CountryLookup)) {
        return new CountryLookup(options);
    }

    if (!options) {
        options = {};
    }

    options.objectMode = true;
    
    stream.Transform.call(this, options);
};

util.inherits(CountryLookup, stream.Transform);

CountryLookup.prototype._transform = function(proxy, enc, done) {
    var self = this;

    ip2cc.lookUp(proxy.ipAddress, function(ipAddress, country) {
        //console.log('Country of', proxy.ipAddress, '\tis', country);
        if (country) {
            proxy.country = country;
        } else {
            proxy.country = 'ZZ';
        }

        self.push(proxy);
        done();
    });
};



/**
    ProxyDedupe -- filters out proxies we already have seen in this import.
**/
ProxyDedupe = function(options) {
    if (!(this instanceof ProxyDedupe)) {
        return new ProxyDedupe(options);
    }

    if (!options) {
        options = {};
    }

    options.objectMode = true;
    
    stream.Transform.call(this, options);
    this.seen = {};
};

util.inherits(ProxyDedupe, stream.Transform);

ProxyDedupe.prototype._transform = function(proxy, enc, done) {
    var proxyKey = proxy.ipAddress + ':' + proxy.port;

    if (!this.seen[proxyKey]) {
        this.push(proxy);
        this.seen[proxyKey] = 1;
    }
        
    done();
}




module.exports = {
    parseProxy: parseProxy,

    lineChunker: function() {
        return new LineChunk();
    },

    proxyParse: function() {
        return new ProxyParse();
    },

    countryLookup: function() {
        return new CountryLookup();
    },

    proxyDedupe: function() {
        return new ProxyDedupe();
    }
}
