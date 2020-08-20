export default {
  Title: (value) => {
    if (!value) {
      return true;
    }
    return false;
  },
  Brand: (value) => {
    if (!value || /iphone/i.test(value)) {
      return true;
    }
    return false;
  },
  SKU: (value) => {
    if (!value) {
      return true;
    }
    return false;
  },
  Copy: (value) => {
    if (
      value &&
      /{/.test(value) &&
      /}/.test(value) &&
      /\(/.test(value) &&
      /\)/.test(value)
    ) {
      return true;
    }
    return false;
  },
  Price: (value) => {
    if (!value || !/^\d{1,5}(\.\d{2})?$/.test(value)) {
      return true;
    }
    return false;
  },
  OldPrice: (value) => {
    if (value && !/^\d{1,5}(\.\d{2})?$/.test(value)) {
      return true;
    }
    return false;
  },
  Memory: (value) => {
    if (value && !/^\d{1,4}(GB|MB)$/.test(value)) {
      return true;
    }
    return false;
  },
  Rating: (value) => {
    if (value && !/^\d{1}(\.\d+)?$/.test(value)) {
      return true;
    }
    return false;
  },
  Reviews: (value) => {
    if (value && !/^\d+$/.test(value)) {
      return true;
    }
    return false;
  },
};
