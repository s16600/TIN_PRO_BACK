var mongoose = require('mongoose')

var sampleStatusSchema = mongoose.Schema({
	status:{type:String, required:true},
	data:{type:Date, required:true},
	samples:[{
		type:mongoose.Schema.Types.ObjectId, ref:'sample'
	}]
});

var SampleStatus = module.exports = mongoose.model('samplestatus',sampleStatusSchema);