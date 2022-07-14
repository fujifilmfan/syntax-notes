## Starting a server
---

**Step 1:** Import Express
```javascript hl_lines='1'
{!./src/javascript/express/expressStartServer.js!}
```

**Step 2:** Create an instance of an Express application
```javascript hl_lines='3'
{!./src/javascript/express/expressStartServer.js!}
```

**Step 3:** Define the port to listen on
```javascript hl_lines='4'
{!./src/javascript/express/expressStartServer.js!}
```

**Step 4:** Start the server
```javascript hl_lines='6 7 8'
{!./src/javascript/express/expressStartServer.js!}
```

`.listen()` takes two parameters, the port number and a callback function to call once the server is running and ready to receive responses.

## Route matching, parameters, and query strings
---

Routes are attempted in the order that they are defined in the code.  It works something like this internally (at least in principle):
```javascript
//for example if we were to say
const param = '/expressions';
const url = req.url;  //which is /expressions
url === param ? ... : ...;
```

Parameters are defined by adding a `:` to the route path definition, as in `/expressions/:id` and accessed like `req.params.id`.

A request must match the entire path to match a route path, so `/expressions/:name`, for instance, does not match `/expressions`.

Query strings are indicated with `?` and do not count as part of the route path.  Express parses them into a JavaScript object, so `?name=chimera&age=1` becomes `{ name: 'chimera', age: '1' }`.

The method verb must match as well.

## HTTP methods
---

Create ---------> POST  
Read -----------> GET  
Update --------> PUT  
Delete ---------> DELETE  

After a PUT request, it is common for servers to send back the updated resource, as in:
```javascript
const monsters = { '1': { name: 'cerberus', age: '4'  } };
// PUT /monsters/1?name=chimera&age=1
app.put('/monsters/:id', (req, res, next) => {
  const monsterUpdates = req.query;
  monsters[req.params.id] = monsterUpdates;
  res.send(monsters[req.params.id]);
});
```

Differences between `PUT` and `POST` conventions ([PUT vs POST, are they interchangeable?](https://discuss.codecademy.com/t/put-vs-post-are-they-interchangeable/402597/3)):

We have to explain what idempotency is. As I explained earlier, we are talking here about REST API. In REST method ``` is idempotent, method `POST` is not. Let me explain why. This is how `POST` request usually looks like:

> POST www.my-test-api.com/books

This request will create a new book record using data sent in the request body (name of the book, name of the author, publication date…).

Let’s say that I sent this request and accidentally I pushed the button one more time - the second request was sent. What happens now? The second request will create a new book record with exactly the same data (if I do not make any special validation on the server-side).

This is why the `POST` method is not idempotent by convention. In the case of duplicated requests - each request will make changes in our data store.

Now let’s take a look at the `PUT` method. Usually `PUT` request looks like this:

> PUT www.my-test-api.com/books/12

This request will modify book record with id `12` by replacing existing data with the data sent in the body of the request. But if this resource (book with id `12`) does not exist then this record will be created.

The same situation again, I sent the request and accidentally I sent the duplicated request. What happens? The first request will modify existing resource or create a new one and the second request will not make any difference (book with id `12` already exists and it has the same data as the one sent in this request). This is what makes `PUT` idempotent by convention.

## More on routes
---

```javascript
app.use((req, res, next) => {
  console.log("Hello!");
  next();
});

app.get('/user', (req, res, next) => {
  console.log("You are visiting 'user'");
  next();
});

app.post('/user', (req, res, next) => {
  console.log("Hope you enjoy your stay!");
});

app.use('/user/:id', (req, res, next) => {
  console.log("The weather is wonderful,");
  next();
});

app.get('/user/:id', (req, res, next) => {
  console.log("And the sun is shining!");
  next();
});

app.get('/user', (req, res, next) => {
  console.log("Well, goodbye!");
 next();
});
```
logs
> Hello!  
> You are visiting 'user'  
> Well, goodbye!  

The functions are evaluated in order, but `next()` must be included.
