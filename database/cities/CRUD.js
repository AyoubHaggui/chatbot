var mongoose = require('mongoose')
var fs = require('fs')
var citySchema = require('./../schemas').citySchema

exports = module.exports = {}
exports.create = create
/**
 * Load the Tunisian city list from reference file to database
 */
async function create(){
	try{
		var city_db_exists = await cityCollectionExists() 
	}
	catch(error){
		console.log(error)
	}
	if(!city_db_exists){
		console.log('Adding new cities to database:')
		var city_db = mongoose.model('city', citySchema)
		let cities_list = cityGenerator()
		let city_object = cities_list.next()
		while(!city_object.done){
			let city = city_object.value
			let newCity = city_db(city)
			newCity.save(function(error){
				if(error) throw('Error saving city');
				else console.log('New city ', city.name, ' added to db')
			})
			city_object = cities_list.next()
		}
	}
	else console.log('City database up to date');
}
/**
 * Iterate over the list of cities from reference file 
 * @yield {object} City object out of the pool
 */
function *cityGenerator(){
	var cities = fs.readFileSync(require.resolve('./city.json'))
	cities = JSON.parse(cities)
	for(let i=0; i<cities.length; i++){
		if(cities[i].country == 'TN'){
			yield cities[i]
		}
	}
	return
}
function cityCollectionExists(){
	return mongoose.connection.db.listCollections({name: 'cities'}).toArray().then(function(names){
		return Promise.resolve(names.length > 0)
	}).catch(function(){
		return Promise.reject(error)
	})
}