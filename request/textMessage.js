// 'use strict'
// var intents = '../intents/'
// var weatherIntent = require(intents+'weather')
var analysis = require('../apiai/analyse')
var textResponse = require('../response/textResponse').textResponse
exports = module.exports = {}
exports.textMessage = function(messaging){
	console.log(messaging)
	var sender= messaging.sender.id
	var message=messaging.message.text
	var timestamp = messaging.timestamp
	console.log(message)
	analyse = analysis.analyse(sender, message)
	respond = analyse.next()
	console.log(respond)
	// response = analysis.next()
	// if (parametersSet(response)){
		// switch(response.intent){
			// case "weather": weatherIntent(response)
			// break;
		// }
	// }
	// else{
		// textResponse(sender, response.result.fulfillment.speech)
	// }
	
}