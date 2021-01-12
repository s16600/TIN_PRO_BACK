var mongoose = require('mongoose')

var sampleLabSchema = mongoose.Schema({
	wielkoscProby:{type:Decimal128},
	data:{type:Date},
	sample:{type:mongoose.Schema.Types.ObjectId, ref:'sample'},
	labs:{type:mongoose.Schema.Types.ObjectId, ref:'lab'}
});

var SampleLab = module.exports = mongoose.model('samplelab',sampleLabSchema);