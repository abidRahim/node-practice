var http = require('http');
var path = require('path');
var fs = require('fs');

var pathName = path.join(__dirname, 'public');

http.createServer( (req, res) => {
  console.log(req.url)
  if(req.url.match('/')) {
    fs.readFile(pathName + '/index.html', 'UTF-8', (err, html) => {
      res.writeHead(200, {"Content-type": "text/html"});
      res.end(html);
    });
  }
  if(req.url.split('.').pop() == "css") {
    res.writeHead(200, {"Content-type": "text/css"});
    fs.createReadStream(pathName + req.url).pipe(res);
  }
  if(req.url.split('.').pop() === "png") {
    res.writeHead(200, {"Content-type": "image/png"});
    fs.createReadStream(pathName + req.url).pipe(res);
  }
  if(req.url.split('').pop() === "ico") {
    res.writeHead(200, {"Content-type": "image/ico"});
    fs.createReadStream(pathName + req.url).pipe(res);
  }
}).listen(3000, () => {
  console.log("running on port 3000");  
});
