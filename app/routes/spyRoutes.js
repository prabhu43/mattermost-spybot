module.exports = function(app, db, ws) {

  app.get('/spies', (req, res) => {
  	console.log('get spies');
  	var spies = db.getCollection('spies');
    res.send(spies.find());
  });

  app.post('/spies', (req, res) => {
  	console.log('post spies');
  	var spies = db.getCollection('spies');
  	var requestBody  = req.body;
  	var spyRequest = requestBody.text.trim();
  	var spyRequestTerms = spyRequest.split(' ');
  	if(spyRequestTerms[0] === '#spy') {
  		console.log(spyRequestTerms[1]);
  		var victim = spyRequestTerms[1].startsWith('@') ? spyRequestTerms[1].substring(1) : spyRequestTerms[1];	
		spies.insert({victim: victim});
		var responseMsg = 'Spy added for ' + victim;
		res.send({username: 'spy-bot', text: responseMsg});
  	} else {
  		console.log(spyRequestTerms);
  		res.send({username: 'spy-bot', text: 'Failed to spy! Chech msg format.'});
  	}
    
  });


  app.get('/spystatus', (req, res) => {
    console.log('get - spy status');
    var msg = {
  "action": "get_statuses",
  "seq": 2
  // "data": {
    // "channel_id": "nhze199c4j87ped4wannrjdt9c",
    // "parent_id": ""
  // }
};
    ws.send(JSON.stringify(msg));
    res.send('request sent');
  });
};