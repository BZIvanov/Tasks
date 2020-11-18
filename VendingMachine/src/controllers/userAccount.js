import { userBalance } from '../models/user';
import { banknoteAsNumberValue } from '../utilities/banknotes';

const updateUserBalance = (userInput) =>
  (userBalance.amount += banknoteAsNumberValue[userInput]);

export { updateUserBalance };
