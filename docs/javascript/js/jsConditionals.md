## Booleans
---
`true`, `false`

* falsy values include `false`, `0`, empty strings, `null`, `undefined`, and `NaN`
* most other things are truthy

## Comparison operators
---
* `===` strict equal
* `!==` strict not equal
* `>` greater than
* `>=` greater than or equal
* `<` less than
* `<=` less than or equal

## Logical operators
---
`&&`, `||`, `!` as expected

## `if` and ternary operator
---
`if` long form:  
```javascript
if (condition) {
    runCode;
} else if (otherCondition) {
    runOtherCode;
} else {
    runDifferentCode;
}
```

Ternary operator form:  
```javascript
condition ? runCodeIfTrue : runCodeIfFalse;
```

Ternary operator example:

```javascript
let price = 10.5;
let day = "Monday";

day === "Monday" ? price -= 1.5 : price += 1.5;
```

## `switch`
---
```javascript
const color = 'green';

switch (color) {
    case 'red':
        console.log('Stop');
        break;
    case 'yellow':
        console.log('Slow');
        break;
    case 'green':
        console.log('Go');
        break;
    default:
        console.log('Stop');
}
```
