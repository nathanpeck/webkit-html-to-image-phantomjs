var page = require('webpage').create(),
    server = require('webserver').create();

service = server.listen(3000, function (request, response) {
		if(request.method == 'POST')
		{
      console.log(JSON.stringify(request, null, 4));
      response.statusCode = 200;
	    response.headers = {
	        'Cache': 'no-cache',
	        'Content-Type': 'application/json;charset=utf-8'
	    };
	    response.write(JSON.stringify(request, null, 4));
	  }
});