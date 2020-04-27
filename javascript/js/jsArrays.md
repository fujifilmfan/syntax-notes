## Introduction
---
The examples involving fruit reference the following array:
```javascript
let fruit = ['apples', 'oranges', 'pears'];
```

## Simple arrays
---
Arrays are mutable even if declared using `const`.

Other useful methods not covered here include `.join()`, `.slice()`, `.splice()`, `.indexOf()`, `.concat()`.

Functions mutate global arrays via *pass-by-reference*.

### `.length`
```javascript
console.log(fruit.length);
// prints: 3
```

### Index
```javascript
console.log(fruit[2]);
// prints: 'pears'
```

### Assignment
```javascript
fruit[1] = 'avocados';
// gives: ['apples', 'avocados', 'pears']
```

### `.push()`
```javascript
fruit.push('bananas', 'apricots');
// gives: ['apples', 'avocados', 'pears', 'bananas', 'apricots']
```

### `.pop()`
```javascript
fruit.pop();
// gives: ['apples', 'avocados', 'pears', 'bananas']
```

### `.shift()`
```javascript
console.log(fruit.shift());
// prints: apples
// list becomes: ['avocados', 'pears', 'bananas']
```

### `.unshift()`
```javascript
console.log(fruit.unshift('tomatoes'));
// prints: 4
// list becomes: ['tomatoes', 'avocados', 'pears', 'bananas']
```

## Nested arrays
---
```javascript
let numberClusters = [[1, 2], [3, 4], [5, 6];
console.log(arrayName[2][0]);
// prints: 5
```
