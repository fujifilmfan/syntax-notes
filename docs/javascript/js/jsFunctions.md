## Introduction
---
The examples involving fruit reference the following array:
```javascript
const fruits = ['mango', 'papaya', 'pineapple', 'apple'];
```

## Function declarations
---
This is also a named function (`printFruits`).
```javascript
// function declaration
function printFruits(fruit) {
  console.log(`I want to eat a ${fruit}`);
}
fruits.forEach(printFruits);
```

## Function expressions
---
```javascript
// anonymous function expression
const func_expression = function(fruit) {
  console.log(`I want to eat a ${fruit}`);
}
fruits.forEach(func_expression);

// named function expression
const func_expression = function my_func(fruit) {
  console.log(`I want to eat a ${fruit}`);
}
```

!!! note
    `my_func` only available inside `func_expression`

## Arrow functions
---
```javascript
// arrow function two-liner
printFruit = fruit => {
  console.log(`I want to eat a ${fruit}`);
}
fruits.forEach(printFruit);

// arrow function one-liners (implicit returns)
fruits.forEach(fruit => console.log(`I want to eat a ${fruit}`));
const multiply = (a, b) => a * b; 

// arrow function no args
const printHello = () => { 
  console.log('hello'); 
}; 

// arrow function one arg
const checkWeight = weight => { 
  console.log(`Baggage weight : ${weight} kilograms.`); 
}; 

// arrow function two args
const sum = (firstParam, secondParam) => { 
  return firstParam + secondParam; 
}; 
```

## Callback functions and higher-order functions
---
A **callback function** is a function passed into another function as an argument.  A function that accepts a function as a parameter or returns a function is considered a **higher-order function**.

Here's an example:
```javascript
const isEven = (n) => {
  return n % 2 == 0;
}

// printMsg is a 'higher-order function
let printMsg = (evenFunc, num) => {
  const isNumEven = evenFunc(num);
  console.log(`The number ${num} is an even number: ${isNumEven}.`)
}

// pass in isEven as the callback function
printMsg(isEven, 4); 
```
