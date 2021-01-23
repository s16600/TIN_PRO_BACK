var mongoose = require('mongoose')

var sampleSchema = mongoose.Schema({
	numerSerii:{type:String, required:true},
	numerProby:{type:String, required:true},
	nazwaMaterialu:{type:String, required:true},
	symbolMagazynowy:{type:String, required:true},
	rodzajProby:{type:String, required:true},
	numerSpecyfikacji:{type:String, required:true},
	dataZlecenia:{type:Date, required:true},
	wielkoscSerii:{type:mongoose.Decimal128},
	wielkoscProby:{type:mongoose.Decimal128},
	//wielkoscProbyDoRozdzielenia:{type:mongoose.Decimal128}, <-uzupełnić i ilość do dystrybucji
	dataPoboru:{type:Date},
	pobrana:{type:Boolean},
	sampleStatus:{type:mongoose.Schema.Types.ObjectId, ref:'samplestatus'},
	sampleLab:[{type:mongoose.Schema.Types.ObjectId, ref:'sampleLab'}]
});

var Sample = module.exports = mongoose.model('sample',sampleSchema);

/*
var sampleSchema = mongoose.Schema({
	//nazwa:{type:String, required:true},
	//zakonczone:{type:Boolean, default:false},
	//data:{type:Date, default:Date.now}
});

var Zadanie = module.exports = mongoose.model('zadanie',zadanieSchema)
module.exports.get = (callback,limit)=>{
    Zadanie.find(callback).limit(limit);
}
*/