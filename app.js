var page = require('webpage').create(),
    server = require('webserver').create();
    
//Portion of the page being captured.
page.clipRect = { top: 0, left: 0, width: 1024, height: 768 };

//Size of the headless WebKit brower viewport.
page.viewportSize = {width: 1024, height: 768};

//Thumbnail reduction percentage.
page.zoomFactor = 0.25;
    
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
		  
		  console.log("Request completed")
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