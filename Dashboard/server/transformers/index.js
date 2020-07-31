exports.transformUniqueWebsitesList = (robotsResponse) => {
  return [
    ...new Set(
      robotsResponse
        .map((robotList) => {
          return robotList.rows.map((row) => row['Source']);
        })
        .reduce(
          (accumulator, currentValue) => accumulator.concat(currentValue),
          []
        )
    ),
  ];
};

exports.transformRobotWebsitesList = (robotsResponse) => {
  return robotsResponse.map((robotList) => {
    return robotList.rows.map((row) => row['Source']);
  });
};
