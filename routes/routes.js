var myController = require('../controllers/myController')
var router = require('express').Router();

router.get('/sample',myController.showSample);

router.post('/sample',myController.addSample);

router.post('/:id/take',myController.takeSample)

router.get('/sampled',myController.showSampled);

router.get('/:id/sampled',myController.showSampledSample);

router.get('/:id/sampled_1',myController.showSampledSample_1);

router.get('/laboratory',myController.showLaboratory);

router.get('/laboratoryadress',myController.showLaboratoryAdress);

router.post('/laboratory',myController.addLaboratory);

router.post('/password',myController.checkPassword);

router.post('/:samp/:lab/distribute',myController.distributeSample);

router.get('/:samp/distribute',myController.distributeSample_1);

module.exports = router;
