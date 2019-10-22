var http = require('http');
var port = 8180;

var httpModule = require('./modules/http-module');

/**
 * The host parameter is changed to `0.0.0.0` so that the app
 * can be accessed outside of container.
 */
http.createServer(httpModule.handleRequest).listen(8180, '0.0.0.0', () => {
  console.log('Started Node.js http server at http://0.0.0.0:8180');
});
