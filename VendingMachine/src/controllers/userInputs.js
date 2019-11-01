import { validBanknotes, banknoteAsNumberValue } from '../utilities/banknotes';
import { messageTheUser } from '../utilities/feedback';
import { updateUserBalance } from './userAccount';
import { products, currentChange } from '../models/vendingMachine';
import { userBalance } from '../models/user';

/**
* This function will handle the change for the user
* @param {number} userBalance The amount of cash the user added in the vending machine
* @param {Object} item The object holding the data for the selected slot
* @return {void} On the console should be displayed message of how the user's request was handled.
*/
const vendingChange = (userBalance, item) => {
    const currentChangeNotes = Object.assign({}, currentChange);
    let change = Math.round((userBalance - item.price) * 100) / 100;
    const notes = Object.keys(currentChangeNotes);
    const changeForTheUser = [];

    for (let note of notes) {
        while (change >= banknoteAsNumberValue[note] && currentChangeNotes[note] > 0) {
            change = Math.round((change - banknoteAsNumberValue[note]) * 100) / 100;
            currentChangeNotes[note]--;
            changeForTheUser.push(note);
        }
    }
    if (change === 0) {
        messageTheUser('Enjoy!');
        messageTheUser(`Item = ${item.productName}`);
        messageTheUser(`Change = ${changeForTheUser.join(', ')}`);
    } else {
        messageTheUser('The vending machine does not have enough change!');
    }
}

/**
* This function will handle incorrect inputs or when the user is trying to add more cash in the vending machine
* @param {string} userInput The banknote the user is providing
* @return {void} On the console should be displayed message with the amount of cash added or error message in case of incorrect input
*/
const handleUserInsertion = (userInput) => {
    if (validBanknotes.indexOf(userInput) !== -1) {
        updateUserBalance(userInput);
        messageTheUser(`Tendered = ${userBalance.amount.toFixed(2)}`);
    } else {
        messageTheUser('Incorrect input!')
    }
};

/**
* This function will handle the slot on the vending machine requested by the user
* @param {string} userInput The slot and its number
* @return {void} On the console should be displayed message of what happened after the user requested the slot
*/
const handleUserRequest = (userInput) => {
    if (products[userInput].quantity === 0) {
        messageTheUser(`Sorry, we are out of ${products[userInput].productName} products!`);
    } else if (products[userInput].price > userBalance.amount) {
        messageTheUser(`Sorry, you don't have enough money to buy ${products[userInput].productName}`);
    } else {
        vendingChange(userBalance.amount, products[userInput]);
    }
};

export { handleUserInsertion, handleUserRequest };
