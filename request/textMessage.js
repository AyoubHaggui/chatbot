// 'use strict'
// var intents = '../intents/'
// var weatherIntent = require(intents+'weather')
var ai = require('../apiai/analyse')
var textResponse = require('../response/textResponse').textResponse
exports = module.exports = {}
/**
 * Registers user and message to database & sends message for analysis
 * @param  {JSON} messaging messaging event request
 */
exports.textMessage = async function(messaging){
	console.log(messaging)
	var sender= messaging.sender.id
	var message=messaging.message.text
	var timestamp = messaging.timestamp
	try{
		var response = await ai.analyse(sender ,message)
	}
	catch(e){
		console.log(e)
	}
	if(response.result.actionIncomplete){
		console.log("redirecting to intent")
	}
	else{
		console.log(response.result.fulfillment.speech)
	}
	// console.log(response)
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