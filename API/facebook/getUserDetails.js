'use strict'
var rp = require("request-promise")
const facebookToken = require('../../tokens').facebookToken
exports = module.exports = {}
/**
 * Uses facebook API to request details about the user
 * @param  {string} PSID user unique id
 * @return {object}      a promise that resolves with the user details 
 */
exports.getUserDetails = function(PSID){
	let options = {
		url: 'https://graph.facebook.com/v2.1/'+PSID+'?access_token='+facebookToken,
		method: 'GET',
		json: true
	}
	return rp(options)
	// var first_name =  json_body.first_name
	// var last_name = json_body.last_name
	// var profile_pic = json_body.profile_pic
	// var locale = json_body.locale
	// var timezone =json_body.timezone
	// var gender = json_body.gender
	// var msg =  req.body.entry[0].messaging[0].message.mid
	// var timestamp =  req.body.entry[0].messaging[0].timestamp
	// var message_string=req.body.entry[0].messaging[0].message.text
	// var response = null 
}