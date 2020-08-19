module.exports = (flag) => {
  switch (flag) {
    case 'gb':
      flag = 'uk';
      break;
    case 'bg':
      flag = 'bu';
  }
  return flag.toUpperCase();
};
