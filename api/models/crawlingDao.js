const { database } = require('./dataSource.js');
const { raiseCustomError } = require('../utils/error');

const crawlingItem = async (idx, result) => {
  try {
    await database.query(
      `INSERT INTO
        item_information (item_idx, information)
      VALUES (?,?)`,
      [idx, result]
    );
  } catch (err) {
    console.log(err);
    raiseCustomError('INVALID_DATA_INPUT', 400);
  }
};

const getInformation = async (item_id) => {
  try {
    let [result] = await database.query(
      `SELECT
        *
      FROM item_information
      WHERE item_idx = ?`,
      [item_id]
    );
    return result;
  } catch (err) {
    console.log(err);
    raiseCustomError('INVALID_DATA_INPUT', 400);
  }
};

module.exports = { crawlingItem, getInformation };
