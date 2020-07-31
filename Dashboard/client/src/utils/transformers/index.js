const isMultipleDaysData = (dailies) => {
  if (dailies.length > 1) {
    return dailies.map((value) => `${value.ExtractionDate}: ${value.count}`);
  }
  return dailies[0].count;
};

export const transformDailyData = (country, robots) => {
  const rows = [];

  robots.forEach((robot) => {
    robot.count.forEach((website) => {
      rows.push({
        robot: robot.robot,
        country: country.toUpperCase(),
        website: website[0].Source,
        extractionDate: website[0].ExtractionDate,
        count: isMultipleDaysData(website),
      });
    });
  });

  return rows;
};
