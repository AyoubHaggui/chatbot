'use strict'
var express = require('express')
var request = require('./request/textMessage')
const bodyparser = require ("body-parser")

const app = express()
app.use(bodyparser.urlencoded({extended: false}))
app.use(bodyparser.json())
app.set('port', 5000)

app.get('/webhook', function(req, res){
	if(req.query['hub.verify_token']==='adja_souris_arajel') {
		res.send(req.query['hub.challenge'])
	}
	else res.send("mors 7mir")
})

app.post('/webhook', channel)
/**
 * Decides which module should respond to the req depending on the contents of req.
 * @param  {JSON} req request
 * @param  {JSON} res response
 */
function channel(req, res){
	for(var event=0; event<req.body.entry.length; event++){
		if (req.body.entry[event].messaging){
			for(var message=0; message<req.body.entry[event].messaging.length; message++){
			request.textMessage(req.body.entry[event].messaging[message]);
			}
		}
	}
	res.sendStatus(200)
}



app.listen(app.get('port'), function(err){
	if(err) console.log(err)
	console.log("Connected on port", app.get('port'))
})