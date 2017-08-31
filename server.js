var http = require('http');
var static = require('node-static');
var file = new static.Server('.');
var PORT_NUMBER = 8080;

http.createServer(function (req, res) {
    file.serve(req, res);
}).listen(PORT_NUMBER);

console.log('Server running on port ' + PORT_NUMBER);