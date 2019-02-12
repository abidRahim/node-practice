var express = require('express');
var app = express();
var cookie = require('cookie-parser');
var path = require('path');
var ejs =  require('ejs');

app.use( express.json() );   // To parse JSON Data
app.use(express.urlencoded({extended: false})); // To parse form data
app.use(cookie());
// app.use(express.static('Project'));


//Custom middleware to Save cookie
app.use((req, res, next) => {
  res.cookie('name', '{hari: check, ravi: check');  
  next();
})

// Custom built middleware
app.use((req, res, next) => {
  console.log(req.method, req.path, res.statusCode);
  next();
})

// Setting templating engine
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');


//POST request
app.post('/', (req, res) => {
  res.send(req.body);
  console.log(req.body);
  req.cookies();
});

//Using EJS to display content
app.get('/', function(req, res){ 
  res.render('index', {
    headerTitle:"Index Node",
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
  });
});

app.listen('3000', () => {
  console.log("runing on port 3000");  
})




/* res.send
res.sendFile
res.render */