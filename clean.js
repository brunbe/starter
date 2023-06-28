'use strict';
const budget = Object.freeze([
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
]);

// Object.freeze only prevents you from adding items. not from mutating items in the object.
// for deep-freeze we need an external library.

// MAKE AN OBJECT INMUTABLE:

// const spendingLimits = {
//   jonas: 1500,
//   matilda: 100,
// };
const spendingLimits = Object.freeze({
  jonas: 1500,
  matilda: 100,
});
// spendingLimits.jay = 200;
// returns error in the console: Object is not extensible

// THIS FUNCTION USES A VARIABLE FROM THE OUTER SCOPE:
// const getLimit = user => spendingLimits?.[user] ?? 0;

// FUNCTIONALE ALTERNATIVE:
const getLimit = (limits, user) => limits?.[user] ?? 0;

//THIS FUNCTION HAS A SIDE EFFECT: it manipulates and object(budget) outside of the function
// it is therefor an impure function
// const addExpense = function (value, description, user = 'jonas') {
//   user = user.toLowerCase();

//   // const limit = spendingLimits[user] ? spendingLimits[user] : 0;
//   // const limit = getLimit(user);

//   if (value <= getLimit(user)) {
//     // budget.push({ value: -value, description: description, user: user });
//     // enhanced object literals: if property name = variable name, no need to repeat
//     budget.push({ value: -value, description, user });
//   }
// };

//SOLUTION:
// 1. PASS ALL THE STATE INTO THE FUNCTION
// 2. RETURN A MUTATED COPY OF THE STATE, DON'T MUTATE STATE ITSELF
const addExpense = function (
  state,
  limits,
  value,
  description,
  user = 'jonas'
) {
  const cleanUser = user.toLowerCase();

  // const limit = spendingLimits[user] ? spendingLimits[user] : 0;
  // const limit = getLimit(user);

  // if (value <= getLimit(cleanUser)) {
  // budget.push({ value: -value, description: description, user: user });
  // enhanced object literals: if property name = variable name, no need to repeat
  // budget.push({ value: -value, description, user});

  // MAKING THE CODE MORE DECLARATIVE AND FUNCIONAL:
  return value <= getLimit(limits, cleanUser)
    ? [...state, { value: -value, description, user: cleanUser }]
    : state;
};

// since we are no longer mutating state, we need to store these calls in variables:
// addExpense(budget, spendingLimits, 10, 'Pizza 🍕');
const newBudget1 = addExpense(budget, spendingLimits, 10, 'Pizza 🍕');
// addExpense(budget, spendingLimits, 100, 'Going to movies 🍿', 'Matilda');
const newBudget2 = addExpense(
  newBudget1,
  spendingLimits,
  100,
  'Going to movies 🍿',
  'Matilda'
);
// addExpense(budget, spendingLimits, 200, 'Stuff', 'Jay');
const newBudget3 = addExpense(newBudget2, spendingLimits, 200, 'Stuff', 'Jay');

// the above example should be done with composing and/or currying in the real world.

const checkExpenses = function (state, limits) {
  // // LOOPS are not DECLARATIVE, replace them with METHODS
  // for (const entry of budget) {
  //   //   let lim;
  //   //   if (spendingLimits[entry.user]) {
  //   //     lim = spendingLimits[entry.user];
  //   //   } else {
  //   //     lim = 0;
  //   //   }
  //   // const limit = spendingLimits?.[entry.user] ?? 0;
  //   if (entry.value < -getLimit(limits, entry.user)) {
  //     entry.flag = 'limit';
  //   }
  // }
  return state.map(entry => {
    return entry.value < -getLimit(limits, entry.user)
      ? { ...entry, flag: 'limit' }
      : entry;
  });
};

const finalBudget = checkExpenses(newBudget3, spendingLimits);
console.log(finalBudget);

// // THIS IS VERY IMPERATIVE: in functional code we will not see let-variables.
// const logBigExpenses = function (bigLimit = 1000) {
//   let output = '';
//   for (const entry of budget) {
//     output +=
//       entry.value <= -bigLimit ? `${entry.description.slice(-2)} / ` : ''; // Emojis are 2 chars
//   }
//   output = output.slice(0, -2); // Remove last '/ '
//   console.log(output);
// };

// FUNCTIONAL AND DECLARAYIVE SOLUTION:
const logBigExpenses = function (state, bigLimit) {
  const bigExpenses = state
    .filter(entry => entry.value <= -bigLimit)
    .map(entry => entry.description.slice(-2))
    .join(' / ');
  // .reduce((str, cur) => `${str} / ${cur.description.slice(-2)}`, '');

  console.log(bigExpenses);
};
logBigExpenses(finalBudget, 500);
