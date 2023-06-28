// importing module
console.log('importing module');

// //  NAMED IMPORTS

// import { addToCart, totalPrice as price, qt } from './shoppingCart.js';
// addToCart('bread', 5);
// console.log(price, qt);

// //  CREATING A NAMESPACE AND IMPORTING EVERYTHING AT THE SAME TIME

// import * as ShoppingCart from './shoppingCart.js';
// ShoppingCart.addToCart('bread', 5);
// console.log(ShoppingCart.totalPrice, ShoppingCart.qt);

// //  DEFAULT IMPORTS:
// //  value market as default is imported when no curly braces are use
// //  in this case an anonymous function that now gets the name 'add'
// import add from './shoppingCart.js';
// add('pizza', 2);

// //  MIXING DEFAULT AND NAMED (not recommended);

// // cart is still empty
// console.log(cart);

// import add, { cart } from './shoppingCart.js';
// add('pizza', 2);
// add('bread', 5);
// add('apples', 4);

// // cart is full
// console.log(cart);

// // comparing the first and second log of 'cart' shows
// // that there is a live-connection between the import and the export

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// // //  TOP-LEVEL AWAIT (using the await keyword outside an async fucntion, only works in modules)

// // console.log('Start fetching');
// // const res = await fetch('https://jsonplaceholder.typicode.com/posts');
// // const data = await res.json();
// // console.log(data);
// // console.log('Something');
// // //  warning: this now block the execution of the rest of the module.

// //   A MORE REALISTIC TOP-LEVEL AWAIT
// const getLastPost = async function () {
//   const res = await fetch('https://jsonplaceholder.typicode.com/posts');
//   const data = await res.json();
//   console.log(data);

//   return { title: data.at(-1).title, text: data.at(-1).body };
// };

// const lastPost = getLastPost();
// console.log(lastPost); // returns promise that must be consumed.
// // // Not very clean: using .then() to consume the promise;
// // lastPost.then(last => console.log(last));

// //using top-level await to consume the promise:
// const lastPost2 = await getLastPost();
// console.log(lastPost2);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// // THE MODULE PATTERN
// // wrap the data in a fucntion (IIFE) to ensure data privacy.

// const ShoppingCart2 = (function () {
//   const cart = [];
//   const shippingCost = 10;
//   const totalPrice = 237;
//   const totalQuantity = 23;

//   const addToCart = function (product, quantity) {
//     cart.push({ product, quantity });
//     console.log(
//       `${quantity} ${product} added to cart (shipping cost is ${shippingCost}) `
//     );
//   };

//   const orderStock = function (product, quantity) {
//     console.log(`${quantity} ${product} ordered from supplier`);
//   };

//   // return an object with the data that we want to expose.
//   return {
//     addToCart,
//     cart,
//     totalPrice,
//     totalQuantity,
//   };
// })();

// ShoppingCart2.addToCart('apple', 4);
// ShoppingCart2.addToCart('spaghetti', 1);
// console.log(ShoppingCart2);
// console.log(ShoppingCart2.shippingCost);

// this way of working with modules has become obsolete since the ES6, when native modules were introduced.

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// // COMMON JS MODULES (very important for Nodejs)
// // most modules in NPM still use common js pattern
// // 1 file = 1 module

// //EXPORT (NODEJS EXAMPLE)

// export.addToCart = function (product, quantity){
//   cart.push({product, quantity});
//   console.log(
//     `${quantity} ${product} added to cart (shipping cost is ${shippingCost})`
//   );
// }

// //IMPORT (NODEJS)

// const { addToCart} = require('./shoppingCart.js');

// // the above code will only work in Node.js. not in the browser.

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//  NODE PACKAGE MANAGER (NPM)

// import cloneDeep from './node_modules/lodash-es/cloneDeep.js';
import cloneDeep from 'lodash-es';

const state = {
  cart: [
    { product: 'bread', quantity: 5 },
    { product: 'pizza', quantity: 3 },
  ],
  user: { loggedIn: true },
};

const stateClone = Object.assign({}, state);
const stateDeepClone = cloneDeep(state);
state.user.loggedIn = false;
// changes with the original
console.log(stateClone);
// is independent from the original
console.log(stateDeepClone);

//  HOT MODULE REPLACEMENT: change JS without triggering a reload.
if (module.hot) {
  module.hot.accept();
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// PARCEL: MODULE BUNDLER

// install parcel using npm: npm install parcel --save-dev
// parcel is a dev dependency: it is only needed for development not for usage;
// start parcel: npx parcel index.html
// or write script in package.json

// INSTALLATION: GLOBALLY OR LOCALLY?
// best to install locally. it is easier to update to new versions of the tools.

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// BABEL: source code to compiled code
// babel can only convert new syntax to old syntax but not convert new features.
// for converting new features we should use polyfilling.

class Person {
  #greeting = 'Hey';
  constructor(name) {
    this.name = name;
    console.log(`${this.#greeting},${this.name}`);
  }
}

const jonas = new Person('Jonas');

console.log('Jonas' ?? null);

// console.log(cart.find(el => el.quantity >= 2));
Promise.resolve('TEST').then(x => console.log(x));

// POLYFILLING:

import 'core-js/stable';
import 'regenerator-runtime/runtime';

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
