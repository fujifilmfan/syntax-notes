## Comments
---
Single line comment:  
```javascript
// comment
```

Multi-line comment:  
```javascript
/*
comment line 1
comment line 2
*/
```
or
```javascript
/**
* comment line 1
* comment line 2
*/

## Printing
---
Examples:  
```javascript
console.log(2 * 5);
console.log('Hello');
```

## Variables
---
Pre-ES6:  
```javascript
var name = 'Harry';
```

Use `let` to declare a variable that can be reassigned:  
```javascript
let age;
let height = 1.9;
```

Use `const` to declare a variable with a constant value:  
```javascript
const numberOfFingers = 10;
numberOfFingers = 9;
// TypeError: Assignment to constant variable.
```

## Math
---
`+`, `-`, `*`, `/`, `%`

## Assignment operators
---
`i++` // i = i + 1  
`i--` // i = i - 1  
`i += x` // i = i + x  
`i -= x` // i = i - x  
`i *= x` // i = i * x  
`i /= x` // i = i / x  

## Strings
---

### Concatenation
```javascript
let scope = 'world';
console.log('Hello, ' + scope + '!');
```

### Interpolation
The strings in backticks are called **template literals**.
```javascript
let scope = 'world';
console.log(`Hello, ${scope} !`);
```

### Methods
```javascript
let greeting = 'Hello, world!';
console.log(greeting.length);
// prints: 13
```

### Multi-line string
```javascript
client.query(`
  query {
    user {
      id
      name
    }
  }`);
```
