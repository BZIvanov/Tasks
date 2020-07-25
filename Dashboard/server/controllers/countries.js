const pool = require('../db');
const getDefaultDate = require('../utils/get-default-date');

exports.summary = async (req, res) => {
  const { flag } = req.params;
  const { date = getDefaultDate() } = req.query;

  try {
    const sources = await pool.query(
      `SELECT DISTINCT "Source" FROM "Product" WHERE "Market" = $1 AND "ExtractionDate" = $2 ORDER BY "Source";`,
      [flag.toUpperCase(), date]
    );

    const websites = sources.rows.map((source) => source['Source']);

    const websitesRequests = websites.map((site) =>
      pool.query(
        `SELECT "ExtractionDate", COUNT("ExtractionDate") FROM "Product" WHERE "Market" = $1 AND "Source" = $2 AND "ExtractionDate" = $3 GROUP BY "ExtractionDate" ORDER BY 1 DESC;`,
        [flag.toUpperCase(), site, date]
      )
    );

    const websitesResultsCounts = await Promise.all(websitesRequests);

    res.status(200).json({
      country: flag,
      websites: websites.map((website, index) => {
        return {
          website,
          count: websitesResultsCounts[index].rows[0].count,
        };
      }),
      extractionDate: date,
    });
  } catch (err) {
    console.log(err.message);
  }
};
