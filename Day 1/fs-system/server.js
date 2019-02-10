var http = require('http');
var path = require('path');
var fs = require('fs');
var url = require('url');
var userPath = path.join(__dirname, 'user/');
const port = 8000;

http.createServer((request, response) => {
  console.log("Inside create server")
  var pathUrl = url.parse(request.url, true);
  let body = "";
  request.on('data', (chunk) => {
    body += chunk.toString();
  });
  request.on('end', () => {
    if(request.method === 'POST' &&  pathUrl.pathname === '/user') {
      console.log("run POST");
      
      var userData = JSON.parse(body);
      fs.open(userPath + userData.username + '.json' , 'wx', (err, fd) => {
            if(err) {
              console.log(err);
              response.end(JSON.stringify(err));
            } else {
              fs.writeFile(fd, JSON.stringify(userData), (err) => {
                if(err) {
                  console.log(err);
                }
                fs.close(fd, (err) => {
                  if(err) console.log("Cannot close the file");
                  response.end(JSON.stringify(userData));
                });
            });
          }
        });
    }
    else if (request.method === 'GET' && pathUrl.pathname == '/user') {
      var username = pathUrl.query.username;
      fs.readFile(userPath + username + '.json', 'utf8', (err, data) => {
        if(err) console.log('could not read file')
        response.end(data)
      })
    }
    
    else if (request.method === 'PUT' && pathUrl.pathname === '/user') {
      var userData = JSON.parse(body);
      fs.open(userPath + userData.username + '.json', 'r+', (err, fd) => {
        if(err) {
          console.log('File does not exist');
        } else {
          fs.ftruncate(fd, (err) => {
            if(err) console.log('Cannot truncate file');
          })
          fs.writeFile(fd, JSON.stringify(userData), (err) => {
            if(err) {
              console.log(err);              
            }
            fs.close(fd, (err) => {
              if(err) console.log("Cannot close the file");
              response.end(JSON.stringify(userData));
            })
          })
        }
      })
    }

    else if (request.method === 'DELETE' && pathUrl.pathname === '/user') {
      var username = pathUrl.query.username;
      fs.unlink(userPath + username + '.json', (err) => {
        console.log(userPath + username + '.json');        
        if(err) console.log("Cannot unlink/delete file");
        response.end(`${username} has been deleted`);
      })
    }
    
    else {
      response.statusCode = 404;
      response.end('error');
    }
  });
   
}).listen(port, () => {
  console.log(`Server running on ${port}`);
});
