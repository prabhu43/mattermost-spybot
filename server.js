// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var loki = require('lokijs');
var port = process.env.PORT || 8080;        // set our port

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var db = new loki('spybot.json');
var spies = db.addCollection('spies', { indices: ['victim'] });

// var routes = require('./app/routes/noteRoutes'); //importing route
// routes(app, db); //register the route

require('./app/routes')(app, db);

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port, () => {
  console.log('We are live on ' + port);
});