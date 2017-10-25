apiai = require('apiai')
const apiToken = require('../tokens').apiToken
var app = apiai('8cac96b981e441f489cfabee2558319a')
exports = module.exports = {}
exports.analyse = function *(sender, text){
	console.log("api active")
	var request = app.textRequest(text, {
		sessionId: 123
	})
	request.on('response', function(response){
		// console.log(response)
		yield(response)
	})
	request.on('error', function(error, yield) {
    console.log(error);
	})
	// 	if(err) console.log(err);
	// 	yield res
	// })
	// res = respond.next()
	request.end()
}
