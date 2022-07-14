## `for`
---
```javascript
for (let counter = 5; counter < 11; counter++) {
  console.log(counter);
}
```

Run it backwards:  
```javascript
for (let counter = 3; counter >= 0; counter--) {
    console.log(counter);
}
```

## `while`
---
```javascript
while (condition) { 
    run_some_code;
    increment;
}

while (i < fruits.length) {
    console.log(fruits[i] + " ");
    i++;
}

var bool = true;
while(bool) {
    run_some_code;
}
```

## `do...while`
---
```javascript
let cupsOfSugarNeeded = 3;
let cupsAdded = 0;

do {
  cupsAdded++;
} while (cupsAdded < cupsOfSugarNeeded);

console.log(cupsAdded);
```

## Break keyword
---
Use `break` to exit a loop.
```javascript
for (let i = 0; i < 99; i += 1) {
  if (i > 5) {
     break;
  }
  console.log(i)
}
```
