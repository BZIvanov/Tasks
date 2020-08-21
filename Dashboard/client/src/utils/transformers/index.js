const isMultipleDaysData = (dailies) => {
  if (dailies.length > 1) {
    return dailies.map((value) => {
      return { extractionDate: value.ExtractionDate, count: value.count };
    });
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
        website: website[website.length - 1].Source,
        extractionDate: website[website.length - 1].ExtractionDate,
        count: isMultipleDaysData(website),
      });
    });
  });

  return rows;
};
