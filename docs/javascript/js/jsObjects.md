## Objects
---
```javascript
let spaceship = {
  'Fuel Type' : 'Turbo Fuel',
  homePlanet : 'Earth',
  color: 'silver',
  'Secret Mission' : 'Discover life outside of Earth.'
};

spaceship.color = 'glorious gold';
spaceship['numEngines'] = 5;
delete spaceship['Secret Mission']

console.log(spaceship)
```

```javascript
let alienShip = {
  retreat: function () {
    console.log(retreatMessage);
  },
  retreat2 () {
    console.log(retreatMessage);
  }
}

alienShip.retreat();
alienShip.retreat2();
```

### for...in

Not intuitive (having to use `let` in the loop):
```javascript
let spaceship = {
    crew: {
    captain: { 
        name: 'Lily', 
        degree: 'Computer Engineering', 
        cheerTeam() { console.log('You got this!') } 
        },
    'chief officer': { 
        name: 'Dan', 
        degree: 'Aerospace Engineering', 
        agree() { console.log('I agree, captain!') } 
        },
    medic: { 
        name: 'Clementine', 
        degree: 'Physics', 
        announce() { console.log(`Jets on!`) } },
    translator: {
        name: 'Shauna', 
        degree: 'Conservation Science', 
        powerFuel() { console.log('The tank is full!') } 
        }
    }
}; 

for (let crewMember in spaceship.crew) {
  console.log(`${crewMember}: ${spaceship.crew[crewMember].name}`)
};
```

### Privacy

Properties prepended with '_' are not indended to be altered (but they can be altered).

### Getters

```javascript
const robot = {
  _model: '1E78V2',
  _energyLevel: 100,
  get energyLevel() {
    if (typeof(this._energyLevel) === 'number') {
      return `My current energy level is ${this._energyLevel}`;
    } else {
      return 'System malfunction: cannot retrieve energy level';
    }
  }
};

console.log(robot.energyLevel);
```

The getter can be called without parentheses, as if it's a property on the object.

### Setters

```javascript
const person = {
  _age: 37,
  set age(newAge){
    if (typeof newAge === 'number'){
      this._age = newAge;
    } else {
      console.log('You must assign a number to age');
    }
  }
};

person.age = 40;
console.log(person._age); // Logs: 40
person.age = '40'; // Logs: You must assign a number to age

person._age = 'forty-five'
console.log(person._age); // Prints forty-five
```

Notice that `._age` can still be set directly, but this bypasses the check in the setter.  Working with underscored variables directly should raise a red flag.

Also, the setter can be called without parentheses, as if it's a property on the object.

### Factory functions

```javascript
const monsterFactory = (name, age, energySource, catchPhrase) => {
  return { 
    name: name,
    age, 
    energySource: energySource,
    scare() {
      console.log(catchPhrase);
    } 
  }
};

const ghost = monsterFactory('Ghouly', 251, 'ectoplasm', 'BOO!');
ghost.scare(); // 'BOO!'
```
Notice the use of _destructuring_ in the `age` property (shorthand for `age: age,`)

### Destructured assignment

Destructured assignment grabs properties (even nested ones) of an object.

```javascript
const vampire = {
  name: 'Dracula',
  residence: 'Transylvania',
  preferences: {
    day: 'stay inside',
    night: 'satisfy appetite'
  }
};

const { day } = vampire.preferences; 
console.log(day); // Prints 'stay inside'
```

### Arrow functions can be used inside objects, but then one cannot use `this`.
