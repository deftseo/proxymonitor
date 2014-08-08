var fs         = require('fs'),
    proxyutils = require('./lib/proxyutils'),
    proxystore = require('./lib/proxystore'),
    dataDir    = './var/incoming/',
    inputFile  = dataDir + 'test-list.txt';


if (process.argv.length > 2) {
    if (fs.existsSync(process.argv[2])) {
        inputFile = process.argv[2];
        console.log('Input file', inputFile);
    }
}


var util   = require('util'),
    stream = require('stream');

function Summariser(options) {
    if (!(this instanceof Summariser)) {
        return new Summariser(options);
    }

    if (!options) {
        options = {};
    }

    options.objectMode = true;
    stream.Transform.call(this, options);

    this.countryStats = {};
}

util.inherits(Summariser, stream.Transform);

Summariser.prototype._transform = function(proxy, enc, done) {
    var country = proxy.country;

    if (!this.countryStats[country]) {
        this.countryStats[country] = 0;
    }
    this.countryStats[country]++;

    this.push(proxy);
    done();
}

Summariser.prototype.summarise = function() {
    var keys = Object.keys(this.countryStats),
        total = 0,
        i, j;

    keys.sort();

    for (i = 0, j = keys.length; i < j; i++) {
        var key = keys[i],
            value = this.countryStats[key];

        console.log(key, ':', value);
        total += value;
    }

    console.log('Total:', total);
}


// Set up each pipe Transform
var inStream    = fs.createReadStream(inputFile),
    lineChunk   = proxyutils.lineChunker(),
    proxyParse  = proxyutils.proxyParse(),
    proxyDedupe = proxyutils.proxyDedupe(),
    countryIp   = proxyutils.countryLookup(),
    summariser  = new Summariser(),
    proxySave   = proxystore.proxySaver();

console.log('Importing proxies into proxy store');

// Connecting the streams.
// inStream -> lineChunk -> proxyParse -> dupe filter -> country/ip ->  proxySave
inStream
    .pipe(lineChunk)
    .pipe(proxyParse)
    .pipe(proxyDedupe)
    .pipe(countryIp)
    .pipe(summariser)
    .pipe(proxySave)
    .on('finish', function() {
        process.stdout.write('\n');
        console.log('Finished streaming');

        proxystore.length(function(length) {
            console.log('ProxyStore:', length, 'proxies stored');
        });

        summariser.summarise();
    });

