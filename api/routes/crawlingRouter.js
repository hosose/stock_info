const express = require('express');
const crawlingController = require('../controllers/crawlingController');

const router = express.Router();

router.post('', crawlingController.crawlingItem);
router.get('/:name', crawlingController.getInfo);

module.exports = router;
