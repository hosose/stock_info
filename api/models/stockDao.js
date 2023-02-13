const { database } = require('./dataSource.js');
const { raiseCustomError } = require('../utils/error');

const getStockItem = async (clause) => {
  try {
    return await database.query(
      `SELECT
        *
      FROM
        stock_items
      ${clause}
      `
    );
  } catch (err) {
    raiseCustomError('INVALID_DATA_INPUT', 400);
  }
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
  try {
    await database
      .createQueryBuilder()
      .insert()
      .into('stock_items')
      .values([
        {
          Id: Id,
          standard_code: standard_code,
          simple_code: simple_code,
          korea_name: korea_name,
          simple_korea_name: simple_korea_name,
          english_name: english_name,
          listed_dat: listed_dat,
          market_classes: market_classes,
          securities_classes: securities_classes,
          share_classes: share_classes,
          volume_of_listed_shares: volume_of_listed_shares,
        },
      ])
      .execute();
  } catch (err) {
    console.log(err);
    raiseCustomError('INVALID_DATA_INPUT', 400);
  }
};
module.exports = { getStockItem, postStock };
