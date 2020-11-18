const router = require('express').Router();
const {
  getSummary,
  getDetailed,
  getWebsites,
  getWebsiteDaily,
  getWebsiteCategories,
  getDomestics,
} = require('../controllers/countries');

router.route('/websites-list/:flag').get(getWebsites);
router.route('/summary/:flag').get(getSummary);
router.route('/incorrect-detailed/:flag').get(getDetailed);
router.route('/website-daily/:flag').get(getWebsiteDaily);
router.route('/website-categories/:flag').get(getWebsiteCategories);
router.route('/domestics/:flag').get(getDomestics);

module.exports = router;
