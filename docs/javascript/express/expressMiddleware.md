"Middleware is code that executes between a server receiving a request and sending a response."

"Middleware can perform logic on the request and response objects, such as: inspecting a request, performing some logic based on the request, attaching information to the response, attaching a status to the response, sending the response back to the user, or simply passing the request and response to another middleware."

It can do anything a JavaScript function can do.

"An Express application is essentially a series of middleware function calls."

Routes are one type of middleware, and all middleware has the `(req, res, next)` signature with access to the request and response objects and the ability to send a response body and status code and close the connection.

## `app.use()`
---
Here is the function signature: `app.use([path,] callback [, callback...])`.

Examples:
```javascript
app.use((req, res, next) => {
  console.log(`${req.method} Request Received`);
});

app.use('/monsters', monstersRouter);
```

The first example above will cause the request method to be logged for every received request so that it doesn't have to be repeated within each route.

If that behavior is not desired for each route, then a different syntax is needed.  The second example solves the issue by specifying the path for which the function will be executed.

In the following example, the return statement will cause the function to break if the `if` condition is not met, so we don't have to worry about the assignments for non-existent jelly beans.

```javascript
app.use('/beans/:beanName', (req, res, next) => {
  const beanName = req.params.beanName;
  if (!jellybeanBag[beanName]) {
    console.log('Response Sent');
    return res.status(404).send('Bean with that name does not exist');
  }
  req.bean = jellybeanBag[beanName];
  req.beanName = beanName;
  next();
});
```

## `next()`
---
Routes are called in the order they appear in the file provided the previous middleware calls `next()`.

In `monstersRouter.get('/:id', (req, res, next) ...`, for instance, `next()` passes control to the next middleware, but it should be explicitly called as the last part of the middleware's body:

```javascript
monstersRouter.get('/:id', (req, res, next) => {
  const monster = monsters[req.params.id];
  If (monster) {
    res.send(monster);
  } else {
    res.status(404).send();
  }
  next();
});
```

## Logging
---
`morgan` is a handy open-source library for logging information about HTTP request-response cycles.

Without `morgan`, the code looked like this:
```javascript
const morgan = require('morgan');
...
app.use(express.static('public'));
app.get('/beans/', (req, res, next) => {
  res.send(jellybeanBag);
  console.log('Response Sent');
});
```
After implementing `morgan`, we have:
```javascript
app.use(morgan('tiny'));
app.get('/beans/:beanName', (req, res, next) => {
  res.send(req.bean);
});
```

## Body parsing
---
We can use an open-source library to parse an HTTP request body, such as [`body-parser`](https://github.com/expressjs/body-parser).

Writing it ourselves might look like:
```javascript
const bodyParser = (req, res, next) => {
  let queryData = '';
  req.on('data', (data) => {
    data = data.toString();
    queryData += data;
  });
  req.on('end', () => {
    if (queryData) {
      req.body = JSON.parse(queryData);
    }
    next();
  });
};
```

Using `body-parser`:
```javascript
const bodyParser = require('body-parser');
...
app.use(bodyParser.json());
```

That's it! (Of course there are lots of possible options.)

## Error-handling
---
Express will catch errors that we haven't handled, but we can use our own error-handling middleware for problems that we can anticipate.  To do this, pass an error object as an argument to `next()`.

Our might have a function like the following:
```javascript
app.use((req, res, next) => {
  const newValue = possiblyProblematicOperation();
  if (newValue === undefined) {
    let undefinedError = new Error('newValue was not defined!');
    // undefinedError.status = 504;
    return next(undefinedError);
  }
  next();
});
```

And our handler looks like this:
```javascript
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
// better:
app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).send(err.message);
});
```
Note the use of the extra `err` parameter in the callback function  How does Express know to use our error handler when it's anonymous?

## Overview
---
Tasks:  
1\. Add a missing `next()` method.  
2\. Replace custom body parsing with the `body-parser` package.  
3\. Refactor the following to a middleware function:  
```javascript
const cardId = Number(req.params.cardId);
const cardIndex = cards.findIndex(card => card.id === cardId);
if (cardIndex === -1) {
  return res.status(404).send('Card not found');
}
```
4\. Refactor the following to a middleware function:  
```javascript
const newCard = req.body;
const validSuits = ['Clubs', 'Diamonds', 'Hearts', 'Spades'];
const validRanks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];
if (validSuits.indexOf(newCard.suit) === -1 || validRanks.indexOf(newCard.rank) === -1) {
  return res.status(400).send('Invalid card!');
}
```

Original:
```javascript
const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(express.static('public'));

const PORT = process.env.PORT || 4001;

const cards = [
  {
    id: 1,
    suit: 'Clubs',
    rank: '2'
  },
  {
    id: 2,
    suit: 'Diamonds',
    rank: 'Jack'
  },
  {
    id: 3,
    suit: 'Hearts',
    rank: '10'
  }
];
let nextId = 4;

// Logging
if (!process.env.IS_TEST_ENV) {
  app.use(morgan('short'));
}

// Parsing
app.use((req, res, next) => {
  let bodyData = '';
  req.on('data', (data) => {
    bodyData += data;
  });
  req.on('end', () => {
    if (bodyData) {
      req.body = JSON.parse(bodyData);
    }
    
  });
});

// Get all Cards
app.get('/cards/', (req, res, next) => {
  res.send(cards);
});

// Create a new Card
app.post('/cards/', (req, res, next) => {
  const newCard = req.body;
  const validSuits = ['Clubs', 'Diamonds', 'Hearts', 'Spades'];
  const validRanks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];
  if (validSuits.indexOf(newCard.suit) === -1 || validRanks.indexOf(newCard.rank) === -1) {
    return res.status(400).send('Invalid card!');
  }
  newCard.id = nextId++;
  cards.push(newCard);
  res.status(201).send(newCard);
});

// Get a single Card
app.get('/cards/:cardId', (req, res, next) => {
  const cardId = Number(req.params.cardId);
  const cardIndex = cards.findIndex(card => card.id === cardId);
  if (cardIndex === -1) {
    return res.status(404).send('Card not found');
  }
  res.send(cards[cardIndex]);
});

// Update a Card
app.put('/cards/:cardId', (req, res, next) => {
  const cardId = Number(req.params.cardId);
  const cardIndex = cards.findIndex(card => card.id === cardId);
  if (cardIndex === -1) {
    return res.status(404).send('Card not found');
  }
  const newCard = req.body;
  const validSuits = ['Clubs', 'Diamonds', 'Hearts', 'Spades'];
  const validRanks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];
  if (validSuits.indexOf(newCard.suit) === -1 || validRanks.indexOf(newCard.rank) === -1) {
    return res.status(400).send('Invalid card!');
  }
  if (!newCard.id || newCard.id !== cardId) {
    newCard.id = cardId;
  }
  cards[cardIndex] = newCard;
  res.send(newCard);
});

// Delete a Card
app.delete('/cards/:cardId', (req, res, next) => {
  const cardId = Number(req.params.cardId);
  const cardIndex = cards.findIndex(card => card.id === cardId);
  if (cardIndex === -1) {
    return res.status(404).send('Card not found');
  }
  cards.splice(cardIndex, 1);
  res.status(204).send();
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

```

Final:
```javascript
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

app.use(express.static('public'));
app.use(bodyParser.json());

const PORT = process.env.PORT || 4001;

const cards = [
  {
    id: 1,
    suit: 'Clubs',
    rank: '2'
  },
  {
    id: 2,
    suit: 'Diamonds',
    rank: 'Jack'
  },
  {
    id: 3,
    suit: 'Hearts',
    rank: '10'
  }
];
let nextId = 4;

// Logging
if (!process.env.IS_TEST_ENV) {
  app.use(morgan('short'));
}

app.use('/cards/:cardId', (req, res, next) => {
  const cardId = Number(req.params.cardId);
  const cardIndex = cards.findIndex(card => card.id === cardId);
  if (cardIndex === -1) {
    return res.status(404).send('Card not found');
  }
  req.cardIndex = cardIndex;
  next();
});

const validateCard = (req, res, next) => {
  const newCard = req.body;
  const validSuits = ['Clubs', 'Diamonds', 'Hearts', 'Spades'];
  const validRanks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];
  if (validSuits.indexOf(newCard.suit) === -1 || validRanks.indexOf(newCard.rank) === -1) {
    return res.status(400).send('Invalid card!');
  }
  next();
}

// Get all Cards
app.get('/cards/', (req, res, next) => {
  res.send(cards);
});

// Create a new Card
app.post('/cards/', validateCard, (req, res, next) => {
  const newCard = req.body;
  newCard.id = nextId++;
  cards.push(newCard);
  res.status(201).send(newCard);
});

// Get a single Card
app.get('/cards/:cardId', (req, res, next) => {
  const cardIndex = req.cardIndex;
  res.send(cards[cardIndex]);
});

// Update a Card
app.put('/cards/:cardId', validateCard, (req, res, next) => {
  const cardId = Number(req.params.cardId);
  const cardIndex = req.cardIndex;
  const newCard = req.body;
  if (!newCard.id || newCard.id !== cardId) {
    newCard.id = cardId;
  }
  cards[cardIndex] = newCard;
  res.send(newCard);
});

// Delete a Card
app.delete('/cards/:cardId', (req, res, next) => {
  const cardId = Number(req.params.cardId);
  const cardIndex = req.cardIndex;
  cards.splice(cardIndex, 1);
  res.status(204).send();
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
```