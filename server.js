// Dependencies - require packages installed
var express = require("express");
var bodyParser = require('body-parser');
var path = require('path');

//using express
var app = express();
var PORT = process.env.PORT || 8080;


//importing information from the apiRoutes and htmlRoutes files
var apiRoutes = require('./app/routes/apiRoutes.js')(app);
var htmlRoutes = require('./app/routes/htmlRoutes.js')(app);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));



app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});