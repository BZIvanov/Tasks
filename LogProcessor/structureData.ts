const data = {};

function structureData(
  hostNames: string[],
  dates: string[],
  hours: string[],
  statusCode: string[],
  hitMissStatus: string[],
  bytes: number[],
  incorrectIndexes: number[]
) {
  // remove incorrect data
  let countsRemoved = 0;
  for (let row = 0; row < hostNames.length; row++) {
    if (incorrectIndexes.includes(row)) {
      hostNames.splice(row - countsRemoved, 1);
      dates.splice(row - countsRemoved, 1);
      hours.splice(row - countsRemoved, 1);
      statusCode.splice(row - countsRemoved, 1);
      hitMissStatus.splice(row - countsRemoved, 1);
      bytes.splice(row - countsRemoved, 1);
      countsRemoved++;
      const idx = incorrectIndexes.indexOf(row);
      incorrectIndexes.splice(idx, 1);
    }
  }

  for (let row = 0; row < hostNames.length; row++) {
    fillDynamicProps(data, hostNames[row]);
    fillDynamicProps(data[hostNames[row]], dates[row]);
    fillDynamicProps(data[hostNames[row]][dates[row]], hours[row]);
    fillDynamicProps(
      data[hostNames[row]][dates[row]][hours[row]],
      statusCode[row]
    );
    fillDynamicProps(
      data[hostNames[row]][dates[row]][hours[row]][statusCode[row]],
      hitMissStatus[row]
    );

    const prop =
      data[hostNames[row]][dates[row]][hours[row]][statusCode[row]][
        hitMissStatus[row]
      ];
    fillStaticProps(prop, 'requests', 1);
    fillStaticProps(prop, 'bytes', bytes[row]);
  }
  return JSON.stringify(data);
}

function fillDynamicProps(parentProp: Object, childrenProp: string) {
  if (!parentProp.hasOwnProperty(childrenProp)) {
    parentProp[childrenProp] = {};
  }
}

function fillStaticProps(
  parentProp: Object,
  childrenProp: string,
  value: number
) {
  if (!parentProp.hasOwnProperty(childrenProp)) {
    parentProp[childrenProp] = value;
  } else {
    parentProp[childrenProp] += value;
  }
}

export = structureData;
