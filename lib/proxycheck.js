var http     = require('http'),
    events   = require('events'),
    myIP     = require('my-ip'),
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
                isListed = (body.indexOf(localIP) !== -1);

    	    if (isListed) {
                //console.log('[-FAIL-] Proxy ' + options.host + ':' + options.port);
                self.emit('fail', proxy, 'Proxy fail');
            } else {
                //console.log('[-PASS-] Proxy ' + options.host + ':' + options.port);
                self.emit('pass', proxy, 'Proxy pass');
            }
        });

        response.on('error', function(e) {
            //console.log('problem with response', proxy, e.message);
            self.emit('proxyError', proxy, e.message);
        });
    });

    checker.on('error', function(e) {
        //console.log('problem with request', proxy, e.message);
        self.emit('proxyError', proxy, e.message, e);
    });

    checker.setTimeout(timeout, function() {
        self.emit('proxyError', proxy, 'Proxy timeout');
    });

    checker.end();
};



module.exports = {
    Checker: function() {
        return new ProxyChecker();    
    },

    check: function(ipAddress, port) {
        var checker = new ProxyChecker();

        process.nextTick(function() {
            checker.check(ipAddress, port);
        });

        return checker;
    }
};
