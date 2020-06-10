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
