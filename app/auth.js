const http = require('http');
const Promise = require("promise");

var auth = function () {
    var loginData = {"login_id": "j.prabhu91@gmail.com", "password": "!abcd1234"};

    const loginReqOptions = {
        hostname: 'ec2-13-126-112-247.ap-south-1.compute.amazonaws.com',
        port: 8065,
        path: '/api/v4/users/login',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    var login = function () {
        return new Promise(function(resolve, reject){
            var loginReq = http.request(loginReqOptions, function (res) {
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
    }

};

module.exports = auth;