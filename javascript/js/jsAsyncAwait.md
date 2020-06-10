## Introduction
---
Promises in ES6 replace the need for callbacks to handle asynchronous actions.

ES8 provides `async...await` (syntactic sugar for using promises and generators).

**Async functions return promises.**  Example:
```javascript
async function example() { }
// returns a promise object that will resolve to undefined
```

Examples:
```javascript
// promisedReadfile.js

const fs = require('fs');
// Below we create a function for reading files that returns a promise. We converted the fs.readfile() function which uses callbacks. Many of the asynchronous functions you'll encounter already return promises, so this extra step is seldom necessary. 
const promisifiedReadfile = (file, encoding) => 
  new Promise((resolve, reject) => {
    fs.readFile(file, encoding, (err, text) => {
			if (err) {
				return reject(err.message);
      }
        resolve(text);
      });
});

module.exports = promisifiedReadfile
```

```javascript
// app.js

const fs = require('fs');
const promisifiedReadfile = require('./promisifiedReadfile');
      
// Here we use fs.readfile() and callback functions:
fs.readFile('./file.txt', 'utf-8', (err, data) => {
  if (err) throw err;
  let firstSentence = data;
  fs.readFile('./file2.txt',  'utf-8', (err, data) => {
    if (err) throw err;
    let secondSentence = data;
    console.log(firstSentence, secondSentence)
  });
});

// Here we use native promises with our "promisified" version of readfile:
let firstSentence
promisifiedReadfile('./file.txt', 'utf-8')
  .then((data) => {
    firstSentence = data;
    return promisifiedReadfile('./file2.txt', 'utf-8')
  })
  .then((data) => {
    let secondSentence = data;
    console.log(firstSentence, secondSentence)
  })
  .catch((err) => {console.log(err)});

// Here we use promisifiedReadfile() again but instead of using the native promise .then() syntax, we declare and invoke an async/await function:
async function readFiles() {
  let firstSentence = await promisifiedReadfile('./file.txt', 'utf-8')
  let secondSentence = await promisifiedReadfile('./file2.txt', 'utf-8')
  console.log(firstSentence, secondSentence)
}
readFiles()
```

## `async` keyword
---

async function declaration:
```javascript
async function myFunc() {
    // function body
};
```

async function expression:
```javascript
const myFunc = async () => {
    // function body
};
```

`async` functions return a promise, so we can use `.then()` and `.catch`.

three types of returns:
* If there’s nothing returned from the function, it will return a promise with a resolved value of undefined
* If there’s a non-promise value returned from the function, it will return a promise resolved to that value
* If a promise is returned from the function, it will simply return that promise

example of a non-promise value returned:
```javascript
async function fivePromise() { 
  return 5;
}

fivePromise()
.then(resolvedValue => {
    console.log(resolvedValue);
  })  // Prints 5
```

## `await` operator
---

`await` returns the resolved value of a promise

```javascript
// Native promise version:
function nativePromiseDinner() {
  brainstormDinner().then((meal) => {
	  console.log(`I'm going to make ${meal} for dinner.`);
  })
}

// async/await version:
async function announceDinner() {
  // Write your code below:
  let meal = await brainstormDinner();
  console.log(`I'm going to make ${meal} for dinner.`);
}
```

Without using `await`, an async function will return the promise object itself rather than its resolved value.

## Dependent promises
---

This:
```javascript
function nativePromiseVersion() {
    returnsFirstPromise()
    .then((firstValue) => {
        console.log(firstValue);
        return returnsSecondPromise(firstValue);
    })
   .then((secondValue) => {
        console.log(secondValue);
    });
}
```

vs. this:

```javascript
async function asyncAwaitVersion() {
    let firstValue = await returnsFirstPromise();
    console.log(firstValue);
    let secondValue = await returnsSecondPromise(firstValue);
    console.log(secondValue);
}
```

## Handling errors
---

Instead of using `.catch()` in a promise chain, use `try...catch` to catch both synchronous and asynchronous errors.

```javascript
async function hostDinnerParty() {
  try {
    let result = await cookBeanSouffle();
    console.log(`${result} is served!`);
  } catch (error) {
    console.log(error);
    console.log('Ordering a pizza!');
  }
}
```

##  Independent promises
---

This function waits for the first value, then the second:
```javascript
async function waiting() {
    const firstValue = await firstAsyncThing();
    const secondValue = await secondAsyncThing();
    console.log(firstValue, secondValue);
}
```

This function constructs both promises without `await` but then waits for their resolutions before printing to the console, allowing both async operations to be run simultaneously:
```javascript
async function concurrent() {
    const firstPromise = firstAsyncThing();
    const secondPromise = secondAsyncThing();
    console.log(await firstPromise, await secondPromise);
}
```
You can also do something like, ```console.log(`First promise result: ${await firstPromise}.`)```

!!! note
    If we have multiple truly independent promises that we would like to execute fully in parallel, we must use individual `.then()` functions and avoid halting our execution with `await`.

### `Promise.all()`

`Promise.all()` takes an array of asynchronous tasks and return an array of their resolved values.  However, if one has rejected, the whole thing fails, so one does not have to wait for the others to finish.

Compare:
```javascript
async function serveDinner() {
  let vegetablePromise = steamBroccoli();
  let starchPromise = cookRice();
  let proteinPromise = bakeChicken();
  let sidePromise = cookBeans();
  console.log(`Dinner is served. We're having ${await vegetablePromise}, ${await starchPromise}, ${await proteinPromise}, and ${await sidePromise}.`)
}
```

to:

```javascript
async function serveDinnerAgain() {
  let foodArray = await Promise.all([steamBroccoli(), cookRice(), bakeChicken(), cookBeans()]);
  console.log(`Dinner is served. We're having ${foodArray[0]}, ${foodArray[1]}, ${foodArray[2]}, and ${foodArray[3]}.`);
}
```
