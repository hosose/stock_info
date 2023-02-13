const stockService = require('../services/stockService');
const { catchAsync } = require('../utils/error');

const getStockItem = catchAsync(async (req, res) => {
  const stockItem = req.params.stockItem;
  const result = await stockService.getStockItem(stockItem);
  return res.status(200).json(result);
});

const postStock = catchAsync(async (req, res) => {
  const {
    Id,
    standard_code,
    simple_code,
    korea_name,
    simple_korea_name,
    english_name,
    listed_dat,
    market_classes,
    securities_classes,
    share_classes,
    volume_of_listed_shares,
  } = req.body;

  await stockService.postStock(
    Id,
    standard_code,
    simple_code,
    korea_name,
    simple_korea_name,
    english_name,
    listed_dat,
    market_classes,
    securities_classes,
    share_classes,
    volume_of_listed_shares
  );
  return res.status(201).json('post success');
});

module.exports = { getStockItem, postStock };
