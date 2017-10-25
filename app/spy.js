const WebSocket = require('ws');
const http = require('http');
var _ = require('lodash');

module.exports = function(data, token) {
    var seq = 0;
    var pollInterval = 5 * 1000;
    var users = data.users;
    var spies = data.spies;

    const ws = new WebSocket('ws://ec2-13-126-112-247.ap-south-1.compute.amazonaws.com:8065/api/v4/websocket');

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
        var ownersString = _.map(owners, (owner) => `@${owner.name}`).join(', ');
        console.log(ownersString);
        var msg = `Hi ${ownersString} \n @${victim} is online now`;

        var msgBody = {
            "channel_id": "9dspc6xhfifnue6zrzj1d55fah",
            "message": msg
        };

        var options = {
            hostname: 'ec2-13-126-112-247.ap-south-1.compute.amazonaws.com',
            port: 8065,
            path: '/api/v4/posts',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        };
        var postReq = http.request(options);
        postReq.write(JSON.stringify(msgBody));
        postReq.end();
    }
};
