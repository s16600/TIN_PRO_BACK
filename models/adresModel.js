var mongoose = require('mongoose')

/*
var adresSchema = mongoose.Schema({
	miejscowosc:{type:String, required:true},
	ulica:{type:String, required:true},
	numer:{type:String, required:true},
});
*/


var adresSchema = mongoose.Schema({
	miejscowosc:{type:String, required:true},
	ulica:{type:String, required:true},
	numer:{type:String, required:true},
	labs:[{
		type:mongoose.Schema.Types.ObjectId, ref:'lab'
	}]
});


var Adres = module.exports = mongoose.model('adres',adresSchema);