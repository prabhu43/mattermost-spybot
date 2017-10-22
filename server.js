// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var loki = require('lokijs');
var port = process.env.PORT || 8080;        // set our port
const WebSocket = require('ws');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var db = new loki('spybot.json');
var spies = db.addCollection('spies', { indices: ['victim'] });


const ws = new WebSocket('ws://ec2-13-126-112-247.ap-south-1.compute.amazonaws.com:8065/api/v4/websocket');

ws.on('open', function open() {
  console.log('websocket opened');
  var token = 'ikuki4ce6tfdjqr88yekia39ky';
  var challenge = {
              "action": "authentication_challenge",
              "data": {
                "token": token
              },
              "seq": 1
            };
    ws.send(JSON.stringify(challenge));
});

ws.on('message', function open(data) {
  console.log('message');
  console.log(data);
});


require('./app/routes')(app, db, ws);

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});


app.listen(port, () => {
  console.log('We are live on ' + port);
});