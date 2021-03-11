## 1 - Introduction to Components

!!! quote
    In this lesson, we'll learn about Vue components. We'll get an introduction to what a component is, why we need components and lastly how we can create and use a component in our Vue.js app.

Components are reusable Vue instances with a name.  

In `Vue.component()`, `component` is a function that accepts a name for the first argument and options in the second argument.  The name can be used as a custom HTML element in our markup.  

### Options object
This is the same options object that is used when we define a Vue instance, but there are some differences:

1. We do not specify an element on which to mount the component like we would in `new Vue`.  Components are not bound to the markup in order to keep them reusable.
2. Data is not an object, but must be a function that returns an object.  That way, each instance of a component can maintain its own copy of the data.  

Components have their own template.  It can be specified as a string.

Here is a simple component example:  

```javascript
Vue.component('click-counter', {
  template: '<button @click="count++">{{ count }}</button>',
  data () {
    return {
      count: 0
    }
  }
})

new Vue({
  el: '#app'
})
```

Here is some HTML implementing the `click-counter` component four times:  

```html
<div id="app">
  <h1>Vue.js Components Fundamentals</h1>
  <click-counter></click-counter>
  <click-counter></click-counter>
  <click-counter></click-counter>
  <click-counter></click-counter>
</div>
```

## 2 - Component's Template

!!! quote
    In this lesson, we're going to learn about a Vue component's template. Essentially, the template is where we define our HTML and general markup for our component. We also bind our component's data to the DOM in the template.

    In Vue.js, we can define our template in a few different ways. In this lesson, we'll move away from the inline template and use the x-template technique, which is great when you're getting started.

    Remember! Component template must contain exactly one root element.

    You can read more about [Vue's Template Syntax](https://vuejs.org/v2/guide/syntax) in the documentation.

Another way to define a template is using x-template.  First, add some new script to our `index.html` file:  

```html
<script type="text/x-template" id="click-counter-template">
  <button @click="count++">{{ count }}</button>
</script>
```

The ID can be anything we like.  Then, we can change our component template to just reference the ID:  

```javascript
template: '#click-counter-template',
```

This makes editing the template easier since we get autocompletion, error detection, and syntax highlighting on the HTML page.  A disadvantage is that we have to look at two files to get the whole picture of what the component does.  Since the component template can only have one root element, use a wrapper like a `div` to hold multiple elements.  

## 3 - Resusable Components with Props

!!! quote
    In this lesson, we'll see a realistic use case for reusable components and learn about Vue.js component [props](https://vuejs.org/v2/guide/components-props).

    Props are custom HTML attributes that we can register on our components, which allow us to pass data to our components.

    You can find the [starting point](https://pastebin.com/zgms7V4y) of the demo in this lesson in the link. We've also created a [jsfiddle](https://jsfiddle.net/hootlex/195feduh/) if you want to play around with the code.

!!! tip
    In general, avoid single-word component names, as they are more likely to collide with other names.

Props are custom attributes that we can register on a component.  To use them, they need to be defined in the list of props that the component accepts:  

```javascript
Vue.component('plan', {
  template: '#plan-template',
  props: ['name']
})
```

Then, in our HTML:  

```html
  <plan name="The Single"></plan>
  <plan name="The Curious"></plan>
  <plan name="The Addict"></plan>
<!-- ... -->
<script type="text/x-template" id="plan-template">
  <div class="plan">
    <div class="description">
      <span class="title">
        {{ name }}
      </span>
    </div>
  </div>
</script>
```

We can also pass the names in an array from our component.  In our Vue instance, we set:  

```javascript
new Vue({
  el: '#app',
  data: {
    plans: ['The Single', 'The Curious', 'The Addict']
  }
})
```

(The component doesn't change from above.)

Then, in our HTML:  

```html
<plan v-for="plan in plans" v-bind:name="plan"></plan>
```

If we didn't use the `v-bind` directive to bind the name of the attribute to the value of the plan, then each of our buttons would just say "plan".

If we use an object for `props` instead of an array, we can get some type checking and also get more control:  

```javascript
props: {
  name: String,
  price: Number,
}
```

Going further, we can make the value of the prop an object:  

```javascript
props: {
  name: {
    type: String,
    default: 'The Adventurous',
    required: false,
  },
  price: Number,
}
```

!!! note
    The default value will appear on page when using bare component tags: `<plan></plan>`.


Here's where we're at:  

```html
{!./src/javascript/vueComponentFundamentals/coffee-plans-basics3.html!}
```

```javascript
{!./src/javascript/vueComponentFundamentals/coffee-plans-basics3.js!}
```

## 4 - Nested Components

!!! quote
    Components allow us to encapsulate functionality and easily reuse them in multiple places in our applications. It is common to have components inside other components to compose the bigger features of our apps.

    In this lesson, we'll learn how we can create a `plan-picker` component, to easily display all our plans wherever we want.

If we wanted to copy our plans to another part of the application, we would have to copy the `div` and make sure the Vue instance has the names in its data:  

```html
<div class="plans">
  <plan v-for="plan in plans" v-bind:name="plan"></plan>
</div>
```

```javascript
data: {
  plans: ['The Single', 'The Curious', 'The Addict']
}
```

To make this more reusable, let's create a dedicated plan-picker component.  

```html
<plan-picker></plan-picker>
<!-- ... -->
<script type="text/x-template" id="plan-picker-template">
  <div class="plans">
    <plan v-for="plan in plans" v-bind:name="plan"></plan>
  </div>
</script>
```

```javascript
Vue.component('plan-picker', {
  template: '#plan-picker-template',
  data() {
    return {
      plans: ['The Single', 'The Curious', 'The Addict']
    }
  }
})
```

We could also use a prop to pass the plans from the root instance into the plan picker component, but putting them in the data makes the component independent.

Here's where we're at:  

```html
{!./src/javascript/vueComponentFundamentals/coffee-plans-basics4.html!}
```

```javascript
{!./src/javascript/vueComponentFundamentals/coffee-plans-basics4.js!}
```

## 5 - Global vs Local Components

!!! quote
    Vue.js allows us to register components both globally and locally. In this lesson, we'll learn the difference between the two types and how it can affect the build size and performance of your application. 

So far, we've only registered components using the `Vue.component` method.  This is global registration.  These will be included in the final build even if they aren't used.  Also, components like `plan`, which are only used in `plan-picker`, do not need to be global.  

We can make `plan` local by assigning it to a variable and including it in the `components` of `plan-picker`:  

```javascript hl_lines='1 2 3 4 5 6 7 8 9 13 14 15'
let PlanComponent = {
  template: '#plan-template',
  props: {
    name: {
      type: String,
      required: true,
    }
  }
}

Vue.component('plan-picker', {
  template: '#plan-picker-template',
  components: {
    plan: PlanComponent
  },
  data() {
    return {
      plans: ['The Single', 'The Curious', 'The Addict']
    }
  }
})
```

Since we probably won't need `plan-picker` globally, either, we can set its options object to a variable and define it in the components option of its parent (in this case, the instance, since it has no parent):  

```javascript
let PlanPickerComponent = {
  template: '#plan-picker-template',
  components: {
    plan: PlanComponent
  },
  data() {
    return {
      plans: ['The Single', 'The Curious', 'The Addict']
    }
  }
}

new Vue({
  el: '#app',
  components: {
    PlanPicker: PlanPickerComponent,
  }
})
```

!!! info
    The name `PlanPicker` or `'plan-picker'` will work, but not other permutations.  

Here's where we're at:  

HTML is the same.

```javascript
{!./src/javascript/vueComponentFundamentals/coffee-plans-basics5.js!}
```

## 6 - Communication Between Components with Custom Events

!!! quote
    We know how to pass data to a child component through props. In this lesson, we'll learn how to communicate from a child to a parent component through [custom events(https://vuejs.org/v2/guide/components-custom-events)].

    We will use a custom event to notify the `plan-picker` of which plan has been selected, and make sure we have the right logic in place so the user can only select one plan at a time.

Let's add a data property to define if the plan is selected and add a method to update the selected data:  

```javascript hl_lines='9 10 11 12 13 14 15 16 17 18'
let PlanComponent = {
  template: '#plan-template',
  props: {
    name: {
      type: String,
      required: true,
    }
  },
  data () {
    return {
      selected: false
    }
  },
  methods: {
    select () {
      this.selected = true
    }
  }
}
```

```html
<div @click="select"  class="plan">
```

And since we want to change the style when the plan is selected:  

```html
<div @click="select" class="plan" :class="{'active-plan': selected}">
```

Let's make the `select` method unselect the previous selected plan so only one is selected at a time.  We have to let the parent know when a user selects a plan.  Use a custom event with the `$emit` method.  The first argument is a name, anything you like:  

```javascript
methods: {
  select () {
    this.$emit('hi-there');
    this.selected = true;
  }
}
```

Using Vue Devtools, we can see the event being emitted every time we click a plan (click the dots in the Vue Devtools window).  

The second argument allows us to send data, the "payload".

```javascript
methods: {
  select () {
    this.$emit('select', this.name);
    this.selected = true;
  }
}
```

Let's add a listener for the select event in the parent, the plan-picker component, using `v-on`:  

```html
<plan v-for="plan in plans" :name="plan" @select="selectPlan"></plan>
```

Now, when the plan is selected, `selectPlan` will be executed (we haven't implemented that yet).  Since the parent needs to know the selected plan, let's add that to the data and also add the `selectPlan` method:  

```javascript
let PlanPickerComponent = {
  template: '#plan-picker-template',
  components: {
    plan: PlanComponent
  },
  data() {
    return {
      plans: ['The Single', 'The Curious', 'The Addict'],
      selectedPlan: null,
    }
  },
  methods: {
    selectPlan(plan) {
      this.selectedPlan = plan;
    }
  }
}
```

Since the parent knows which plan is selected, we can remove `this.selected` and the data from the plan component.  We can then add a prop to pass the selected plan.

Here's where we're at:  

```html
{!./src/javascript/vueComponentFundamentals/coffee-plans-basics6.html!}
```

```javascript
{!./src/javascript/vueComponentFundamentals/coffee-plans-basics6.js!}
```
