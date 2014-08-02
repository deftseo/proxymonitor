var proxycheck = require('../lib/proxycheck'),
    utils      = require('../lib/proxyutils'),
    proxy      = utils.parseProxy('5.135.58.225 7808');


proxycheck.check(proxy.ipAddress, proxy.port)
    .on('pass', function(proxy, message) {
        console.log('[-PASS-]', proxy);
    })
    .on('fail', function(proxy, message) {
        console.log('[-FAIL-]', proxy, message);
    })
    .on('proxyError', function(proxy, message) {
        console.log('[ERROR-]', proxy, message);
    });

