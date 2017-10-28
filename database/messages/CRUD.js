var mongoose = require('mongoose')
var messageSchema = require('./../schemas').messageSchema

exports = module.exports = {}
exports.create = create
/**
 * Add new message to database
 * @param  {object} message_details The new message key/fields pairs
 */
function create(message_details){
	var message = mongoose.model('message', messageSchema)
	let newMessage = message(message_details)
	newMessage.save(function(error){
		if(error) throw('Error creating message');
		else console.log("New message added to db")
	})	
}
