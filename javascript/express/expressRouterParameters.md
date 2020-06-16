Sometimes multiple different routes require the same parameter, such as in `'/sorcerers/:sorcererName'` and `'/sorcerers/:sorcererName/spellhistory'`.  We do not need to extract the parameter in each route that needs it....

## `router.param()`
---
The `router.param()` intercepts requests to route handlers that match the desired parameter.  In the following example, that parameter is `spellId`.
```javascript hl_lines='1'
{!./src/javascript/express/expressRouterParam.js!}
```
Note that `spellId` does not need the leading `:`.  The *value* of the parameter (not the key) is passed as the fourth agrument to the callback function.

Next, find the spell and add it to `req`:
```javascript hl_lines='4 5 6 7 8 9'
{!./src/javascript/express/expressRouterParam.js!}
```

If the spell is not found, pass the error to error-handling middleware:
```javascript hl_lines='10 11 12'
{!./src/javascript/express/expressRouterParam.js!}
```

## Merge parameters
---

We can use composition in building routes.

First, we define two routers.
```javascript hl_lines='1 2'
{!./src/javascript/express/expressMergeParams.js!}
```
The `{mergeParams: true}` argument tells Express that `familiarRouter` should have access to parents passed into its parent router, `sorcererRouter`.

We'll define two endpoints, too.
```javascript hl_lines='4 21'
{!./src/javascript/express/expressMergeParams.js!}
```
This tells Express that the path for the `familiarRouter` is the same as the path for the `sorcererRouter` with the additional path `/:sorcererId/familiars`.

From the forums:
"I’m lost in the Learn section of this lesson.

"The explanation of the example code isn’t clear about which part of the code each sentence refers to.

"Which line of code is referred to by the sentence “The familiars are nested into the sorcerer endpoint — indicating the relationship that a sorcerer has multiple familiars”? `Is it sorcererRouter.use('/:sorcererId/familiars', familiarRouter);`?

"Which line of code tells Express that “the path for the familiarRouter is the same as the path for the sorcererRouter with the additional path `/:sorcererId/familiars`”? Is it also `sorcererRouter.use('/:sorcererId/familiars', familiarRouter);`?

"Which line of code “create(s) a family of routes (a router) built by appending routes to familiarRouter‘s base: /sorcerer/:sorcererId/familiars”? Is it also `sorcererRouter.use('/:sorcererId/familiars', familiarRouter);`? Or `app.use('/sorcerer', sorcererRouter);`?"

Answer:

"After finishing the Express.js tutorial, I think I now understand this lesson’s code more or less. Let me try to explain it below.

```javascript
const sorcererRouter = express.Router();                      // Line 1
const familiarRouter = express.Router({mergeParams: true});   // line 2
sorcererRouter.use('/:sorcererId/familiars', familiarRouter); // line 3
```

"These three lines establish the following: (1) familiarRouter is a child router of sorcererRouter and its root path is /:sorcererId/familiars (by line 3); (2) familiarRouter will share parameters available for sorcererRouter (by lines 2-3).

```javascript
sorcererRouter.get('/', (req, res, next) => { // line 4
  res.status(200).send(Sorcerers);            // line 5
  next();                                     // line 6
});                                           // line 7
```

"Lines 4-7 specify how to respond to the GET requests for sorcererRouter's root path (which will be set as /sorcerer in line 16 below).

```javascript
sorcererRouter.param('sorcererId', (req, res, next, id) => { // line 8
  const sorcerer = getSorcererById(id);                      // line 9
  req.sorcerer = sorcerer;                                   // line 10
  next();                                                    // line 11
});                                                          // line 12
```

"For requests sent to the path /:sorcererId, retrieve the data (line 9) and pass it as req.sorcerer to the next middleware (lines 10-11).

```javascript
familiarRouter.get('/', (req, res, next) => { // line 13
  res.status(200).send(`Sorcerer ${req.sorcerer} has familiars ${getFamiliars(sorcerer)}`); // line 14
}); // line 15
```

"For GET requests sent to the path /:sorcererId/familiars (the root path for familiarRouter as set by line 3 above), send a message (I’m not sure of this way of using send(), though) that includes req.sorcerer. This is possible because, thanks to line 2 above, familiarRouter has access to req.sorcerer which is a parameter for sorcererRouter (created in line 10 above).

"In passing, I have no idea what ${getFamiliars(sorcerer)} is. Perhaps it’s a function defined somewhere else. I also think this is the least helpful example of how a parent router’s parameters can be shared by its child router, because (1) we haven’t learned how to use send() with a string as an argument; (2) it’s not clear what req.sorcerer contains; (3) there’s no explanation whatsoever about getFamiliars(sorcerer).

"Well, let’s move on to the last line of code.

```javascript
app.use('/sorcerer', sorcererRouter); // line 16
```

"Any request sent to the path /sorcerer will be dealt with by sorcererRouter. I think this line of code should come at the top, right after we have defined sorcererRouter in line 1, for code readability. Another source of confusion…"
