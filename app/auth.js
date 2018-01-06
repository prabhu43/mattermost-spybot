const https = require('https');
const Promise = require("promise");

var auth = function () {
    var spyId = process.env.SPY_ID;
    var spyPassword = process.env.SPY_PASSWORD;
    var mattermostHost = process.env.MATTERMOST_HOST;
    var mattermostPort = process.env.MATTERMOST_PORT;

    var loginData = {"login_id": spyId, "password": spyPassword};

    const loginReqOptions = {
        hostname: mattermostHost,
        port: mattermostPort,
        path: '/api/v4/users/login',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    var login = function () {
        return new Promise(function(resolve, reject){
            var loginReq = https.request(loginReqOptions, function (res) {
                var token = res.headers.token;
                res.setEncoding('utf8');
                res.on('data', function (body) {
                    console.log('Login successful');
                    console.log(token);
                    resolve(token);
                });
            });

            loginReq.write(JSON.stringify(loginData));
            loginReq.end();
        });

    };

    return {
        login: login
    };

};

module.exports = auth;