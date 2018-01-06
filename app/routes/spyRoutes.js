const https = require('https');
const Promise = require("promise");

module.exports = function (app, data, token) {

    var spies = data.spies;
    var users = data.users;
    var mattermostHost = process.env.MATTERMOST_HOST;
    var mattermostPort = process.env.MATTERMOST_PORT;

    app.get('/users', (req, res) => {
        console.log('get users');
        res.send(users);
    });

    app.get('/spies', (req, res) => {
        console.log('get spies');
        res.send(spies);
    });

    app.post('/spies', (req, res) => {
        console.log('post spies');
        var requestBody = req.body;
        console.log(requestBody);
        var spyRequest = requestBody.text.trim();
        var spyRequestTerms = spyRequest.split(' ');
        if (spyRequestTerms.length !== 1 || spyRequestTerms[0].length === 0) {
            res.send({username: "spy-bot", text: "Failed to spy! Command format is: /spy <username>"});
        } else {
            var victim = spyRequestTerms[0].startsWith('@') ? spyRequestTerms[0].substring(1) : spyRequestTerms[0];
            var owner = {id: requestBody.user_id, name: requestBody.user_name};
            if(!users[owner.name]) {
                users[owner.name] = owner.id;
            }
            if (!users[victim]) {
                console.log(`User ${victim} not found in cache`);
                getUserId(victim)
                    .then(userFound.bind(null, victim, owner, res), userNotFound.bind(null, victim, owner, res));
            } else {
                userFound(victim, owner, res);
            }
        }

    });


    var getUserId = function (victimName) {
        var prom = new Promise(function (resolve, reject) {
            var options = {
                hostname: mattermostHost,
                port: mattermostPort,
                path: '/api/v4/users/usernames',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            };
            var usernameReq = https.request(options, function (res) {
                res.setEncoding('utf8');
                res.on('data', function (body) {
                    console.log(`Cache user details of ${victimName}`);
                    var usersData = JSON.parse(body);
                    if (usersData.length === 1) {
                        var victimId = usersData[0].id;
                        users[victimName] = victimId;
                        resolve(users);
                    } else {
                        console.log(`User with name ${victimName} not found!`);
                        reject(users);
                    }

                });
            });
            usernameReq.write(JSON.stringify([victimName]));
            usernameReq.end();
        });

        return prom;

    };

    var addSpy = function (victimName, user) {
        console.log(`Add spy on ${victimName} for ${user.name}`);
        if (!spies[victimName]) {
            spies[victimName] = {id: users[victimName], users: []};
        }
        spies[victimName].users.push(user);
    };

    var userFound = function (victimName, user, res) {
        addSpy(victimName, user);

        var responseMsg = `Spy added for ${victimName}`;
        res.send({username: 'spy-bot', text: responseMsg});
    };

    var userNotFound = function(victimName, user, res) {
        var responseMsg = `User with name ${victimName} is not found`;
        res.send({username: 'spy-bot', text: responseMsg});
    };
};