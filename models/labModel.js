var mongoose = require('mongoose')

var labSchema = mongoose.Schema({
	nazwa:{type:String, required:true},
	sampleLabs:[{
		type:mongoose.Schema.Types.ObjectId, ref:'samplelab'
	}],
	adres:{type:mongoose.Schema.Types.ObjectId, ref:'adres'}
});

var Lab = module.exports = mongoose.model('lab',labSchema);