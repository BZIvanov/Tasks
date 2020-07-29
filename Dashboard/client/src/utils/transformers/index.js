const isMultipleDaysData = (dailies) => {
  if (dailies.length > 1) {
    return dailies.map((value) => `${value.ExtractionDate}: ${value.count}`);
  }
  return dailies[0].count;
};

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
        count: isMultipleDaysData(row.count),
      });
    });
  });

  return rows;
};

export const transformDetailsData = (country, tables) => {
  const keys = Object.keys(tables);

  const rows = [];

  keys.forEach((key) => {
    tables[key].forEach((row) => {
      rows.push({
        robot: key,
        website: row.website,
        rows: row.count,
      });
    });
  });

  return rows;
};
