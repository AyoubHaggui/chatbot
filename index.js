'use strict'
var express = require('express')
var request = require('./request/textMessage')
const bodyparser = require ("body-parser")
var profileapi = require('./API/facebook/getUserDetails')
var message_db = require('./database/messages/CRUD')
var users_db = require('./database/users/CRUD')
var connection = require('./database/connection')
//Open database connection
connection.connect()

const app = express()
app.use(bodyparser.urlencoded({extended: false}))
app.use(bodyparser.json())
app.set('port', 5000)

app.get('/webhook', function(req, res){
	if(req.query['hub.verify_token']==='verify_me') {
		res.send(req.query['hub.challenge'])
	}
	else res.send("verify_token")
})

app.post('/webhook', channel)
/**
 * Decides which module should respond to the req depending on the contents of req.
 * @param  {JSON} req request
 * @param  {JSON} res response
 */
async function channel(req, res){
	let events_loop = req.body.entry
	let events = eventsGenerator(events_loop)
	let event_object = events.next()
	while(!event_object.done){
		let event = event_object.value
		let webhook_event = readWebhookEvent(event)
		if (webhook_event == 'messaging'){ //Case of text message
			let messages_loop = event.messaging
			let messages = messagesGenerator(messages_loop)
			let message_object = messages.next()
			while(!message_object.done){
				let message = message_object.value
				//Send the text message to the handling function
				request.textMessage(message);
				let PSID = message.sender.id
				//Extract message details
				let messageDetails = getMessageDetails(message)
				//Query sender deatils
				try{
					var senderDetails = await profileapi.getUserDetails(PSID)
				}catch(e){
					console.log(e)
				}
				users_db.create(senderDetails, messageDetails)
				message_db.create(messageDetails)
				message_object = messages.next()
			}
		}
		event_object = events.next()
	}
	res.sendStatus(200)
}
/**
 * Extract the webhook type
 * @param  {Object} event event content
 * @return {String}       event type
 */	
function readWebhookEvent(event){
	if(event.messaging) return('messaging')
}
/**
 * Loops over the messages
 * @param {Object} messaging     array of messages
 * @yield {Object} current message object
 */
function *messagesGenerator(messaging){
	let message = 0
	while(messaging[message]){
		yield messaging[message]
		message++
	}
	return
}
/**
 * Loops over the events
 * @param {Object} entry         array of events
 * @yield {Object} current event object
 */
function *eventsGenerator(entry){
	let event = 0
	while(entry[event]){
		yield entry[event]
		event++
	}
	return
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
