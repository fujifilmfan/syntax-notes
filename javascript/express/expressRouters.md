
Example:
```javascript
const express = require('express');
const app = express();

const monsters = {
  '1': {
    name: 'godzilla',
    age: 250000000
  },
  '2': {
    Name: 'manticore',
    age: 21
  }
}

const monstersRouter = express.Router();

app.use('/monsters', monstersRouter);

monstersRouter.get('/:id', (req, res, next) => {
  const monster = monsters[req.params.id];
  If (monster) {
    res.send(monster);
  } else {
    res.status(404).send();
  }
});
```

The `monstersRouter` code can be moved to a different file and imported to keep app.js concise.
