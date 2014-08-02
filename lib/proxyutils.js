

module.exports = {
    parseProxy: function (proxyString) {
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
}
