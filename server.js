var gm 				= require('gm'),
		express 	= require('express'),
		bunyan		= require('bunyan');
		
var app = express(),
		log = bunyan.createLogger({name: "phantom"});

log.info("Starting Phantom.js service...");

var phantom = require('child_process').spawn('./phantom.sh');

//Wait until we get a launched response from phantom.js before we start our own web server.
phantom.stdout.on('data', function (data) {
	var data = new Buffer(data);
	var data = data.toString();
	lines = data.split(/(\r?\n)/g);
  log.info(lines[0]);
  
  if(lines[0].indexOf("Phantom.js server running") > -1)
  {
	  log.info("Starting web server...");
	  
	  //Parser for extracting the raw POST body full of text/html
	  app.use (function(req, res, next) {
	    var data='';
	    req.setEncoding('utf8');
	    req.on('data', function(chunk) { 
				data += chunk;
	    });
	
	    req.on('end', function() {
        req.body = data;
        next();
	    });
		});
	  
	  //Route for accepting HTML and returning image data.
	  app.post('/', function(req, res) {
	  	if(req.headers['content-type'] == 'text/html')
	  	{
		  	log.info("Sending HTML to the Phantom.js process");
		  	
		  	console.log('test');
		  	
			  res.json({'good': req.body});
	  	}
	  	else
	  	{
		  	log.info("Bad POST. Expected Content-Type: text/html");		  	
			  res.json({'error': 'Expected header Content-Type: text/html'});
	  	}
		  res.end();
		});
		
		//Start the server
		app.listen('3001', function (server) {
			log.info("Server started and listening...");
		});
  }
});

phantom.on('exit', function (code) {
  log.info("Phantom.js service exited with code: " + code);
  log.info("Closing server because child Phantom.js process has closed");
  process.exit(1);
});

process.on('SIGTERM', function() {
  log.info("Ending the Phantom.js process");
  phantom.kill();
});