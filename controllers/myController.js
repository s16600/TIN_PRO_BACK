Sample = require('../models/sampleModel');

exports.showSample = (req, res) => {
	Sample.find({}, function(err, sample) {
		res.send(JSON.stringify(sample));
	});
}

exports.addSample = (req, res) => {
	var sample = new Sample();
	sample.numerSerii = req.body.numerSerii;
	sample.numerProby = req.body.numerProby;
	sample.nazwaMaterialu = req.body.nazwaMaterialu;
	sample.symbolMagazynowy = req.body.symbolMagazynowy;
	sample.rodzajProby = req.body.rodzajProby;
	sample.numerSpecyfikacji = req.body.numerSpecyfikacji;
	sample.dataZlecenia = Date.now();

	sample.save(); //save(err=>...) - można zrobić obsług błedów za pomocą lambdy

	res.json({
		status:'sukces',
		message:'sample added',
		data:sample
	});
}

/*
	numerSerii:{type:String, required:true},
	numerProby:{type:String, required:true},
	nazwaMaterialu:{type:String, required:true},
	symbolMagazynowy:{type:String, required:true},
	rodzajProby:{type:String, required:true},
	numerSpecyfikacji:{type:String, required:true},
	dataZlecenia:{type:Date, required:true},
	wielkoscSerii:{type:Decimal128},
	wielkoscProby:{type:Decimal128},
	dataPoboru:{type:Date},
	sampleStatus:{type:mongoose.Schema.Types.ObjectId, ref:'samplestatus'}
*/

/*
Zadanie = require('../models/mytodoModel')

exports.lista = (req, res) => {
    Zadanie.get((err, zadania) => {
		res.render('mytodo',{zadania:zadania || [] })
    });
};

exports.nowe = (req, res) => {
	var zadanie = new Zadanie();
	zadanie.nazwa = req.body.nazwa
	zadanie.save();
	res.redirect('/');
};

exports.zakoncz = (req, res) => {
	Zadanie.findById({_id: req.params.id}, (err, zadania)=>{
		zadania.zakonczone = true;
		zadania.save();
		res.redirect('/');
		});
};

exports.usun = (req, res) => {
	Zadanie.remove({_id: req.params.id}, (err, zadania)=>{res.redirect('/'); });
};

exports.usunwszystkie = (req, res) => {
	Zadanie.remove({'zakonczone':true}, (err, zadania)=>{res.redirect('/'); });
};
*/