const pool = require('../db');
const getDefaultDate = require('../utils/get-default-date');

const tableData = async (table, flag, date) => {
  try {
    const sources = await pool.query(
      `SELECT DISTINCT "Source" FROM "${table}" WHERE "Market" = $1 AND "ExtractionDate" = $2 ORDER BY "Source";`,
      [flag.toUpperCase(), date]
    );

    const websites = sources.rows.map((source) => source['Source']);

    const websitesRequests = websites.map((site) =>
      pool.query(
        `SELECT "ExtractionDate", COUNT("ExtractionDate") FROM "${table}" WHERE "Market" = $1 AND "Source" = $2 AND "ExtractionDate" = $3 GROUP BY "ExtractionDate" ORDER BY 1 DESC;`,
        [flag.toUpperCase(), site, date]
      )
    );

    const counts = await Promise.all(websitesRequests);

    return { websites, counts };
  } catch (err) {
    console.log(err);
  }
};

exports.summary = async (req, res) => {
  const { flag } = req.params;
  const { date = getDefaultDate() } = req.query;

  try {
    const products = await tableData('Product', flag, date);
    const filters = await tableData('Filter', flag, date);
    const banners = await tableData('Banner', flag, date);
    const searches = await tableData('SearchResult', flag, date);
    const baskets = await tableData('BasketRecommendation', flag, date);
    const reviews = await tableData('Review', flag, date);

    const transformData = (table) => {
      return table.websites.map((website, index) => {
        return {
          website,
          count: table.counts[index].rows[0].count,
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
