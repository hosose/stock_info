const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const stockService = require('./stockService');
const crawlingDao = require('../models/crawlingDao');
const { raiseCustomError } = require('../utils/error');

const crawlingItem = async (stockName) => {
  const stockInfo = await stockService.getStockItem(stockName);
  let stockNum = stockInfo[0].simple_code;
  while (String(stockNum).length < 6) {
    stockNum = '0' + stockNum;
  }
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(
    `https://navercomp.wisereport.co.kr/v2/company/c1030001.aspx?cmp_cd=${stockNum}&cn=`
  );
  await page.waitForTimeout(2000);
  const content = await page.content();
  const $ = cheerio.load(content);
  const seventeenth = $('td.num.ext0');
  const eighteenth = $('td.num.ext1');
  const nineteenth = $('td.num.ext2');
  const twentieth = $('td.num.ext3');
  const twentyfirst = $('td.num.ext4');
  const listArr = [seventeenth, eighteenth, nineteenth, twentieth, twentyfirst];
  let result = { 2017: {}, 2018: {}, 2019: {}, 2020: {}, 2021: {} };
  for (let i of listArr) {
    let year;
    if (i === seventeenth) year = 2017;
    if (i === eighteenth) year = 2018;
    if (i === nineteenth) year = 2019;
    if (i === twentieth) year = 2020;
    if (i === twentyfirst) year = 2021;

    i.each((i, list) => {
      if (i === 0) result[year].매출액 = $(list).text().trim();
      if (i === 98) result[year].영업이익 = $(list).text().trim();
      if (i === 217) result[year].순이익 = $(list).text().trim();
      if (i === 237) result[year].주당순이익 = $(list).text().trim();
    });
  }
  browser.close();
  const information = await crawlingDao.getInformation(stockInfo[0].Id);

  if (information) {
    raiseCustomError('Already post', 400);
  }
  await crawlingDao.crawlingItem(stockInfo[0].Id, JSON.stringify(result));
};

const getInfo = async (name) => {
  const stockInfo = await stockService.getStockItem(name);
  return await crawlingDao.getInformation(stockInfo[0].Id);
};

module.exports = { crawlingItem, getInfo };
