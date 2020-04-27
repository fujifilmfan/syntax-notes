**Step 1:** Set up the project like this:
```
project
|_ src
|___ main.js
```

**Step 2:** Run `npm init` from the root of the project.  It will create a `package.json` file (seems to serve a similar purpose as `pyproject.toml`).

**Step 3:** Install Node packages

* `$ npm install babel-cli -D`
* `$ npm install babel-preset-env -D`

where `-D` is to signal `devDependencies`

**Step 4:** Specify version of source JavaScript code

Add
```javascript
{
  "presets": ["env"]
}
```
to `.babelrc`, where "env" signals ES6+.

**Step 5:** Specify the script to run in `package.json`

Add `"build": "babel src -d lib"` to `"scripts"`, where

* `babel`: command
* `src`: location of files to be transpiled
* `-d`: tells Babel to write transpiled code to a directory
* `lib`: directory for transpiled code

**Step 6:** Run `npm run build`