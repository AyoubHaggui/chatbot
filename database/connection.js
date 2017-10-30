var mongoose = require('mongoose')
var dbURL = require('./../tokens').db

module.exports.connect = connect
/**
 * Generates database connection and diconnects on process termination
 */
function connect(){ 
	mongoose.Promise = global.Promise
	mongoose.connect(dbURL, {
		useMongoClient: true
	})
	mongoose.connection.on('connected', function(){
		console.log('Mongoose default connection open to', dbURL)
	})
	mongoose.connection.on('error', function(err){
     console.log("Mongoose default connection has occured "+err+" error")
	})
	mongoose.connection.on('disconnected', function(){
     console.log("Mongoose default connection is disconnected")
	})
	process.on('SIGINT', function(){
    mongoose.connection.close(function(){
      console.log("Mongoose default connection is disconnected due to application termination")
      process.exit(0)
     })
})
}
