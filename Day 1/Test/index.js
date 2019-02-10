process.env.UV_THREADPOOL_SIZE = 5;

var crypto = require('crypto');


var start = Date.now();

crypto.pbkdf2('user2121', 'user', 100000, 512, 'sha512', (err, hashed) => {
  
  console.log(Date.now() - start);
  
  
})
crypto.pbkdf2('user2121', 'user', 100000, 512, 'sha512', (err, hashed) => {
  
  console.log(Date.now() - start);
  
  
})

// var start2 = Date.now();
crypto.pbkdf2('user2121', 'user', 100000, 512, 'sha512', (err, hashed) => {
  
  console.log(Date.now() - start);
  
  
})
crypto.pbkdf2('user2121', 'user', 100000, 512, 'sha512', (err, hashed) => {
  
  console.log(Date.now() - start);
  
  
})
crypto.pbkdf2('user2121', 'user', 100000, 512, 'sha512', (err, hashed) => {
  
  console.log(Date.now() - start);
  
  
})
crypto.pbkdf2('user2121', 'user', 100000, 512, 'sha512', (err, hashed) => {
  
  console.log(Date.now() - start);
  
  
})

console.log(process);