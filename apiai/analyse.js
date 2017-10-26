apiai = require('apiai')
const apiToken = require('../tokens').apiToken
var app = apiai('8cac96b981e441f489cfabee2558319a')
exports = module.exports = {}
/**
 * Uses apiai module to analyse input text
 * @param  {string} sender Session id used to keep track of context in apiai
 * @param  {string} text   text to analyse
 */
exports.analyse = function (sender, text){
	var request = app.textRequest(text, {
		sessionId: sender
	})
	var response =  new Promise(function (resolve, reject){
		request.on('response', function(response){
			resolve(response)
		})
		request.on('error', function(error) {
			reject(error)
		})
	})
	request.end()
	return(response)
}
