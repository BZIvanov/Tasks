export const transformDailyData = (country, robots) => {
  const rows = [];

  robots.forEach((robot) => {
    robot.count.forEach((website) => {
      rows.push({
        robot: robot.robot,
        country: country.toUpperCase(),
        website: website[website.length - 1].Source,
        extractionDate: website[website.length - 1].ExtractionDate,
        count: website,
      });
    });
  });

  return rows;
};

export const transformCategoriesData = (categories) => {
  const formattedCategories = {};

  categories.forEach((category) => {
    const {
      Level1Category,
      Level2Category,
      Level3Category,
      ...rest
    } = category;

    const uniqueCategory = `${Level1Category} ${Level2Category} ${Level3Category}`;

    if (!formattedCategories.hasOwnProperty(uniqueCategory)) {
      formattedCategories[uniqueCategory] = { count: [] };
    }
    formattedCategories[uniqueCategory]['firstLevel'] = Level1Category;
    formattedCategories[uniqueCategory]['secondLevel'] = Level2Category;
    formattedCategories[uniqueCategory]['thirdLevel'] = Level3Category;
    formattedCategories[uniqueCategory]['count'] = [
      ...formattedCategories[uniqueCategory]['count'],
      rest,
    ];
  });

  return Object.values(formattedCategories);
};
