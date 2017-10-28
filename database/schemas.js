var mongoose = require("mongoose")
var schema = mongoose.Schema

var userSchema = new schema({
	psid: String,
	first_name: String,
	last_name: String,
	profile_pic: String,
	locale: String,
	timezone: String,
	gender: String,
	messages: [String]
})

var messageSchema = new schema({
	mid : String,
	timestamp : Date,
	text : String,
})

var responseSchema = new schema({
	mid: String,
	timestamp: Date,
	text: String 
})

var citySchema = new schema({
	id: Number,
	name: String,
	country: String,
	coord: {
		lon: Number,
		lat: Number
	}
})

module.exports.citySchema = citySchema
module.exports.userSchema = userSchema
module.exports.messageSchema = messageSchema