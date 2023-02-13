const stockDao = require('../models/stockDao.js');
const { raiseCustomError } = require('../utils/error');

const getStockItem = async (stockItem) => {
  let whereClause = ``;

  typeof stockItem == Number
    ? (whereClause = `Where simple_code = ${stockItem}`)
    : (whereClause = `Where simple_korea_name = '${stockItem}'`);

  return await stockDao.getStockItem(whereClause);
};

const postStock = async (
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
) => {
  await stockDao.postStock(
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
};

module.exports = { getStockItem, postStock };
