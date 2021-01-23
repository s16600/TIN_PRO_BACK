Sample = require('../models/sampleModel');
Lab = require('../models/labModel');
Haslo = require('../models/hasloModel');
Adres = require('../models/adresModel');
SampleLab = require('../models/sampleLabModel');

exports.takeSample = (req, res) => {
	Sample.findById({_id: req.body._id}, (err, sample)=>{
	  sample.wielkoscProby = req.body.wielkoscProby;
	  sample.pobrana = true;
      sample.dataPoboru = Date.now();
      sample.save();
	});
	
	res.json({
		status:'sukces',
		message:'sample taken',
	});
}

exports.showSample = (req, res) => {
	Sample.find({"pobrana":{$eq: false}}, function(err, sample) {
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
	
	sample.wielkoscProby = 0;
	sample.dataPoboru = Date.now();
	sample.pobrana = false;

	sample.save(); //save(err=>...) - można zrobić obsługę błedów za pomocą lambdy

	res.json({
		status:'sukces',
		message:'sample added',
		data:sample
	});
}

exports.showSampled = (req, res) => {
	Sample.find({"pobrana":{$eq: true}}, function(err, sample) {
		res.send(JSON.stringify(sample));
	});
}

//Informacje o próbie do przydzielenia do laboratoriów
exports.showSampledSample = (req, res) => {
	Sample.findById({_id: req.params.id}, (err, sample)=>{
		res.send(JSON.stringify(sample));
	});
}

exports.showSampledSample_1 = (req, res) => {
	Sample.findById({_id: req.params.id})
	//.populate({ path: 'sampleLab', select: 'data'})
	//.sampleLab.populate('sampleLab')
	//.populate('sampleLab')
	//.populate({ path: 'sampleLab', select: 'wielkoscProby' })
	//.populate({path:'sampleLab', select: 'wielkoscProby'})
	//.populate({path:'labs'})
	.exec(function (err, lab) {
		res.send(JSON.stringify(lab));
		//console.log(JSON.stringify(lab));
	});
	
	//console.log();
	
	/*Sample.findById({_id: req.params.id}, (err, sample)=>{
		res.send(JSON.stringify(sample));
	});*/
}

exports.showLaboratory = (req, res) => {
	Lab.find({}, function(err, lab) {
		res.send(JSON.stringify(lab));
	});
}

exports.showLaboratoryAdress = (req, res) => {

	Lab.find({}).populate({ path: 'adres', select: 'miejscowosc ulica numer' })
	.exec(function (err, lab) {
		res.send(JSON.stringify(lab));
	});
	
	//console.log(lab);
	//res.send(JSON.stringify(lab));
	//res.send(JSON.stringify(lab));
	
	//{ path: 'fans', select: 'name' }
	
	/*Lab.find({}, function(err, lab) {
		res.send(JSON.stringify(lab));
	});*/
}

exports.addLaboratory = (req, res) => {
	var lab = new Lab();
	var adres = new Adres();
	
	//var lab = new Lab();
	lab.nazwa = req.body.nazwa;
	lab.adres = adres._id;
	lab.save(); //save(err=>...) - można zrobić obsługę błedów za pomocą lambdy
	
	//var adres = new Adres();
	adres.miejscowosc = req.body.miejscowosc;
	adres.ulica = req.body.ulica;
	adres.numer = req.body.numer;
	//adres.labs <- tutaj dodać podłączanie laboratorium
	adres.labs.push(lab._id);
	adres.save(); //save(err=>...) - można zrobić obsługę błedów za pomocą lambdy

	res.json({
		status:'sukces',
		message:'lab added',
		data:lab
	});
}

exports.checkPassword = (req, res) => {
	/*
	var haslo = new Haslo();
	haslo.haslo = req.body.haslo;
	haslo.login = req.body.login;
	haslo.save();
	*/
	
	/*
	Haslo.find({haslo: req.body.haslo, login: req.body.login}, function(err, haslo) {
		res.send(JSON.stringify(haslo));
	});
	*/
	
	Haslo.findOne({haslo: req.body.haslo, login: req.body.login}, function(err, haslo) {
		res.send(JSON.stringify(haslo));
	});
}

exports.distributeSample = (req, res) => {
	var sampleLab = new SampleLab();
	sampleLab.wielkoscProby = req.body.wielkoscProby;
	sampleLab.data=Date.now();
	sampleLab.sample=req.params.samp;
	sampleLab.labs=req.params.lab;
	sampleLab.save();
	
	Sample.findById({_id: req.params.samp}, (err, sample)=>{
	  sample.sampleLab.push(sampleLab._id);
	  sample.wielkoscProby=(sample.wielkoscProby - req.body.wielkoscProby);
      sample.save();
	});
	
	res.json({
		status:'sukces',
		message:'distribution added',
		data:sampleLab
	});
}

exports.distributeSample_1 = (req, res) => {
	//console.log(req.params.samp);
	SampleLab.find({sample: {$eq: req.params.samp}})
	.populate({ path: 'labs', select: 'nazwa'})
	//SampleLab.find({"sample":{$eq: req.samp}})
	//.populate({ path: 'adres', select: 'miejscowosc ulica numer' })
	.exec(function (err, lab) {
		res.send(JSON.stringify(lab));
		//console.log(JSON.stringify(lab));
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