var myController = require('../controllers/myController')
var router = require('express').Router();

router.get('/sample',myController.showSample);

router.post('/sample',myController.addSample);

module.exports = router;

/*
var mytodoController = require('../controllers/mytodoController');
var router = require('express').Router();

router.get('/',mytodoController.lista)

router.post('/',mytodoController.nowe)

router.post('/:id/zakoncz',mytodoController.zakoncz)

router.post('/:id/usun',mytodoController.usun)

router.get('/usunWszystkie',mytodoController.usunwszystkie)

module.exports = router;
*/