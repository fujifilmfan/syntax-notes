## Introduction
---
All of the functions on this page are higher-order functions because they take callbacks as parameters.  See [functions](jsFunctions.md) for a brief description of higher-order functions and callbacks.

## `.every()`
---

```javascript
console.log(interestingWords.every((word) => {return word.length > 5} ));
console.log(interestingWords.every(word => word.length > 5));
```

## `.reduce()`
---
Takes a callback with two parameters, `accumulator` and `currentValue` (they can be named something else) and returns one value.  An optional second argument can be used to specify the initial value of the accumulator.

```javascript
const arrayOfNumbers = [1, 2, 3, 4];

const sum = arrayOfNumbers.reduce((accumulator, currentValue) => {  
  return accumulator + currentValue;
});

console.log(sum); // 10
```

## `.forEach()`
---
Executes a callback function on each element of the array in order; like a `for` loop in Python but restricted to arrays(?).

```javascript
const numbers = [28, 77, 45, 99, 27];

numbers.forEach(number => {  
  console.log(number);
}); 
```

If the array contains objects, then we can access their properties, too:
```javascript
Airplane.availableAirplanes = [
  {
    name: 'Aerojet',
    fuelCapacity: 800
  },
  {
    name: 'SkyJet',
    fuelCapacity: 500
  }
];

function displayFuelCapacity() {  Airplane.availableAirplanes.forEach(function(element) {
    console.log(`Fuel Capacity of ${element.name}: ${element.fuelCapacity}`);
  });
}

displayFuelCapacity();
// prints:
// Fuel Capacity of Aerojet: 800
// Fuel Capacity of SkyJet: 500
```

## `.filter()`
---
Executes a callback function on each element of the array and returns a new array with each element that caused the callback to return `true`; the callback must return either `true` or `false`.

```javascript
const randomNumbers = [4, 11, 42, 14, 39];
const filteredArray = randomNumbers.filter(n => {  
  return n > 5;
});
```

## `.map()`
---
Executes a callback function on each element of the array and returns a new array consisting of the callback's return values.

```javascript
const finalParticipants = ['Taylor', 'Donald', 'Don', 'Natasha', 'Bobby'];

const announcements = finalParticipants.map(member => {
  return member + ' joined the contest.';
})

console.log(announcements);
```
