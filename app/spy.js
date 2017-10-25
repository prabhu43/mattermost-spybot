const WebSocket = require('ws');

module.exports = function(data, token) {
    var seq = 0;
    var pollInterval = 3 * 1000;

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
            console.log(statuses);
            Object.keys(statuses).forEach(id => {
                if(statuses[id] === 'online') {
                    console.log(`${id} is online`);
                }
            })
        }
    });

    pollUserStatus = function() {
        var victims = Object.values(data.spies).map(victim=>victim.id);
        console.log(victims);
        console.log('poll user status');
        if(victims.length > 0) {
            var request = {
                "action": "get_statuses_by_ids",
                "data": {
                    "token": token,
                    "user_ids": victims
                },
                "seq": getSeq()
            };
            console.log(request);
            ws.send(JSON.stringify(request));
        }

    };

    setInterval(pollUserStatus, pollInterval);
};
