const router = require('express').Router();
const { getSummary, getDetailed } = require('../controllers/countries');

router.route('/daily/:flag').get(getSummary);
router.route('/historical/:flag').get(getSummary);
router.route('/incorrect-detailed/:flag').get(getDetailed);

module.exports = router;
