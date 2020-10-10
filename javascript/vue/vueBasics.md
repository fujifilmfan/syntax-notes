## Adding Vue
---
Add this tag to the `<head>` of the HTML file:
```html
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js" defer></script>
```
where `defer` makes sure the page is loaded and ready to connect to Vue before attempting to load Vue.

## Creating Vue apps
---
Create an instance of the Vue class:
```javascript
const app = new Vue({
  el: '#app',
  data: {
    username: 'CoderInTraining',
    newTweet: '',
    tweets: [
      'Started learning to code today. Wish me luck!', 
      'Okay, I learned HTML, CSS, and JavaScript. But, how do I combine them together?? Send help.', 
      'Today I start learning Vue. I got this.'
    ],
    bio: 'Excited future software engineer'
  }
});
```
The constructor takes only one argument, the options object.

The `el` key, which stands for HTML **el**ement, takes a CSS selector value which grants that part of the HTML access to the Vue app.  Since `el` targets a single element, it's a good idea to use an ID for this selector.

The `data` key is used for specifying dynamic data.  (Usually this data would come from a database and not by hard coded.)

## Templates
---
Dynamic data to be rendered in the HTML page is identified by double curly braces:
```html
<div id="app">
  <h2>Hello, {{ username }}</h2>
</div>
```
Vue will populate the `username` from the `data` object (even if it changes).

## Directives
---
"**Directives** are custom HTML attributes built into Vue that accomplish incredibly complex, common front-end operations using barely any code."

Reference: [Vue directives](https://vuejs.org/v2/api/#Directives)

### `v-if`
The `v-if` directive works a lot like JavaScript `if`:
```html
<button v-if="userIsLoggedIn">Log Out</button>
<button v-if="!userIsLoggedIn">Log In</button>
```

### `v-for`
The `v-for` directive can be used to iterate through an array and render each item the same way:
```html
<ul>
  <li v-for="todo in todoList">{{ todo }}</li>
</ul>
```

### `v-model`
The `v-model` directive creates a two-way binding on a form field.  Thus, it reads the `data` object and displays the value on the input element but can also change the `data` object if the user modifies the value in the input.
```html
<input v-model="username" />
```

### `v-on:click`
The `v-on:click` directive takes JavaScript as its value and runs the code when the element is clicked:
```html
<button v-on:click="tweets.push(newTweet)">Add Tweet</button>
```
where `tweets` is an array on the `data` object of the app.

## Components
---
**Components** are custom, reusable HTML elements. They contain **templates** that are filled with dynamic information from **props**.

```javascript
// Tweet.js
const Tweet = Vue.component('tweet', {
  props: ['author', 'message'],
  template: '<div class="tweet"><h3>{{ author }}</h3><p>{{ message }}</p></div>'
});
```

```html
<!-- Index.html -->
<!-- in head: -->
<script src="./js/components/Tweet.js" defer></script>
<script src="./js/app.js" defer></script>
<!-- in body: -->
<tweet
    v-for="tweet in tweets" 
    v-bind:message="tweet"
    v-bind:author="username">
</tweet>
```

In the body, `<tweet>` refers to the Tweet component in Tweet.js, while `tweets` in the `v-for` directive refers to the `tweets` array in the `data` object. In the `v-bind` directives, the names after the `:` are props in the Tweet component, and their values are here set from values in the `data` object.

## Virtual DOM
---
React and Vue make their own copy of the DOM as a JavaScript object and store it in memory (that's why it's called "virtual").  When the user interacts with the page and makes a change, another copy of the DOM is made with the relevant items added, removed, or changed.  Then a quick comparison can be made between the original copy and the new copy, and the browser can re-render only the parts that have changed. (This comparison is slow for the browser to do itself, so it would re-render the whole page.)

The "repaints" can also be grouped so that multiple changes can be re-rendered at the same time.
