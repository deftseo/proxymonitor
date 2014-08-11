var http     = require('http'),
    events   = require('events'),
    myIP     = require('my-ip'),
    util     = require('util'),
    stream   = require('stream'),
    localIP  = myIP(),
    checkUrl = 'http://www.goldenpirates.org/proxy/azenv.php',
    timeout  = 5000;


function ProxyChecker() {
    events.EventEmitter.call(this);
};

ProxyChecker.prototype.__proto__ = events.EventEmitter.prototype;

ProxyChecker.prototype.check = function(ipAddress, port) {
    var checker,
        proxy   = ipAddress + ':' + port,
        options = {
            host: ipAddress,
            port: port,
            path: checkUrl,
            method: 'GET'
        },
        self = this;

    checker = http.request(options, function(response) {
        var buffer = [];
        //console.log('STATUS: ' + response.statusCode);

        response.setEncoding('utf8');
        response.on('data', function(chunk) {
    	    buffer.push(chunk);
        });

        response.on('end', function() {
    	    var body = buffer.join(''),
                isRightContent = (body.indexOf('ctrlenv') !== -1),
                isListed = (body.indexOf(localIP) !== -1);

    	    if (isRightContent && isListed) {
                //console.log('[-FAIL-] Proxy ' + options.host + ':' + options.port);
                self.emit('fail', proxy, 'Proxy fail');
                self.emit('complete', proxy, 'fail');
            } else {
                //console.log('[-PASS-] Proxy ' + options.host + ':' + options.port);
                self.emit('pass', proxy, 'Proxy pass');
                self.emit('complete', proxy, 'pass');
            }
        });

        response.on('error', function(e) {
            //console.log('problem with response', proxy, e.message);
            self.emit('proxyError', proxy, e.message);
            self.emit('complete', proxy, 'error', e.message);
        });
    });

    checker.on('error', function(e) {
        //console.log('problem with request', proxy, e.message);
        self.emit('proxyError', proxy, e.message, e);
        self.emit('complete', proxy, 'error', e.message);
    });

    checker.setTimeout(timeout, function() {
        self.emit('proxyError', proxy, 'Proxy timeout');
        self.emit('complete', proxy, 'time');
        checker.abort();
    });

    checker.end();
};


/**
    StreamChecker -- Stream version of the checker
**/
function StreamChecker(options) {
    if (!(this instanceof StreamChecker)) {
        return new StreamChecker(options);
    }

    if (!options) {
        options = {};
    }

    options.objectMode = true;
    stream.Transform.call(this, options);

    this.status = {
        'pass': 'P',
        'fail': 'F',
        'time': 'T',
        'error': 'E'
    };
}

util.inherits(StreamChecker, stream.Transform);

StreamChecker.prototype._transform = function(proxy, enc, done) {
    var self = this,
        checker = new ProxyChecker();

    //console.log('Testing:', proxy.ipAddress + ':' + proxy.port);
    checker
        .on('complete', function(proxyTest, status, message) {
            var now = (new Date()).toJSON();
            
            if (!proxy.testResult) {
                //console.log(status, ':\t', proxyTest);
                process.stdout.write(self.status[status]);
                proxy.testResult = status;
                proxy.testDate   = now;
                self.push(proxy);
                done();
            } else {
                // Timeout raises time and error statuses
                //console.log('DUPE:', proxyTest, proxy.testResult, '=>', status);
            }
        })
        .check(proxy.ipAddress, proxy.port);

}



module.exports = {
    Checker: function() {
        return new ProxyChecker();    
    },

    StreamChecker: function() {
        return new StreamChecker();
    },

    check: function(ipAddress, port) {
        var checker = new ProxyChecker();

        process.nextTick(function() {
            checker.check(ipAddress, port);
        });

        return checker;
    },


    checkProxy: function(proxy, callback) {
        var checker = new ProxyChecker();
        checker.on('complete', function(proxyTest, status, message) {
            if (!proxy.testResult) {
                callback(proxyTest, status, message);
            }
        });
        checker.check(proxy.ipAddress, proxy.port);
    }
};
