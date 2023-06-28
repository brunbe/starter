// exporting module
console.log('exporting module');

// // some blocking code: the top-level await will block the code in the exporting module but also in the importing module.
// console.log('Start fetching users');
// await fetch('https://jsonplaceholder.typicode.com/users');
// console.log('Finish fetching users');

const shippingCost = 10;
export const cart = [];

// exports must always happen in top level code. they cannot be nested in code blocks or other logic.
export const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart `);
};

const totalPrice = 237;
const totalQuantity = 23;

export { totalPrice, totalQuantity as qt };

//  DEFAULT EXPORTS
//  used when we only want to export 1 thing per module.
//  variable does not need a name (see below), name can be set on import.

export default function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart `);
}
