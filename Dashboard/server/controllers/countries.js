const pool = require('../db');
const getDefaultDate = require('../utils/get-default-date');

const tableData = async (table, flag, date, isDaily, startDate) => {
  try {
    const sources = await pool.query(
      `SELECT DISTINCT "Source" FROM "${table}" WHERE "Market" = $1 AND "ExtractionDate" = $2 ORDER BY "Source";`,
      [flag.toUpperCase(), date]
    );

    const websites = sources.rows.map((source) => source['Source']);

    const websitesRequests = websites.map((site) =>
      pool.query(
        `SELECT "ExtractionDate", COUNT("ExtractionDate") FROM "${table}" WHERE "Market" = $1 AND "Source" = $2 AND "ExtractionDate" ${
          isDaily ? '=' : '>='
        } $3 GROUP BY "ExtractionDate" ORDER BY 1 DESC;`,
        [flag.toUpperCase(), site, isDaily ? date : startDate]
      )
    );

    const counts = await Promise.all(websitesRequests);

    return { websites, counts };
  } catch (err) {
    console.log(err);
  }
};

exports.getSummary = async (req, res) => {
  const { flag } = req.params;
  const { date = getDefaultDate(), startDate } = req.query;
  const isDaily = req.path.includes('daily');

  try {
    const products = await tableData('Product', flag, date, isDaily, startDate);
    const filters = await tableData('Filter', flag, date, isDaily, startDate);
    const banners = await tableData('Banner', flag, date, isDaily, startDate);
    const searches = await tableData(
      'SearchResult',
      flag,
      date,
      isDaily,
      startDate
    );
    const baskets = await tableData(
      'BasketRecommendation',
      flag,
      date,
      isDaily,
      startDate
    );
    const reviews = await tableData('Review', flag, date, isDaily, startDate);

    const transformData = (table) => {
      return table.websites.map((website, index) => {
        return {
          website,
          count: table.counts[index].rows,
        };
      });
    };

    res.status(200).json({
      country: flag,
      products: transformData(products),
      filters: transformData(filters),
      banners: transformData(banners),
      searches: transformData(searches),
      baskets: transformData(baskets),
      reviews: transformData(reviews),
      extractionDate: date,
    });
  } catch (err) {
    console.log(err.message);
  }
};
