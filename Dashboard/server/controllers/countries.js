const pool = require('../db');

exports.summary = async (req, res) => {
  try {
    const country = await pool.query('SELECT * FROM "Product" LIMIT 10');
    res.status(200).json({
      data: country.rows,
    });
  } catch (err) {
    console.log(err.message);
  }
};
