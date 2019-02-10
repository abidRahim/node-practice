const http = require('http');

// http.createServer((request, response) => {
//   if(request.method === 'POST' &&  request.url === '/echo') {
//     let body = [];
//     request.on('data', (chunk) => {
//       body.push(chunk);
//     }).on('end', () => {
//       body = Buffer.concat(body).toString();
//       response.end(body);
//     });
//   } else {
//     response.statusCode = 404;
//     response.end('error');
//   }
// }).listen(8000);



http.createServer((req, res) => {
  
	if (req.method === 'POST' && req.url === '/echo') {
		var buffer = '';
		req.on('data', (chunk) => {
			buffer += chunk.toString();
    });
    console.log("check");
    

		req.on('end', () => {
			// console.log(buffer);
			res.writeHead(200)
			res.end(buffer);
  	}); 
	} else {
    res.statusCode = 404;
    res.end();
  }
}).listen(8001);
