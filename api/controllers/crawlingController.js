const crawlingService = require('../services/crawlingService');
const { catchAsync } = require('../utils/error');

const crawlingItem = catchAsync(async (req, res) => {
  const stockName = req.body.name;
  await crawlingService.crawlingItem(stockName);
  return res.status(201).json('crawling success!');
});

const getInfo = catchAsync(async (req, res) => {
  const result = await crawlingService.getInfo(req.params.name);
  return res.status(200).send(result);
});

module.exports = { crawlingItem, getInfo };
