const router = require('express').Router();
const { summary } = require('../controllers/countries');

router.route('/:flag').get(summary);

module.exports = router;
