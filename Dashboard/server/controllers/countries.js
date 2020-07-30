const pool = require('../db');
const getDefaultDate = require('../utils/get-default-date');

const getWebsitesList = async (table, flag, date) => {
  try {
    const sources = await pool.query(
      `SELECT DISTINCT "Source" FROM "${table}" WHERE "Market" = $1 AND "ExtractionDate" = $2 ORDER BY "Source";`,
      [flag.toUpperCase(), date]
    );

    return sources.rows.map((source) => source['Source']);
  } catch (err) {
    console.log(err);
  }
};

exports.getWebsites = async (req, res) => {
  const { flag } = req.params;
  const { date = getDefaultDate() } = req.query;

  const products = await getWebsitesList('Product', flag, date);
  const filters = await getWebsitesList('Filter', flag, date);
  const banners = await getWebsitesList('Banner', flag, date);
  const searches = await getWebsitesList('SearchResult', flag, date);
  const baskets = await getWebsitesList('BasketRecommendation', flag, date);
  const review = await getWebsitesList('Review', flag, date);

  const allResults = [
    ...products,
    ...filters,
    ...banners,
    ...searches,
    ...baskets,
    ...review,
  ];

  const websites = [...new Set(allResults)];

  res.status(200).json({
    country: flag,
    websites,
    extractionDate: date,
  });
};

const tableData = async (table, flag, date, startDate) => {
  try {
    const websites = await getWebsitesList(table, flag, date);

    const websitesRequests = websites.map((site) =>
      pool.query(
        `SELECT "ExtractionDate", COUNT("ExtractionDate") FROM "${table}" 
        WHERE "Market" = $1 AND "Source" = $2 
        AND "ExtractionDate" >= $3 AND "ExtractionDate" <= $4 GROUP BY "ExtractionDate" 
        ORDER BY 1 DESC;`,
        [flag.toUpperCase(), site, startDate, date]
      )
    );

    const counts = await Promise.all(websitesRequests);

    return { websites, counts };
  } catch (err) {
    console.log(err);
  }
};

exports.getSummary = async (req, res) => {
  const { flag } = req.params;
  const { date = getDefaultDate(), startDate } = req.query;

  try {
    const products = await tableData('Product', flag, date, startDate);
    const filters = await tableData('Filter', flag, date, startDate);
    const banners = await tableData('Banner', flag, date, startDate);
    const searches = await tableData('SearchResult', flag, date, startDate);
    const baskets = await tableData(
      'BasketRecommendation',
      flag,
      date,
      startDate
    );
    const reviews = await tableData('Review', flag, date, startDate);

    const transformData = (table) => {
      return table.websites.map((website, index) => {
        return {
          website,
          count: table.counts[index].rows,
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
      reviews: transformData(reviews),
      extractionDate: date,
    });
  } catch (err) {
    console.log(err.message);
  }
};

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
    console.log(err);
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
