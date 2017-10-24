var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var data = {spies: {}, users: {}};

var auth = require('./app/auth')();
var myRoutes = require('./app/routes');
auth.login()
    .then(function (token) {
        console.log(token);
        myRoutes(app, data, token);
        app.use(function (req, res) {
            res.status(404).send({url: req.originalUrl + ' not found'})
        });

        app.listen(port, () => {
            console.log('We are live on ' + port);
        });

    });



