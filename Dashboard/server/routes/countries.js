const router = require('express').Router();
const {
  getSummary,
  getDetailed,
  getWebsites,
} = require('../controllers/countries');

router.route('/websites-list/:flag').get(getWebsites);
router.route('/summary/:flag').get(getSummary);
router.route('/incorrect-detailed/:flag').get(getDetailed);

module.exports = router;
