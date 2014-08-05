var util   = require('util'),
    stream = require('stream'),
    ip2cc  = require('ip2cc');


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
        console.log('Country of', proxy.ipAddress, '\tis', country);
        if (country) {
            proxy.country = country;
        } else {
            proxy.country = 'ZZ';
        }

        self.push(proxy);
        done();
    });
};



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
    }
}
