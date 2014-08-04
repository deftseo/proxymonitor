var fs         = require('fs'),
    proxyutils = require('../lib/proxyutils'),
    proxystore = require('../lib/proxystore'),
    dataDir    = './var/incoming/',
    inputFile  = dataDir + 'test-list.txt';


// Set up each pipe Transform
var inStream   = fs.createReadStream(inputFile),
    lineChunk  = proxyutils.lineChunker(),
    proxyParse = proxyutils.proxyParse(),
    proxySave  = proxystore.proxySaver();

// Connecting the streams.
// inStream -> lineChunk -> proxyParse -> proxyDump
inStream
    .pipe(lineChunk)
    .pipe(proxyParse)
    .pipe(proxySave)
    .on('finish', function() {
        console.log('Finished streaming');
        var dbDump = proxystore.dump();
        console.log("ProxyDB:", dbDump);
    });

