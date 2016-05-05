var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Account = new Schema({
	username: String,
	password: String,
	emailAddress: String,
	token: String,
	frequency: String,
	quantity: String,
	grind: String,
	name: String,
	address: String,
	address2: String,
	city: String,
	state: String,
	zip: String,
	deliveryDate: String
});

module.exports = mongoose.model('Account', Account)
