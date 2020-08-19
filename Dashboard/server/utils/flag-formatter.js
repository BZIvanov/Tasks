module.exports = (flag) => {
  switch (flag.toUpperCase()) {
    case 'GB':
      flag = 'UK';
      break;
    case 'BG':
      flag = 'BU';
  }
  return flag.toUpperCase();
};
