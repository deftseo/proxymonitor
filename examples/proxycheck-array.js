var proxycheck = require('../lib/proxycheck'),
    utils      = require('../lib/proxyutils'),
    checker    = proxycheck.Checker();


var proxyList = [
    '85.232.4.253:8118',
    '185.12.12.181:7808',
    '5.135.58.225:7808',
    '178.21.112.27:3128',
    '162.13.94.96:80',
    '188.142.13.100:80',
    '160.92.52.106:80',
    '31.216.36.219:3128',
    '217.123.118.155:80',
    '160.92.52.105:80',
    '160.92.52.105  80'
];



checker
    .on('pass', function(proxy, message) {
        console.log('[-PASS-]', proxy);
    })
    .on('fail', function(proxy, message) {
        console.log('[-FAIL-]', proxy, message);
    })
    .on('proxyError', function(proxy, message) {
        console.log('[ERROR-]', proxy, message);
    });


proxyList.map(function(item) {
    var proxy = utils.parseProxy(item);
    checker.check(proxy.ipAddress, proxy.port);
});

