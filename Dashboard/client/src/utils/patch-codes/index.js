export default (code) => {
  switch (code) {
    case 'GB':
      return 'uk';
    case 'BG':
      return 'bu';
    default:
      return code;
  }
};
