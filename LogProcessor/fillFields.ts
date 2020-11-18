function getHostName(data: string): string[] {
  const rows: string[] = splitRawData(data);
  return rows
    .map((x) => x.split(' ')[10])
    .map((x) => x.match(/(?<=http:\/\/)[a-z0-9\.-]+/)[0]);
}

function getTheDate(data: string): string[] {
  const rows: string[] = splitRawData(data);
  return rows.map((x) => x.split(' ')[0]);
}

function getTheHour(data: string): string[] {
  const rows: string[] = splitRawData(data);
  return rows.map((x) => x.split(' ')[1]).map((x) => x.substring(0, 4) + '0');
}

function getStatusCode(data: string): string[] {
  const rows: string[] = splitRawData(data);
  return rows
    .map((x) => x.split(' ')[7])
    .map((x) => x.substring(x.indexOf('/') + 1));
}

function getHitMissStatus(data: string): string[] {
  const rows: string[] = splitRawData(data);
  return rows
    .map((x) => x.split(' ')[7])
    .map((x) =>
      x.substring(x.lastIndexOf('_') + 1, x.indexOf('/')).toLowerCase()
    );
}

function getBytes(data: string): number[] {
  const rows: string[] = splitRawData(data);
  return rows.map((x) => x.split(' ')[8]).map(Number);
}

function splitRawData(rawData: string): string[] {
  const rows: string[] = rawData
    .split('\n')
    .map((x) => x.trim())
    .filter((x) => x !== '');
  // remove the header row
  rows.shift();
  return rows;
}

export = {
  getHostName,
  getTheDate,
  getTheHour,
  getStatusCode,
  getHitMissStatus,
  getBytes,
  splitRawData,
};
