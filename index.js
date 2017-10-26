'use strict'
var express = require('express')
var request = require('./request/textMessage')
const bodyparser = require ("body-parser")
var profileapi = require('./API/facebook/getUserDetails')
// var message_db = require('./database/messages/CURD')

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
async function channel(req, res){
	for(var event=0; event<req.body.entry.length; event++){
		if (req.body.entry[event].messaging){ //Case of text message
			for(let message=0; message<req.body.entry[event].messaging.length; message++){
				//Send the text message to the handling function
				request.textMessage(req.body.entry[event].messaging[message]);
				let PSID = req.body.entry[event].messaging[message].sender.id
				try{
					var senderDetails = await profileapi.getUserDetails(PSID)
				}catch(e){
					console.log(e)
				}
				let messageDetails = getMessageDetails(req.body.entry[event].messaging[message])
				console.log(messageDetails)

			}
		}
	}
	res.sendStatus(200)
}

function getMessageDetails(messaging){
	let message = {
		mid: messaging.message.mid,
		timestamp: messaging.timestamp,
		text: messaging.message.text
	}
	return(message)
}


app.listen(app.get('port'), function(err){
	if(err) console.log(err)
	console.log("Connected on port", app.get('port'))
})