const pool = require('../db');
const getDefaultDate = require('../utils/get-default-date');
const catchAsync = require('../utils/catch-async');
const flagFormatter = require('../utils/flag-formatter');
const { ROBOTS } = require('../constants');
const {
  transformUniqueWebsitesList,
  transformRobotWebsitesList,
} = require('../transformers');

const websitesListRequests = (table, flag, date) => {
  return pool.query(
    `SELECT DISTINCT "Source" FROM "${table}" WHERE "Market" = $1 AND "ExtractionDate" = $2 ORDER BY "Source";`,
    [flag, date]
  );
};

exports.getWebsites = catchAsync(async (req, res) => {
  const { flag } = req.params;
  const { date = getDefaultDate() } = req.query;
  const formattedFlag = flagFormatter(flag);

  const requests = ROBOTS.map((robot) =>
    websitesListRequests(robot, formattedFlag, date)
  );

  const resolved = await Promise.all(requests);
  const websites = transformUniqueWebsitesList(resolved);

  res.status(200).json({
    country: formattedFlag,
    websites,
    extractionDate: date,
  });
});

const countsQuery = async (table, flag, site, date, startDate) => {
  return pool.query(
    `SELECT "ExtractionDate", "Source", COUNT("ExtractionDate") FROM "${table}" 
      WHERE "Market" = $1 AND "Source" = $2 
      AND "ExtractionDate" >= $3 AND "ExtractionDate" <= $4 GROUP BY "ExtractionDate", "Source"
      ORDER BY 1 ASC;`,
    [flag, site, startDate, date]
  );
};

exports.getSummary = catchAsync(async (req, res) => {
  const { flag } = req.params;
  const { date = getDefaultDate(), startDate } = req.query;
  const formattedFlag = flagFormatter(flag);

  const webSitesRequests = ROBOTS.map((robot) =>
    websitesListRequests(robot, formattedFlag, date)
  );
  const websitesResolved = await Promise.all(webSitesRequests);
  const robotWebsitesList = transformRobotWebsitesList(websitesResolved);

  const countsRequests = robotWebsitesList.map((list, index) =>
    list.map((website) =>
      countsQuery(ROBOTS[index], formattedFlag, website, date, startDate)
    )
  );
  const countsResolved = await Promise.all(
    countsRequests.map(async (requests) => {
      return await Promise.all(requests);
    })
  );

  const robotsCounts = ROBOTS.map((robot, index) => {
    return {
      robot,
      count: countsResolved[index].map((robotSites) => {
        return robotSites.rows;
      }),
    };
  });

  res.status(200).json({
    country: formattedFlag,
    robots: robotsCounts,
    extractionDate: date,
  });
});

const detailsQueries = (table, flag, date, website) => {
  let request;
  if (table === 'Product') {
    request = pool.query(
      `SELECT * FROM "${table}"
          WHERE "Market" = $1 AND "Source" = $2 AND "ExtractionDate" = $3
          AND ("Level2Category" SIMILAR TO '%(Samsung|Apple)%'
          OR "Level3Category" SIMILAR TO '%(Samsung|Apple)%'
          OR "Title" IS NULL OR "Title" = '' OR "SKU" IS NULL OR "SKU" = ''
          OR "Brand" ILIKE '%iphone%' OR "Brand" = '' OR "Brand" IS NULL
          OR "Color" = '' OR "Color" IS NULL OR "Price" NOT SIMILAR TO '([0-9]{1,5}(\.[0-9]{2})?)'
          OR ("OldPrice" NOT SIMILAR TO '([0-9]{1,5}(\.[0-9]{2})?)' AND "OldPrice" <> '')
          OR ("Memory" NOT SIMILAR TO '([0-9]{1,4}GB)' AND "Memory" <> '')
          OR ("Rating" NOT SIMILAR TO '([0-9](\.[0-9]{1,5})?)' AND "Rating" <> '')
          OR "HeroImage" NOT LIKE 'https://%' OR ("GalleryImages" NOT LIKE 'https://%' AND "GalleryImages" <> '')
          OR ("InpageImages" NOT LIKE 'https://%' AND "InpageImages" <> ''));`,
      [flag, website, date]
    );
  } else if (table === 'Filter') {
    request = pool.query(
      `SELECT * FROM "${table}"
          WHERE "Market" = $1 AND "Source" = $2 AND "ExtractionDate" = $3
          AND ("Brand" ILIKE '%iphone%' OR "Brand" = '' OR "Brand" IS NULL OR "ProductURL" NOT LIKE 'http%'
          OR "Label" = '' OR "Value" = '' OR "Label" IS NULL OR "Value" IS NULL
          OR "ProductName" = '' OR "ProductName" IS NULL);`,
      [flag, website, date]
    );
  } else if (table === 'Banner') {
    request = pool.query(
      `SELECT * FROM "${table}"
          WHERE "Market" = $1 AND "Source" = $2 AND "ExtractionDate" = $3
          AND ("ImageURL" NOT LIKE 'http%' OR "TargetURL" NOT LIKE 'http%');`,
      [flag, website, date]
    );
  } else if (table === 'SearchResult') {
    request = pool.query(
      `SELECT * FROM "${table}"
          WHERE "Market" = $1 AND "Source" = $2 AND "ExtractionDate" = $3
          AND ("Brand" ILIKE '%iphone%');`,
      [flag, website, date]
    );
  } else if (table === 'BasketRecommendation') {
    request = pool.query(
      `SELECT * FROM "${table}"
          WHERE "Market" = $1 AND "Source" = $2 AND "ExtractionDate" = $3
          AND ("Brand" ILIKE '%iphone%' OR "Brand" = '' OR "Brand" IS NULL
          OR "RecommendedProductImage" NOT LIKE 'https://%'
          OR "RecommendedProductPrice" NOT SIMILAR TO '([0-9]{1,5}(\.[0-9]{1,2})?)'
          OR ("RecommendedProductRating" NOT SIMILAR TO '([0-9]{1,5}(\.[0-9]{1,2})?)' AND "RecommendedProductRating" IS NOT NULL));`,
      [flag, website, date]
    );
  } else if (table === 'Review') {
    request = pool.query(
      `SELECT * FROM "${table}"
          WHERE "Market" = $1 AND "Source" = $2 AND "ExtractionDate" = $3
          AND ("Date" IS NULL
          OR ("Rating" NOT SIMILAR TO '([0-9](\.[0-9]{1,5})?)' AND "Rating" <> ''));`,
      [flag, website, date]
    );
  }

  return request;
};

exports.getDetailed = catchAsync(async (req, res) => {
  const { flag } = req.params;
  const { date = getDefaultDate(), website } = req.query;
  const formattedFlag = flagFormatter(flag);

  const robotsRequests = ROBOTS.map((robot) =>
    detailsQueries(robot, formattedFlag, date, website)
  );
  const robotsResolved = await Promise.all(robotsRequests);

  const transformData = ROBOTS.map((robot, index) => {
    return {
      robot,
      rows: robotsResolved[index].rows,
    };
  });

  res.status(200).json({
    country: formattedFlag,
    robots: transformData,
    extractionDate: date,
  });
});

const websiteDailiesQuery = (table, flag, date, website, page, rowsPerPage) => {
  const limit = rowsPerPage;
  const offset = page * rowsPerPage;

  return pool.query(
    `SELECT * FROM "${table}"
    WHERE "Market" = $1 AND "Source" = $2 AND "ExtractionDate" = $3 LIMIT $4 OFFSET $5;`,
    [flag, website, date, limit, offset]
  );
};

exports.getWebsiteDaily = catchAsync(async (req, res) => {
  const { flag } = req.params;
  const {
    date = getDefaultDate(),
    website,
    robotType,
    page,
    rowsPerPage,
  } = req.query;
  const formattedFlag = flagFormatter(flag);

  const robotResolved = await websiteDailiesQuery(
    robotType,
    formattedFlag,
    date,
    website,
    page,
    rowsPerPage
  );

  const counts = await countsQuery(
    robotType,
    formattedFlag,
    website,
    date,
    date
  );

  res.status(200).json({
    country: formattedFlag,
    robotType,
    resultsCount: counts.rows[0].count,
    robot: robotResolved.rows,
    extractionDate: date,
  });
});

const websiteCategoriesQuery = (flag, date, startDate, website) => {
  return pool.query(
    `SELECT "ExtractionDate", "Level1Category", "Level2Category", "Level3Category", COUNT(*) AS "count" 
    FROM "Product" WHERE "ExtractionDate" >= $3 AND "ExtractionDate" <= $4 AND "Market" = $1 AND "Source" = $2
    GROUP BY 1, 2, 3, 4;`,
    [flag, website, startDate, date]
  );
};

exports.getWebsiteCategories = catchAsync(async (req, res) => {
  const { flag } = req.params;
  const { date = getDefaultDate(), startDate, website } = req.query;
  const formattedFlag = flagFormatter(flag);

  const categoriesResolved = await websiteCategoriesQuery(
    formattedFlag,
    date,
    startDate,
    website
  );

  res.status(200).json({
    country: formattedFlag,
    categories: categoriesResolved.rows,
    extractionDate: date,
  });
});
