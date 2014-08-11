var proxystore = require('./lib/proxystore'),
    schedule;


proxystore.iterate('allUkie', function(proxy) {
    if (proxy && proxy.status === 'P' && proxy.testHistory.match(/P{4}$/)) {
        console.log(JSON.stringify(proxy));
    }
});

