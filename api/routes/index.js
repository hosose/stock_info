const express = require('express');

const router = express.Router();

const stockRouter = require('./stockRouter.js');
const crawlingRouter = require('./crawlingRouter');

router.use('/stock', stockRouter);
router.use('/crawling', crawlingRouter);

module.exports = router;
