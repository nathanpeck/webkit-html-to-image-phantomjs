var Page = require('webpage'),
    server = require('webserver').create();
    
function error(response,errorMessage)
{
	response.statusCode = 200;
  response.headers = {
      'Cache': 'no-cache',
      'Content-Type': 'text/plain;charset=utf-8'
  };
  response.write(errorMessage);
  response.close();
}

service = server.listen(3000, function (request, response) {
	if(request.method == 'POST')
	{
		if(request.headers['Content-Type']=='text/html')
		{
		  console.log("HTML body received");			
		  
		  var page = Page.create();
		  
		  page.viewportSize = { width: 1024, height: 768 };
		  			
			console.log("Downloading");
			page.setContent(request.post,'');
			
			page.evaluate(function() {
		    document.body.bgColor = 'white';
			});
			
			page.onLoadFinished = function(status) {
				console.log("Rendering");
				imageData = page.renderBase64('PNG');
				
				response.statusCode = 200;
			  response.headers = {
			      'Cache': 'no-cache',
			      'Content-Type': 'image/png'
			  };
			  response.write(imageData);
			  response.close();
			  
  		  console.log("Request completed")
			};
		}
		else
		{
			console.log("POST received but the Content-Type header was not correct");
		  error(response,"Header value Content-Type should be set to text/html");			
		}
	}
	else
	{
		console.log("Non-POST request received");
	  error(response,"Usage: Send a POST body containing the HTML to render. Be sure to set the Content-Type header to text/html");
	}
});