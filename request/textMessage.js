// 'use strict'
// var intents = '../intents/'
// var weatherIntent = require(intents+'weather')
var ai = require('../apiai/analyse')
var textResponse = require('../response/textResponse').textResponse
var city_db = require('./../database/cities/CRUD.js')
exports = module.exports = {}
/**
 * Registers user and message to database & sends message for analysis
 * @param  {JSON} messaging messaging event request
 */
exports.textMessage = async function(messaging){
	city_db.create()
	var sender= messaging.sender.id
	var message=messaging.message.text
	try{
		var response = await ai.analyse(sender ,message)
	}
	catch(e){
		console.log(e)
	}
	// console.log(response)
	if(response.result.actionIncomplete){
		console.log(response.result.fulfillment.speech)
	}
	else{
		console.log("Redirecting to intent")
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