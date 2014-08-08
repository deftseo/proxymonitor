var proxystore = require('../lib/proxystore'),
    proxycheck = require('../lib/proxycheck');


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
    this.testStats    = {};
    this.total        = 0;
}

util.inherits(Summariser, stream.Transform);

Summariser.prototype._transform = function(proxy, enc, done) {
    var country, testResult;

    this.total++;

    if (proxy.country) {
        country = proxy.country;
        if (!this.countryStats[country]) {
            this.countryStats[country] = 0;
        }
        this.countryStats[country]++;
    }

    if (proxy.testResult) {
        testResult = proxy.testResult;
        if (!this.testStats[testResult]) {
            this.testStats[testResult]=0;
        }
        this.testStats[testResult]++;
    }


    this.push(proxy);
    done();
}

Summariser.prototype.summarise = function() {
    if (this.countryStats) {
        console.log('Country Stats', this.countryStats);
    }


    if (this.testStats) {
        console.log('Test Stats', this.testStats);
    }

    console.log('Total', this.total);
}



var inStream  = proxystore.proxyStream(),
    checker   = proxycheck.StreamChecker(),
    summarise = new Summariser;


console.log('Testing proxies from proxystore');

inStream
    .pipe(checker)
    .pipe(summarise)
    .on('finish', function() {
        process.stdout.write('\n');
        console.log('Finished streaming');

        summarise.summarise();
    });
