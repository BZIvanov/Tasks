const pool = require('../db');
const getDefaultDate = require('../utils/get-default-date');
const catchAsync = require('../utils/catch-async');
const AppError = require('../utils/app-error');
const { ROBOTS } = require('../constants');
const {
  transformUniqueWebsitesList,
  transformRobotWebsitesList,
} = require('../transformers');

const websitesListRequests = (table, flag, date) => {
  return pool.query(
    `SELECT DISTINCT "Source" FROM "${table}" WHERE "Market" = $1 AND "ExtractionDate" = $2 ORDER BY "Source";`,
    [flag.toUpperCase(), date]
  );
};

exports.getWebsites = catchAsync(async (req, res) => {
  const { flag } = req.params;
  const { date = getDefaultDate() } = req.query;

  const requests = ROBOTS.map((robot) =>
    websitesListRequests(robot, flag, date)
  );

  const resolved = await Promise.all(requests);
  const websites = transformUniqueWebsitesList(resolved);

  res.status(200).json({
    country: flag,
    websites,
    extractionDate: date,
  });
});

const tableData = async (table, flag, site, date, startDate) => {
  return pool.query(
    `SELECT "ExtractionDate", "Source", COUNT("ExtractionDate") FROM "${table}" 
      WHERE "Market" = $1 AND "Source" = $2 
      AND "ExtractionDate" >= $3 AND "ExtractionDate" <= $4 GROUP BY "ExtractionDate", "Source"
      ORDER BY 1 DESC;`,
    [flag.toUpperCase(), site, startDate, date]
  );
};

exports.getSummary = catchAsync(async (req, res) => {
  const { flag } = req.params;
  const { date = getDefaultDate(), startDate } = req.query;

  const webSitesRequests = ROBOTS.map((robot) =>
    websitesListRequests(robot, flag, date)
  );
  const websitesResolved = await Promise.all(webSitesRequests);
  const robotWebsitesList = transformRobotWebsitesList(websitesResolved);

  const countsRequests = robotWebsitesList.map((list, index) =>
    list.map((website) =>
      tableData(ROBOTS[index], flag, website, date, startDate)
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
    country: flag,
    robots: robotsCounts,
    extractionDate: date,
  });
});

const detailedQueries = async (table, flag, date, website) => {
  try {
    let websiteRequest;

    if (table === 'Product') {
      websiteRequest = pool.query(
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
        [flag.toUpperCase(), website, date]
      );
    } else if (table === 'Filter') {
      websiteRequest = pool.query(
        `SELECT * FROM "${table}" 
          WHERE "Market" = $1 AND "Source" = $2 AND "ExtractionDate" = $3
          AND ("Brand" ILIKE '%iphone%' OR "Brand" = '' OR "Brand" IS NULL OR "ProductURL" NOT LIKE 'http%'
          OR "Label" = '' OR "Value" = '' OR "Label" IS NULL OR "Value" IS NULL
          OR "ProductName" = '' OR "ProductName" IS NULL);`,
        [flag.toUpperCase(), website, date]
      );
    } else if (table === 'Banner') {
      websiteRequest = pool.query(
        `SELECT * FROM "${table}" 
          WHERE "Market" = $1 AND "Source" = $2 AND "ExtractionDate" = $3
          AND ("ImageURL" NOT LIKE 'http%' OR "TargetURL" NOT LIKE 'http%');`,
        [flag.toUpperCase(), website, date]
      );
    } else if (table === 'SearchResult') {
      websiteRequest = pool.query(
        `SELECT * FROM "${table}" 
          WHERE "Market" = $1 AND "Source" = $2 AND "ExtractionDate" = $3
          AND ("Brand" ILIKE '%iphone%');`,
        [flag.toUpperCase(), website, date]
      );
    } else if (table === 'BasketRecommendation') {
      websiteRequest = pool.query(
        `SELECT * FROM "${table}" 
          WHERE "Market" = $1 AND "Source" = $2 AND "ExtractionDate" = $3
          AND ("Brand" ILIKE '%iphone%' OR "Brand" = '' OR "Brand" IS NULL 
          OR "RecommendedProductImage" NOT LIKE 'https://%'
          OR "RecommendedProductPrice" NOT SIMILAR TO '([0-9]{1,5}(\.[0-9]{1,2})?)'
          OR ("RecommendedProductRating" NOT SIMILAR TO '([0-9]{1,5}(\.[0-9]{1,2})?)' AND "RecommendedProductRating" IS NOT NULL));`,
        [flag.toUpperCase(), website, date]
      );
    }

    const counts = await websiteRequest;

    return { websites: [website], counts };
  } catch (err) {
    throw new AppError('Something went oops', 500);
  }
};

exports.getDetailed = async (req, res) => {
  const { flag } = req.params;
  const { date = getDefaultDate(), website } = req.query;

  try {
    const products = await detailedQueries('Product', flag, date, website);
    const filters = await detailedQueries('Filter', flag, date, website);
    const banners = await detailedQueries('Banner', flag, date, website);
    const searches = await detailedQueries('SearchResult', flag, date, website);
    const baskets = await detailedQueries(
      'BasketRecommendation',
      flag,
      date,
      website
    );
    // const reviews = await detailedQueries('Review', flag, date);

    const transformData = (table) => {
      return table.websites.map((website) => {
        return {
          website,
          count: table.counts.rows,
          // count: table.counts.rowCount,
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
      // reviews: transformData(reviews),
      extractionDate: date,
    });
  } catch (err) {
    console.log(err.message);
  }
};
