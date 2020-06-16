1/. DRY

Before:
```javascript
const express = require('express');
const app = express();

// Finish this function and use it in the routes below
const sendFruitResponse = (req, res, next) => {};

app.get('/whatis/apple', (req, res, next) => {
  res.send('fruit');
});

app.get('/whatis/orange', (req, res, next) => {
  res.send('fruit');
});

app.get('/whatis/banana', (req, res, next) => {
  res.send('fruit');
});
```

After:
```javascript
const express = require('express');
const app = express();

// Finish this function and use it in the routes below
const sendFruitResponse = (req, res, next) => {
  res.send('fruit')
};

app.get('/whatis/apple', (req, res, next) => {
  sendFruitResponse();
});

app.get('/whatis/orange', (req, res, next) => {
  sendFruitResponse();
});

app.get('/whatis/banana', (req, res, next) => {
  sendFruitResponse();
});
```

2/. Remember to add `next()` at the end of a middleware function.

3/. Add an attribute to the request body.

Before:
```javascript
const express = require('express');
const app = express();

const database = {
  snacks: ['chips', 'apple', 'cookies'],
  sides: ['beans and rice', 'cole slaw', 'broccoli'],
  appetizers: ['oysters', 'dumplings', 'smoked almonds'],
};

// Add your code here:
const timeMiddleware = () => {};

app.get('/snacks', (req, res, next) => {
  const currentTime = Date.now();
  res.send(`Snacks as of ${currentTime}: ${database.snacks}`);
});

app.get('/sides', (req, res, next) => {
  const currentTime = Date.now();
  res.send(`Sides as of ${currentTime}: ${database.sides}`);
});

app.get('/appetizers', (req, res, next) => {
  const currentTime = Date.now();
  res.send(`Appetizers as of ${currentTime}: ${database.appetizers}`);
});
```

After:
```javascript
const express = require('express');
const app = express();

const database = {
  snacks: ['chips', 'apple', 'cookies'],
  sides: ['beans and rice', 'cole slaw', 'broccoli'],
  appetizers: ['oysters', 'dumplings', 'smoked almonds'],
};

// Add your code here:
const timeMiddleware = (req, res, next) => {  
  req.date = Date.now();
  next();
};

app.use(timeMiddleware); // Note: no path here!

app.get('/snacks', (req, res, next) => {
  res.send(`Snacks as of ${req.date}: ${database.snacks}`);
});

app.get('/sides', (req, res, next) => {
  res.send(`Sides as of ${req.date}: ${database.sides}`);
});

app.get('/appetizers', (req, res, next) => {
  res.send(`Appetizers as of ${req.date}: ${database.appetizers}`);
});
```

4/. Add error handling.

Before:
```javascript
const express = require('express');
const app = express();

const foods = ['pasta carbonara', 'bánh mì', 'cucumber salad'];

app.get('/foods/:index', (req, res, next) => {
  if (foods[req.params.index]) {
    res.send(req.params.index);
  } else {
    const err = Error('Invalid index!');
    err.status = 404;
    next(err);
  }
});

const errorHandler = () => {};

app.use(errorHandler);
```

After:
```javascript
const express = require('express');
const app = express();

const foods = ['pasta carbonara', 'bánh mì', 'cucumber salad'];

app.get('/foods/:index', (req, res, next) => {
  if (foods[req.params.index]) {
    res.send(req.params.index);
  } else {
    const err = Error('Invalid index!');
    err.status = 404;
    next(err);
  }
});

const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).send(err.message);
};

app.use(errorHandler);
```

5/. Add the `morgan` logging middleware.

Before:
```javascript
const express = require('express');
const app = express();
// Add your code below:

// Add your code above

app.get('/say-hi', (req, res, next) => {
  res.send('Hi!');
});

app.get('/say-bye', (req, res, next) => {
  res.send('Bye!');
});

```

After:
```javascript
// add the following:
const morgan = require('morgan');

app.use(morgan('short'));
```

6/. Use `app.use` and the `indexExists` middleware function for all `/data/:index` paths.

Before:
```javascript
const express = require('express');
const app = express();

const data = [1, 2, 3, 4, 5];

const indexExists = (req, res, next) => {
  const index = req.params.index;
  if (data[index]) {
    next();
  } else {
    res.status(404).send();
  }
};

// Add your code below:

// Add your code above

app.get('/data/:index', (req, res, next) => {
  res.send(data[req.params.index]);
});

app.put('/data/:index', (req, res, next) => {
  data[req.params.index] = req.body.number;
  res.send(data[req.params.index]);
});

app.delete('/data/:index', (req, res, next) => {
  data.splice(req.params.index, 1);
  res.status(204).send();
});

app.get('/', (req, res, next) => {
  res.send(data);
});

```

After:
```javascript
// add the following:
app.use('/data/:index', indexExists);
```

7/. CORS

Before:
```javascript
const express = require('express');
const app = express();
```

After:
```javascript
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
```

8/. Make some things private.

Before:
```javascript
const express = require('express');
const app = express();

const secretData = {
  adminUsers: ['1', '2', '51'],
  coolPhoneNumbers: ['555-555-CODE', '555-EXP-RESS', 'MID-DLE-WARE'],
  favSites: ['codecademy.com', 'expressjs.com']
}

const publicData = {
  colors: ['green', 'orange'],
  numbers: [1, 2, 3, 4, 5]
}

const isAdmin = (req, res, next) => {
  const id = req.params.userId;
  if (!secretData.adminUsers.includes(id)) {
    res.status(401).send(); // Unauthorized
  } else {
    next();
  }
}

app.get('/:userId/colors', (req, res, next) => {
  res.send(publicData.colors);
});

app.get('/:userId/numbers', (req, res, next) => {
  res.send(publicData.numbers);
});

app.get('/:userId/phone-numbers', (req, res, next) => {
  res.send(secretData.coolPhoneNumbers);
});

app.get('/:userId/fav-sites', (req, res, next) => {
  res.send(secretData.favSites);
});
```

I can filter routes several ways with middleware, including:
```javascript
app.use(['/this/route', 'this/otherroute'], middlewareFunction);
```
and
```javascript
app.get('this/route', middlewareFunction, (req, res, next) => {...});
```

After:
```javascript
app.get('/:userId/phone-numbers', isAdmin, (req, res, next) => {
  res.send(secretData.coolPhoneNumbers);
});

app.get('/:userId/fav-sites', isAdmin, (req, res, next) => {
  res.send(secretData.favSites);
});
```

9/. Use `Router.param` to DRY this `appleRouter`. Attach the apple `variety` to the request body if it exists, send a 404 response if it does not. In each individual route, send the appropriate property from that apple object.

Before:
```javascript
const express = require('express');
const appleRouter = express.Router();

const apples = {
  mcintosh: {
    description: 'Classic, juicy, bright',
    priceRange: 'medium',
    color: 'green and red'
  },
  honeycrisp: {
    description: 'Crisp, sweet!',
    priceRange: 'pricey',
    color: 'red and yellow'
  },
  goldenDelicious: {
    description: 'rich, custardy',
    priceRange: 'cheap',
    color: 'yellow'
  }
}

// Finish the appleRouter.param call:

appleRouter.param('variety');

// Refactor the routes below to utilize your middleware:

appleRouter.get('/:variety/description', (req, res, next) => {
  const variety = req.params.variety;
  if (apples[variety]) {
    res.send(apples[variety].description);
  } else {
    res.status(404).send();
  }
});

appleRouter.get('/:variety/price-range', (req, res, next) => {
  const variety = req.params.variety;
  if (apples[variety]) {
    res.send(apples[variety].priceRange);
  } else {
    res.status(404).send();
  }
});

appleRouter.get('/:variety/color', (req, res, next) => {
  const variety = req.params.variety;
  if (apples[variety]) {
    res.send(apples[variety].color);
  } else {
    res.status(404).send();
  }
});
```

After:
```javascript
appleRouter.param('variety', (req, res, next, variety) => {
  if (apples[variety]) {
    req.variety = apples[variety];
    next();
  } else {
    res.status(404).send();
  }
});

// Refactor the routes below to utilize your middleware:

appleRouter.get('/:variety/description', (req, res, next) => {
  res.send(req.variety.description);
});

appleRouter.get('/:variety/price-range', (req, res, next) => {
  res.send(req.variety.priceRange);
});

appleRouter.get('/:variety/color', (req, res, next) => {
  res.send(req.variety.color);
});
```
