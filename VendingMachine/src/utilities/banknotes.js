const validBanknotes = ['$2', '$1', '50c', '20c', '10c', '5c'];

const banknoteAsNumberValue = {
    '$2': 2,
    '$1': 1,
    '50c': 0.5,
    '20c': 0.2,
    '10c': 0.1,
    '5c': 0.05
};

export { validBanknotes, banknoteAsNumberValue };
