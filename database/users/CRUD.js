var mongoose = require('mongoose')
var userSchema = require('./../schemas').userSchema

exports = module.exports = {}
exports.create = create
/**
 * Creates new user or update existing users messages list
 * @param  {Object} user_details    new user details according to user schema
 * @param  {Object} message_details new message details
 */
async function create(user_details, message_details){
	var user = mongoose.model('user', userSchema)
	let exists = await read(user, user_details)
	if(exists){
		updateUserMessages(user, user_details, message_details)
	}
	else{
		let newUser = user(user_details)
		newUser.save(function(error){
			if(error) throw('Error creating user');
			else console.log("New user added to db")
		})
		updateUserMessages(newUser, user_details, messages_details)
	}	
}
/**
 * Read user from database
 * @param  {object} user         User model
 * @param  {object} user_details The user to retreive from database
 * @return {Object}              User object if user exists or null otherwise
 */
function read(user, user_details){
	return new Promise(function(resolve, reject){
		user.findOne({psid: user_details.PSID}, function(error, docs){
			if(error) console.log(error);
			else resolve(docs)
		})
	})
}
/**
 * Adds a message to an existing user messages list
 * @param  {Object} user            User database model
 * @param  {Object} user_details    User to which add the message details
 * @param  {object} message_details Message to add to user
 */
async function updateUserMessages(user, user_details, message_details){
	let read_user = await read(user, user_details)
	read_user.messages.push(message_details.mid)
	read_user.save(function(error){
		if(error) console.log('Error updating user messages list', error);
		else console.log('User messages list updated!')
	})
}