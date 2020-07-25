export const transformDailyData = (country, tables) => {
  const keys = Object.keys(tables);

  const rows = [];

  keys.forEach((key) => {
    tables[key].forEach((row) => {
      rows.push({
        robot: key,
        country: country.toUpperCase(),
        website: row.website,
        extractionDate: row.count[0].ExtractionDate,
        count: row.count[0].count,
      });
    });
  });

  return rows;
};
