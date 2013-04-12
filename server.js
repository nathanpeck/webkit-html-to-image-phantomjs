var gm 				= require('gm'),
		express 	= require('express'),
		bunyan = require('bunyan');
		
var app = express(),
		log = bunyan.createLogger({name: "phantom"});

log.info("Starting service...");

app.post('/', function(req, res) {
  res.send('hello world');
});

app.listen('127.0.0.1', '8080', function (server) {
	log.info("Server started and listening...");
});
