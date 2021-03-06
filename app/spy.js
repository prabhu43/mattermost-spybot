const WebSocket = require('ws');
const https = require('https');
var _ = require('lodash');

module.exports = function(data, token) {
    var seq = 0;
    var pollInterval = (process.env.POLL_INTERVAL_SECS || 60) * 1000;
    var users = data.users;
    var spies = data.spies;
    var mattermostHost = process.env.MATTERMOST_HOST;
    var mattermostPort = process.env.MATTERMOST_PORT;
    var webHookId = process.env.WEBHOOK_ID;

    let webSocketUrl = mattermostPort ? `wss://${mattermostHost}:${mattermostPort}/api/v4/websocket` : `wss://${mattermostHost}/api/v4/websocket`;
    console.log(`webSocketUrl:${webSocketUrl}`);
    console.log(webSocketUrl);
    const ws = new WebSocket(webSocketUrl);
    getSeq = function() {
        return ++seq;
    };

    ws.on('open', function open() {
        console.log('websocket opened');
        var request = {
            "action": "authentication_challenge",
            "data": {
                "token": token
            },
            "seq": getSeq()
        };
        ws.send(JSON.stringify(request));
    });

    ws.on('message', function process(msg) {
        msg = JSON.parse(msg);
        console.log('message');
        console.log(msg);
        if(msg.seq_reply > 1) {
            var statuses = msg.data;
            var onlineVictimIds = [];
            _.forIn(statuses, (value, key) => {
                if(value === 'online') {
                    onlineVictimIds.push(key);
                }
            });
            console.log(onlineVictimIds);
            var invertedUsers = _.invert(users);
            _.forEach(onlineVictimIds, (id) => {
                var victimName = invertedUsers[id];
                var spyOwners = spies[victimName].users;
                console.log(`${victimName} is online`);
                informOwners(spyOwners, victimName);
                delete spies[victimName];
            });
        }
    });

    pollUserStatus = function() {
        var victims = _.values(spies).map(victim=>victim.id);
        console.log('poll user status');
        console.log(victims);
        if(victims.length > 0) {
            var request = {
                "action": "get_statuses_by_ids",
                "data": {
                    "token": token,
                    "user_ids": victims
                },
                "seq": getSeq()
            };
            ws.send(JSON.stringify(request));
        }

    };

    setInterval(pollUserStatus, pollInterval);

    informOwners = function(owners, victim) {
        _.each(owners, (owner) => {
            var ownerChannel = `@${owner.name}`;
            var msg = `Hi ${owner.name} \n ${victim} is online now`;
            var payload = {
                channel: ownerChannel,
                username: "spy-bot",
                text: msg
            };

            var options = {
                hostname: mattermostHost,
                port: mattermostPort,
                path: `/hooks/${webHookId}`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            };

            var postReq = https.request(options);
            postReq.write(JSON.stringify(payload));

            postReq.end();
        });
    };
};
