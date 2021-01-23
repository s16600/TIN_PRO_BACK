var mongoose = require('mongoose')

var hasloSchema = mongoose.Schema({
	login:{type:String, required:true},
	haslo:{type:String, required:true}
});

var Haslo = module.exports = mongoose.model('haslo',hasloSchema);