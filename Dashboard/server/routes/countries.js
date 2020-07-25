const router = require('express').Router();
const { getSummary } = require('../controllers/countries');

router.route('/daily/:flag').get(getSummary);
router.route('/historical/:flag').get(getSummary);

module.exports = router;
