## Inline styles
---
"In [the following] example, we use the v-bind:style directive to set the value of two inline styles to two Vue app properties. The value of the v-bind:style directive is an object where the keys are CSS properties and the values are dynamic properties on the Vue app."

```html
<h2 v-bind:style="{ color: breakingNewsColor, 'font-size': breakingNewsFontSize }">Breaking News</h2>
```

```javascript
const app = new Vue({ 
  data: { 
    breakingNewsColor: 'red',
    breakingNewsFontSize: '32px'
  }
});
```

Values from either `data` or `computed` can be used for `v-bind:style`.

## Computed style objects
---
Instead of creating two different rules like in the previous section, we can create a single computed poroperty that checks the condition and returns an object with all of the relevant style rules:

```html
<h2 v-bind:style="breakingNewsStyles">Breaking News</h2>
```

```javascript
const app = new Vue({ 
  data: { 
    breakingNewsStyles: { 
      color: 'red',
      'font-size': '32px'
    }
  }
});
```

## Multiple style objects
---
`v-bind:style` can take an array of style objects as a value.

```javascript
const app = new Vue({ 
  data: {
    newsHeaderStyles: { 
      'font-weight': 'bold', 
      color: 'grey'
    },
    breakingNewsStyles: { 
      color: 'red'
    }
  }
});
```

```html
<h2 v-bind:style="[newsHeaderStyles, breakingNewsStyles]">Breaking News</h2>
```

The style object added later (`color: 'red'` in this case), gets priority.

Three common states of a form field:
* untouched
* touched
* invalid

Implementation in the "Ticketbox" project before using class arrays:
```javascript
    touchedEmailStyles: function() {
      if (this.email) {
        return {
          'border-color': '#bdbcbc',
          'border-width': '2px'
        }
      } else {
        return {
          'border-color': '#e0e0e0',
          'border-width': '2px'
        }
      }
    },
    invalidEmailStyles: function() {
      if (this.email && !this.emailIsValid) {
        return {
          'background-color': '#ffeded',
          'border-color': '#da5252'
        }
      }
    }
```

```html
<input type="text" id="email" v-model.trim="email" v-bind:style="[touchedEmailStyles, invalidEmailStyles]"/>
```

## Classes
---
Here's an example of adding a CSS class instead of using inline styles:

```html
<span v-bind:class="{ unread: hasNotifications }">Notifications</span>
```

```css
.unread {
  background-color: blue;
}
```

```javascript
const app = new Vue({
  data: { notifications: [ ... ] },
  computed: {
    hasNotifications: function() {
      return notifications.length > 0;
    }
  }
}
```

"In this example, we are using the `v-bind:class` directive to dynamically add a class called `unread` to a “Notifications” `<span>` element if the `computed` property `hasNotifications` returns `true`.

"`v-bind:class` takes an object as its value — the keys of this object are class names and the values are Vue app properties that return a truthy or falsy value. If the value is truthy, the class will be added to the element — otherwise it will not be added." 

This is what we did in the "Ticketbox" project before:
```javascript
    submitButtonStyles: function() {
      if (this.formIsValid) {
        return {
          'background-color': '#4c7ef3',
          cursor: 'pointer'
        }
      } else {
        return {
          'background-color': 'gray',
          cursor: 'default'
        }
      }
    }
```

```html
<button type="submit" v-bind:disabled="!formIsValid" v-bind:style="submitButtonStyles">Confirm Tickets</button>
```

Now, using classes, we do this:
```css
button.active {
  cursor: pointer;
  background-color: #4c7ef3;
}
```

```html
<button type="submit" v-bind:disabled="!formIsValid" v-bind:class="{ active: formIsValid }">Confirm Tickets</button>
```

## Class arrays
---
Use class arrays to apply multiple class objects to a single element.  We can also use this to add non-conditional classes:

```html
<span v-bind:class="[{ unread: hasNotifications }, menuItemClass]">Notifications</span>
```

```javascript
const app = new Vue({
  data: { 
    notifications: [ ... ],
    menuItemClass: 'menu-item'
  },
  computed: {
    hasNotifications: function() {
      return notifications.length > 0;
    }
  }
}
```

```css
.menu-item {
  font-size: 12px;
}

.unread {
  background-color: blue;
}
```