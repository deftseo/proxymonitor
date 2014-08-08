var proxystore = require('./lib/proxystore'),
    proxycheck = require('./lib/proxycheck'),
    scheduler  = require('./lib/scheduler'),
    schedule;


function testProxy(proxy, done) {
    var checker;

    console.log('Test Proxy', proxy.ipAddress + ':' + proxy.port);
    proxycheck.checkProxy(proxy, function(proxyTest, status, message) {
        if (!proxy.testResult) {
            proxy.testResult = status;
            proxystore.updateTestResult(proxy, done);
        }
    });
}

schedule = scheduler.Scheduler(testProxy);


proxystore.iterate(function(proxy) {
    if (proxy) {
        schedule.add(proxy);
    } else {
        schedule.start();
    }
});

