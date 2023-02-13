const express = require('express');
const stockController = require('../controllers/stockController');

const router = express.Router();

router.get('/:stockItem', stockController.getStockItem);
router.post('', stockController.postStock);

module.exports = router;
