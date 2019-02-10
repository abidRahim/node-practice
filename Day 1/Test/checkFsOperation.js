var http = require('http');
var path = require('path');
var fs = require('fs');

http.createServer((request, response) => {
  console.log(path.parse(request.url));
  if(request.method === 'POST' &&  request.url === '/user') {
    let body = "";
    request.on('data', (chunk) => {
      body += chunk.toString();
    }).on('end', () => {
      console.log(body);
        fs.open(__dirname + '/user' + '/what.json' , 'wx+', (err, data) => {
          console.log(err.code);
          console.log(data.toString());
          
          fs.read(fd, (err, file) => {
            console.log(file);
          })
          fs.writeFile(file, (err, file) => {
            console.log(file);
          })
          
        });
    });
  } else {
    response.statusCode = 404;
    response.end('error');
  }
}).listen(8000);


