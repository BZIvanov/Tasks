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

    res.status(200).json({
      country: flag,
      websites: websites,
      extractionDate: date,
    });
  } catch (err) {
    console.log(err.message);
  }
};
