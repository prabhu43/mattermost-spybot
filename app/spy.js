const WebSocket = require('ws');

module.exports = function(data, token) {
    var seq = 0;

    const ws = new WebSocket('ws://ec2-13-126-112-247.ap-south-1.compute.amazonaws.com:8065/api/v4/websocket');

    getSeq = function() {
        return ++seq;
    };

    ws.on('open', function open() {
        console.log('websocket opened');
        var challenge = {
            "action": "authentication_challenge",
            "data": {
                "token": token
            },
            "seq": getSeq()
        };
        ws.send(JSON.stringify(challenge));
    });

    ws.on('message', function open(data) {
        console.log('message');
        console.log(data);
    });
};
