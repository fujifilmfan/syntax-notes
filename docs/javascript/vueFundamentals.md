The notes in this directory were based on the VueSchool.io ["Vue.js Fundamentals"](https://vueschool.io/courses/vuejs-fundamentals) course, completed March 2021.

## Lesson 1: Getting Started with Vue.js

!!! quote
    In the very first lesson of our Vue.js Fundamentals course, besides of learning how to easily add Vue.js from a CDN to our site we're going to take a look at Vue.js enjoyable and automatic reactivity system.

We can include Vue in an HTML file just like we would jQuery:  

```html hl_lines='12'
{!./src/javascript/vueFundamentals/lesson1a.html!}
```

Create a new Vue instance and pass in a config object (in the curly braces):  

```html hl_lines='14 15'
{!./src/javascript/vueFundamentals/lesson1b.html!}
```

Tell the Vue instance where it should exist on the page:  

```html hl_lines='9 15'
{!./src/javascript/vueFundamentals/lesson1c.html!}
```

Add data to show on the page, use the templating syntax to display the data (`{{ }}`):  

```html hl_lines='10 16 17 18'
{!./src/javascript/vueFundamentals/lesson1d.html!}
```

We can bind an input field to the header data using `v-model`:  

```html hl_lines='11'
{!./src/javascript/vueFundamentals/lesson1e.html!}
```

The data is bound both ways, so not only does changing the input update the header, but changing the header updates the input.  We can see that in the console.  First, let's assign our Vue instance to a variable:  

```html hl_lines='15'
{!./src/javascript/vueFundamentals/lesson1f.html!}
```

Now, in the console, we can do this:  

```shell
>> shoppingList.$data.header = "Hello from the console!"
"Hello from the console!"
```

and it will show in our header and input field.  

## Lesson 2: Vue.js Template Syntax and Expressions

!!! quote
    In the previous lesson, we briefly touched upon the templating syntax where we bind Vue data to the DOM.

    In this lesson, we'll take deeper dive into the Vue's templating syntax and learn how to run JavaScript expressions in the template.

We can do more than just bind templates to the DOM.  We can also execute some JavaScript:  

```html hl_lines='10'
{!./src/javascript/vueFundamentals/lesson2a.html!}
```

We can only evaluate one expression at a time.  We cannot declare variables (`var header = 'welcome';`) or evaluate if statements (`if(header) { return 'welcome'}`).  We _can_ use ternary expressions:  

```html hl_lines='10'
{!./src/javascript/vueFundamentals/lesson2b.html!}
```

Here, if `$data.header` is null, we'll get 'welcome'.  

## Lesson 3: List Rendering

!!! quote
    In almost all applications there is a need to loop or filter through a list of items and render them on the site. In this lesson, we're taking a closer look at Vue's `v-for` directive, which lets us filter through arrays and objects in an elegant matter.

Let's add an array of items as a property to our data:  

```html hl_lines='21 22 23 24 25'
{!./src/javascript/vueFundamentals/lesson3a.html!}
```

We can loop over the items using the `v-for` directive:  

```html hl_lines='11 12 13'
{!./src/javascript/vueFundamentals/lesson3a.html!}
```

Since `v-for` is reactive, we can add or remove items from our list on the console, and they will show on the page:  

```shell
>> shoppingList.$data.items.push('1 awesome Vue course')
4
>> shoppingList.$data.items.pop()
"1 awesome Vue course" 
```

## Lesson 4: User Inputs & Vue Devtools

!!! quote
    We will continue to learn about the reactivity system in this lesson. You'll learn how to handle user inputs with the `v-model` directive, and we will also introduce the Vue Devtools. The Vue Devtools is an invaluable browser extension to Chrome and Firefox that will speed up your development and bug hunting.

To implement adding new items to our list via the app, let's start by adding a `newItem` property to our data and bind it to an input field:  

```html hl_lines='11 22'
{!./src/javascript/vueFundamentals/lesson4a.html!}
```

Note that populating `newItem` with other than an empty string will result in that text being rendered in the input field instead of the placeholder text.  

Using Vue Devtools, we can see the `<Root>` instance (assigned to `$vm0`).  When we click it, we can see the data we've defined for the app, and we can edit, add, or delete items.  The changes will show on the page.  

## Lesson 5: User Events

!!! quote
    In this lesson, we'll learn how to respond to user events with Vue's `v-on` directive.

Vue Devtools injects our Vue instances into the console for us without having to set a variable.  So instead of using `shoppingList`, we can also use `$vm0`:  

```shell
>> $vm0.items
Array(3) [ "10 party hats", "2 board games", "20 cups" ]
>> $vm0.newItem = '1 awesome Vue course'
"1 awesome Vue course"
>> $vm0.items.push($vm0.newItem)
4
```

To add this functionality to the app, we can add a button and use the `v-on` directive.  We also add a `v-on` to the input so we can use the enter key to enter input:  

```html hl_lines='11 12 13 14'
{!./src/javascript/vueFundamentals/lesson5a.html!}
```

## Lesson 6: Vue Methods

!!! quote
    It is handy to be able to run JavaScript expressions directly in the template or a directive sometimes - but not always.

    When the expression is getting too verbose or needs to be reused in multiple places, we can extract the logic to a function and fire the function instead. These functions are called methods and allow us to DRY up the code.

We can simplify our HTML template a bit by defining some functionality in `methods`:  

```html hl_lines='32 33 34 35 36'
{!./src/javascript/vueFundamentals/lesson6a.html!}
```

!!! note
    Within `methods`, we do not have automatic access to our instance data like we did with `v-on`, hence the use of `this` (like how we used `$vm0` in the console)

Replace `items.push(newItem)` with `saveItem` in our `v-on`s:  

```html hl_lines='12 13'
{!./src/javascript/vueFundamentals/lesson6a.html!}
```

Next, reset `newItem` after an item has been added:  

```html hl_lines='35'
{!./src/javascript/vueFundamentals/lesson6b.html!}
```

Now, we can type an item to the input field using the app or the console.  Then, in the console, we can execute `saveItem`, and it will work:  

```shell
>> $vm0.newItem = '2 more great courses'
"2 more great courses"
>> $vm0.saveItem()
undefined
```

## Lesson 7: Conditional Rendering

!!! quote
    Conditional rendering is essential on any dynamic website. Vue.js offers two ways to conditionally render elements on our page and in this lesson we're learning how the `v-if` and `v-else` directives work.

Let's display a message when the item list is empty using the `v-if` directive:  

```html hl_lines='18'
{!./src/javascript/vueFundamentals/lesson7a.html!}
```

!!! question
    This doesn't work when moving the functionality to a method, however.  It's not reactive - why not?  

Let's hide the input when we're not using it using a state property and the `v-else` directive:  

```html hl_lines='11 25'
{!./src/javascript/vueFundamentals/lesson7b.html!}
```

We can change 'default' to 'edit' using Vue Detools and see the input reappear.  

Now, let's add buttons to toggle the input (note the new `div` as well):  

```html hl_lines='10 12 13 14'
{!./src/javascript/vueFundamentals/lesson7c.html!}
```

!!! question
    How does Vue know that the `v-else` is connected to the `v-if` above?  

We also need to be able to toggle the state when the buttons are clicked, so we'll add a new method and apply it to the buttons:  

```html hl_lines='12 13 43 44 45 46'
{!./src/javascript/vueFundamentals/lesson7d.html!}
```


## Lesson 8: Attribute Bindings

!!! quote
    We do know how to render data in the DOM, and now it's time to take a closer look at how we can bind HTML attributes to our Vue data.

    This is achieved with Vue's `v-bind` directive and would let us change the `href` of a link or swap out an image if we need to.

We can couple any HTML attribute to our data using the `v-bind` directive, thus making it dynamic:  

```html hl_lines='19'
{!./src/javascript/vueFundamentals/lesson8a.html!}
```

!!! hint
    To use this, add a URL to the input but don't save it.  Then, click "Dynamic Link".

Now, let's disable the "Save Item" button when there isn't any input in the form (this will prevent blank data from being added to the shopping list accidentally):  

```html hl_lines='3'
<button 
  class="btn btn-primary" 
  v-bind:disabled="newItem.length === 0" 
  v-on:click="saveItem">
    Save Item
</button>
```

## Lesson 9: Dynamic Classes

!!! quote
    A common need and use case for attribute bindings is to manipulate the look of elements through CSS classes or style attributes. To make this task easier than ever, Vue provides special enhancements when `v-bind` is used with the `class` or `style` attribute. In this lesson, we're learning how to apply classes based on our Vue data conditionally.

Let's add a strikeout to items that have been purchased.  To do that, start by changing the items array to an array of objects:  

```html hl_lines='33 34 35 36 37 38 39 40 41 42 43 44'
{!./src/javascript/vueFundamentals/lesson9a.html!}
```

We'll also need to update the way we refer to each item in the template and update our `saveItem` method:  

```html hl_lines='20 48 49 50 51 52'
{!./src/javascript/vueFundamentals/lesson9a.html!}
```

We can use array or object syntax to add dynamic classes.  The object syntax is easier:  

```html hl_lines='20 35'
{!./src/javascript/vueFundamentals/lesson9b.html!}
```

Note that the item's purchased state has been set to `true`.  If we wanted to use the array syntax instead, we would write `:class="[item.purchased ? 'strikeout' : '']"`.  It's more verbose but does offer flexibility for toggling between different classes.  

Corresponding CSS:  
```css
.strikeout {
  text-decoration: line-through;
  color: #B8C2CC;
}
```

We can specify multiple conditions:  

```html hl_lines='20 36 41 46'
{!./src/javascript/vueFundamentals/lesson9c.html!}
```

What if we want regular classes along with the dynamic ones?  Here are a couple ways:  

* `v-bind:class="[item.purchased ? 'strikeout' : '', 'priority']"`, where `'priority'` indicates the regular class, so all of the items will have that property
* `class="priority" v-bind:class="[...]"`

Let's add a method to toggle strikeout on each item.  First, add a function to toggle the purchased state:  

```javascript hl_lines='1 2 3'
togglePurchased: function(item) {
  item.purchased = !item.purchased;
},
```

Next, use `v-on` in the list item to give each item access to that functionality:  

```html hl_lines='4'
<li 
  v-for="item in items"
  v-bind:class="{strikeout: item.purchased}"
  v-on:click="togglePurchased(item)">
    {{ item.label }}
</li>
```

## Lesson 10: Computed Properties

!!! quote
    Computed properties are another powerful feature from Vue that allows us to transform or perform calculations on our data and then easily reuse the result as an up-to-date variable in our template. Computed properties are very useful and should replace complex in-template expressions.

    While this explanation without any code examples might not make much sense right now, it surely will after you've watched this lessons on computed properties.

Computed properties should not change existing data.  They are used for transforming data for the presentation layer.  In the next example, we'll use `slice` to make a copy of the data.  

!!! info
    It's very important to return a value from a computed property or Vue won't know what to render.

If we wanted to enforce a character limit on our input, we could use a computed property to inform the user of the current length:  

```html hl_lines='17 51 52 53 54 55'
{!./src/javascript/vueFundamentals/lesson10a.html!}
```

Let's make a computed property that flips our items so that the newest one shows at the top of the list.

```javascript hl_lines='1 2 3 4 5'
computed: {
  reversedItems() {
    return this.items.slice(0).reverse();
  }
},
```

Adding a new item will automatically add the item to `reversedItems` as well (check that using Vue Devtools) thanks to Vue's reactivity and that computed properties are recalculated when the data they operate on change.  

Now, we just need to change our `li` element to use the new array:  

```html hl_lines='2'
<li 
  v-for="item in reversedItems" 
  v-bind:class="{strikeout: item.purchased}" 
  v-on:click="togglePurchased(item)">
    {{ item.label }}
</li>
```

When should we use a computed property versus a method?  

* method: use when modifying data
* computed: use to change presentation of existing data 
