## Introduction
---
"Promises are objects that represent the eventual outcome of an asynchronous operation."  They can be in one of three states:

* pending - initial state; operation not completed  
* fulfilled - successfully completed  
* rejected - operation failed, usually due to an `Error`  

The latter two make the promise *settled*.

## Constructing a promise object
---
Consider the following code:

```javascript hl_lines='15 16 17'
{!./src/javascript/js/jsPromiseExample1.js!}
```

We first pass an *executor function* into the `Promise` constructor.  The executor runs automatically when the constructor is called.  It starts an async operation and determines how the promise should be settled.

```javascript hl_lines='7 8 9 10 11 12 13'
{!./src/javascript/js/jsPromiseExample1.js!}
```

The executor's two arguments, `resolve()` and `reject()`, are functions defined by JavaScript, not the programmer.  They each take one argument.

The promise's resolve value will be set to the argument passed to `resolve()` if invoked, and the promise's status will be changed from pending to fulfilled.

The promise's rejection reason will be set to the argument passed to `reject()` if invoked, and the promise's status will be changed from pending to rejected.

Usually, promises settle based on the results of async operations, not on simple conditions like this.

## The Node `setTimeout()` function
---
 The `setTimeout()` function takes a callback function and a delay time in milliseconds.

The delay is *at least* the time in milliseconds - after the delay time, the callback is added to the event-loop, so it might not be run immediately.  Before it is run, synchronous code and code in front of it in line will run.

```javascript
console.log("This is the first line of code in app.js.");

const usingSTO = () => {
  console.log('I\'m a string.')
};

setTimeout(usingSTO, 2000);

console.log("This is the last line of code in app.js.");
// prints:
// This is the first line of code in app.js.
// This is the last line of code in app.js.
// I'm a string.
```

## Consuming promises
---

### `.then()`
Promise objects have a `.then()` method that determines what will happen when the promise returns.  It takes two parameters, callback functions known as *handlers*, sometimes called `onFulfilled` and `onRejected`.

"We can invoke `.then()` with one, both, or neither handler! This allows for flexibility, but it can also make for tricky debugging. If the appropriate handler is not provided, instead of throwing an error, `.then()` will just return a promise with the same settled value as the promise it was called on. One important feature of `.then()` is that it always returns a promise."

Simple example:
```javascript
let prom = new Promise((resolve, reject) => {
  let num = Math.random();
  if (num < .5 ){
    resolve('Yay!');
  } else {
    reject('Ohhh noooo!');
  }
});

const handleSuccess = (resolvedValue) => {
  console.log(resolvedValue);
};

const handleFailure = (rejectionReason) => {
  console.log(rejectionReason);
};

prom.then(handleSuccess, handleFailure);
```

### `.catch()`
"... `.then()` will return a promise with the same settled value as the promise it was called on if no appropriate handler was provided," so we can chain them together like `prom.then().then()`.  Better, we can use `.catch()` in place of the second `.then()`; it takes one argument, `onRejected`.

## Chaining promises
---

Chaining promises is useful when multiple operations depend on one another or when they must be executed in a certain order, like 'wash clothes, dry clothes, put away clothes'.  This is called *composition*.

Extended example:
```javascript
// library.js
const store = {
  sunglasses: {
    inventory: 817, 
    cost: 9.99
  },
  pants: {
    inventory: 236, 
    cost: 7.99
  },
  bags: {
    inventory: 17, 
    cost: 12.99
  }
};

const checkInventory = (order) => {
  return new Promise ((resolve, reject) => {
   setTimeout(()=> {  
   const itemsArr = order.items;  
   let inStock = itemsArr.every(item => store[item[0]].inventory >= item[1]);
   
   if (inStock){
     let total = 0;   
     itemsArr.forEach(item => {
       total += item[1] * store[item[0]].cost
     });
     console.log(`All of the items are in stock. The total cost of the order is ${total}.`);
     resolve([order, total]);
   } else {
     reject(`The order could not be completed because some items are sold out.`);
   }     
}, generateRandomDelay());
 });
};

const processPayment = (responseArray) => {
  const order = responseArray[0];
  const total = responseArray[1];
  return new Promise ((resolve, reject) => {
   setTimeout(()=> {  
   let hasEnoughMoney = order.giftcardBalance >= total;
   // For simplicity we've omited a lot of functionality
   // If we were making more realistic code, we would want to update the giftcardBalance and the inventory
   if (hasEnoughMoney) {
     console.log(`Payment processed with giftcard. Generating shipping label.`);
     let trackingNum = generateTrackingNumber();
     resolve([order, trackingNum]);
   } else {
     reject(`Cannot process order: giftcard balance was insufficient.`);
   }
   
}, generateRandomDelay());
 });
};


const shipOrder = (responseArray) => {
  const order = responseArray[0];
  const trackingNum = responseArray[1];
  return new Promise ((resolve, reject) => {
   setTimeout(()=> {  
     resolve(`The order has been shipped. The tracking number is: ${trackingNum}.`);
}, generateRandomDelay());
 });
};


// This function generates a random number to serve as a "tracking number" on the shipping label. In real life this wouldn't be a random number
function generateTrackingNumber() {
  return Math.floor(Math.random() * 1000000);
}

// This function generates a random number to serve as delay in a setTimeout() since real asynchrnous operations take variable amounts of time
function generateRandomDelay() {
  return Math.floor(Math.random() * 2000);
}

module.exports = {checkInventory, processPayment, shipOrder};
```

```javascript
// app.js
const {checkInventory, processPayment, shipOrder} = require('./library.js');

const order = {
  items: [['sunglasses', 1], ['bags', 2]],
  giftcardBalance: 79.82
};

checkInventory(order)
.then((resolvedValueArray) => {
 return processPayment(resolvedValueArray);
})
.then((resolvedValueArray) => {
  return shipOrder(resolvedValueArray);
})
.then((successMessage) => {
  console.log(successMessage);
})
.catch((errorMessage) => {
  console.log(errorMessage);
});
```

### Gotchas

1. Don't nest promises instead of chaining them.
2. Don't forget to `return` a promise.

## `Promise.all()`
---

`Promise.all()` uses concurrency to execute multiple async operations at the same time.

It accepts an array of promises and returns a single promise.

If all arguments in the array resolve, then an array with the resolve value of each promicse will be returned.  If any promise fails, then `Promise.all()` will reject.

```javascript
const {checkAvailability} = require('./library.js');

const onFulfill = (itemsArray) => {
  console.log(`Items checked: ${itemsArray}`);
  console.log(`Every item was available from the distributor. Placing order now.`);
};
const onReject = (rejectionReason) => {
	console.log(rejectionReason);
};

const checkSunglasses = checkAvailability('sunglasses', 'Favorite Supply Co.');
const checkPants = checkAvailability('pants', 'Favorite Supply Co.');
const checkBags = checkAvailability('bags', 'Favorite Supply Co.');

Promise.all([checkSunglasses, checkPants, checkBags])
    .then(onFulfill)
    .catch(onReject);
// prints:
// Checking availability of sunglasses at Favorite Supply Co....
// Checking availability of pants at Favorite Supply Co....
// Checking availability of bags at Favorite Supply Co....
// sunglasses are in stock at Favorite Supply Co.
// pants are in stock at Favorite Supply Co.
// bags are in stock at Favorite Supply Co.
// Items checked: sunglasses,pants,bags
// Every item was available from the distributor. Placing order now.
// OR
// Checking availability of sunglasses at Favorite Supply Co....
// Checking availability of pants at Favorite Supply Co....
// Checking availability of bags at Favorite Supply Co....
// pants are in stock at Favorite Supply Co.
// Error: sunglasses is unavailable from Favorite Supply Co. at this time.
```
