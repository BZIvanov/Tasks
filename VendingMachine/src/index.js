import { handleUserInsertion, handleUserRequest } from './controllers/userInputs';
import { products } from './models/vendingMachine';
const readlineSync = require('readline-sync');

const slots = Object.keys(products);

for (let product in products) {
    const slotString = product[0].toUpperCase() + product.substring(1);
    const quantity = products[product]['quantity'];
    const name = products[product]['productName'];
    const price = products[product]['price'];
    console.log(`${slotString} - ${quantity} x ${name} = ${price}`);
}
console.log();

let userInput = readlineSync.question('Enter = ');
while (slots.indexOf(userInput) === -1) {
    handleUserInsertion(userInput);
    console.log();
    userInput = readlineSync.question('Enter = ');
}

handleUserRequest(userInput);
