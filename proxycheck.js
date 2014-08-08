var proxystore = require('./lib/proxystore'),
    proxycheck = require('./lib/proxycheck'),
    scheduler  = require('./lib/scheduler'),
    schedule;


function testProxy(proxy, done) {
    var checker;

    console.log('Testing', proxy.ipAddress + ':' + proxy.port);
    proxycheck.checkProxy(proxy, function(proxyTest, status, message) {
        var now = (new Date()).toJSON();

        if (!proxy.testResult) {
            proxy.testResult = status;
            proxy.testDate   = now;
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

