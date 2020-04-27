
## Export a module
---

### Node `module.exports` syntax

**Step 1:** Create an object to represent the module
```javascript hl_lines='1'
{!./src/javascript/js/jsModuleMenu.js!}
```

**Step 2:** Add properties or methods to the module object
```javascript hl_lines='2'
{!./src/javascript/js/jsModuleMenu.js!}
```

**Step 3:** Export the module with `module.exports`

```javascript hl_lines='4'
{!./src/javascript/js/jsModuleMenu.js!}
```

This can also be done in one step:
```javascript
module.exports = {
  specialty: "Roasted Beet Burger with Mint Sauce",
  getSpecialty: function() {
    return this.specialty;
  } 
}; 
```

### Default export syntax
This syntax is not supported by Node.js, so it's mostly used in front-end ES6 development.

```javascript
const Airplane = {}

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

export default Airplane;
```

### Named export syntax
Used to export only particular objects.

```javascript
let specialty = '';
function isVegetarian() {
  }; 
function isLowSodium() {
  }; 

export { specialty, isVegetarian };
```

Named exports can be exported when they are declared:
```javascript
export let flightRequirements = {
  requiredStaff: 4,
  requiredSpeedRange: 700
};
```

### Export as
We can also alias the variable names like this:
```javascript
export { availableAirplanes as aircrafts, flightRequirements };
```

## Import a module
---

### `require` keyword
**Step 1:** Import the module with `require`
```javascript hl_lines='1'
{!./src/javascript/js/jsModuleOrder.js!}
```

**Step 2:** Use the module in the program
```javascript hl_lines='3 4 5'
{!./src/javascript/js/jsModuleOrder.js!}
```

### `import` keyword
This allows us to import only the methods we need instead of the whole module.

```javascript
import Airplane from './airplane';

function displayFuelCapacity() {  Airplane.availableAirplanes.forEach(function(element) {
    console.log(`Fuel Capacity of ${element.name}: ${element.fuelCapacity}`);
  });
}

displayFuelCapacity();
```

### Named imports
Used to import objects stored in a variable.  When doing this, the variables can be used directly without having to use the module prefix (`specialty` vs. `Menu.specialty`).

```javascript
import { availableAirplanes, flightRequirements, meetsStaffRequirements } from './airplane';
```

If those variables were not exported, we would get errors like the following:

> TypeError: (0, _airplane.meetsStaffRequirements) is not a function

> TypeError: Cannot read property 'requiredStaff' of undefined

### Import as
Import a module as an aliased name:
```javascript
import * as Carte from './menu';

Carte.chefsSpecial;
Carte.isVeg();
Carte.isLowSodium(); 
```
