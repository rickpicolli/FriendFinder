// Dependencies - require packages installed
var express = require("express");
var bodyParser = require('body-parser');

//using express
var app = express();

var PORT = process.env.PORT || 8080;

app.use(express.static('./app/public'))




app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(bodyParser.text());
// app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

//importing information from the apiRoutes and htmlRoutes files
require('./app/routes/apiRoutes.js')(app);
require('./app/routes/htmlRoutes.js')(app);


app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});