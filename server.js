var express = require("express");

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var defaultMode = 'physics';//'physics';
var mode = process.env.NODE_MODE || defaultMode; // Custom mode

var app = express();
var config = require('./server/config/'+mode+'/config')[env];

require('./server/config/'+mode+'/express')(app, config);
require('./server/config/'+mode+'/mongoose')(config);
require('./server/config/'+mode+'/passport')();
require('./server/config/'+mode+'/routes')(app);

process.on('uncaughtException', function(err) {
	console.log('Error server');
    console.log(err);
});

app.listen(config.port);
console.log('MODE: ' + mode + ' ...');
console.log('Listening on port: ' + config.port + ' ...');