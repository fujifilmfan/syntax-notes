## Computed properties
---
"Vue allows us to store data that can be calculated using values from the `data` object at a separate property called `computed`."  If a computed property was stored on the `data` object, then it would have to be recalculated every time the parent value was updated, potentially leading to errors.

Here's a simple example:
```javascript
const app = new Vue({
  el: '#app',
  data: {
    hoursStudied: 274
  },
  computed: {
    languageLevel: function() {
      if (this.hoursStudied < 100) {
        return 'Beginner';
      } else if (this.hoursStudied < 1000) {
        return 'Intermediate';
      } else {
        return 'Expert';
      }
    }
  }
});
```

```html
<div id="app">
  <p>You have studied for {{ hoursStudied }} hours. You have {{ languageLevel }}-level mastery.</p>
</div>
```

## Computed property setters
---
Just as `data` values can be used to determine `computed` values, Vue allows us to use `computed` values to update `data` values.

In the following example, the previous function is nested inside a `get` key, and a `set` key was added.  Note that `set` functions take one parameter.

```javascript
const app = new Vue({
  el: '#app',
  data: {
    hoursStudied: 274
  },
  computed: {
    languageLevel: {
      get: function() {
        if (this.hoursStudied < 100) {
          return 'Beginner';
        } else if (this.hoursStudied < 1000) {
          return 'Intermediate';
        } else {
          return 'Expert';
        }
      },
      set: function(newLanguageLevel) {
        if (newLanguageLevel === 'Beginner') {
          this.hoursStudied = 0;
        } else if (newLanguageLevel === 'Intermediate') {
          this.hoursStudied = 100;
        } else if (newLanguageLevel === 'Expert') {
          this.hoursStudied = 1000;
        }
      }
    }
  }
});
```

```html
<div id=“app”>
  <p>You have studied for {{ hoursStudied }} hours. You have {{ languageLevel }}-level mastery.</p>
  <span>Change Level:</span>
  <select v-model="languageLevel">
    <option>Beginner</option>
    <option>Intermediate</option>
    <option>Expert</option>
  </select>
</div>
```

## Watchers
---
Watchers can be used when we want to make app updates without using a value in a `computed` function.  In situations in which you could use either `watch` or `computed`, use `computed` as it is more efficient.

```javascript
const app = new Vue({
  el: '#app',
  data: {
    currentLanguage: 'Spanish',
    supportedLanguages: ['Spanish', 'Italian', 'Arabic'],
    hoursStudied: 274
  },
  watch: {
    currentLanguage: function (newCurrentLanguage, oldCurrentLanguage) {
      if (supportedLanguages.includes(newCurrentLanguage)) {
        this.hoursStudied = 0;
      } else {
        this.currentLanguage = oldCurrentLanguage;
      }
    }
  }
});
```

In this example, if the user chooses a new supported language, the hoursStudied is automatically chagned to `0` for that new language.  Otherwise, the language is set back to the previously-selected value (this is why the watcher takes two parameters).

## Instance methods
---
Vue apps store instance methods in the `methods` property.

Here's an example:
```javascript
const app = new Vue({
  el: '#app',
  data: {
    hoursStudied: 300
  },
  methods: {
    resetProgress: function() {
      this.hoursStudied = 0;
    }
  }
});
```

```html
<button v-on:click="resetProgress">Reset Progress</button>
```
