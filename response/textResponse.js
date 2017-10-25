const facebookToken = require('../tokens').facebookToken
var request = require('request')
exports = module.exports = {}
exports.textResponse = function(recipient, text){
	request({
		url: 'https://graph.facebook.com/v2.6/me/messages' , 
		qs: {access_token:facebookToken},
		method: 'POST' ,
		json : {
			recipient: {id:recipient},
			message: {text: text}
		}

	}, function(error, response, body){
		if(error){
			console.log(error)
		}
		else if(response.body.error){
			console.log(response.body.error)
		}
	})

}