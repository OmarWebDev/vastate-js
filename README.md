#### Content
- [Vastate JS](#vastate-js)
  - [Difference between Vastate JS 2 and Vastate JS 1](#difference-between-vastate-js-2-and-vastate-js-1)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Print to the browser](#print-to-the-browser)
    - [Print HTML State](#print-html-state)
    - [Grouping](#grouping)
    - [Loop a state](#loop-a-state)
    - [Set or Get the state in Javascript](#set-or-get-the-state-in-javascript)
    - [Save the state](#save-the-state)
    - [Events](#events)
  - [Contributing](#contributing)
  - [License](#license)

[<img width="200" alt="Vastate JS" src="https://ik.imagekit.io/omarkhaled/My_Portfolio/prev_works/vastateLogo_-sR7dE5q5.svg?ik-sdk-version=javascript-1.4.3&updatedAt=1648420864822"/>](https://github.com/OmarWebDev/vastate-js/)
# Vastate JS
Sometimes you may want to create a simple project using html, css and js, but sometimes you will need to print or loop your javascript variables to the browser and when changed they need to be changed in the browser. Vastate JS will help you to do this easily what you will need to do is just to change the state, and it will be updated automatically in browser

## Difference between Vastate JS 2 and Vastate JS 1
 - Vastate JS 2 is using Shadow DOM it is more secure and faster than Vastate JS 1
 - Vastate JS 2 provide a more easy way to print the state to the browser, and it is more easy to use than Vastate JS 1
 - Preloader, Events is not available in Vastate JS 2 yet, but it will be available in the future
 - Mounting is not available in Vastate JS 2 because you won't type `{#VALUE#}` in the html

## Installation
---
What you need to do is to link javascript file with html
```html
<script src="path/to/vastatejs/dist/vastate.js"></script>
```
Or you can use minified version of vastatejs

```html
<script src="path/to/vastatejs/dist/vastate.min.js"></script>
```
Or you can use npm/yarn

NPM:
```bash
npm install vastate-js
```

Yarn:
```bash
yarn add vastate-js
```
JS:
```js
import Vastate from 'vastate-js'

// Some Code
```

Or you can install it via CDN 
```HTML
<script src="https://unpkg.com/vastate-js@latest/dist/vastate.min.js"></script>
```
## Usage
---
Now to define a state you will need to use Vastate object which take 2 arguments state name and value
```javascript
const SITE_TITLE = new Vastate('title', 'Hello World!')
```

- title = state element id
- Hello World! = state value

### Print to the browser
To print the state to the browser you will need to use the `va-print` html element which takes 1 attribute `id` that will be used when creating the state using Vastate object

HTML:
```html
<!-- This prints 'Hello, Hello World!' -->
<h1>Hello, <va-print id="name"></va-print>!</h1>
```

JS:
```javascript
const name = new Vastate('name', 'Ahmed')
```
From the above code you should see `Hello, Ahmed!` in the browser.

Notes:
- You can use `va-print` in any html element
- You must close the tag
- The state value can be any type of (string, number, boolean, object)
- The state value will be updated automatically in the browser when the state value is changed

If you want to print a state that is a js object you will need to pass `key` attribute containing the key of the object that you want to print to the browser

JS:
```js
const person = new Vastate('person', {
    name: 'Ahmed',
    age: 35,
    gender: 'Male'
})
```

HTML:
```html
<ul>
    <!-- Ahmed -->
    <li>
        <va-print id='person' key='name'></va-print>
    </li>

    <!-- 35 -->
    <li>
        <va-print id='person' key='age'></va-print>
    </li>

    <!-- Male -->
    <li>
        <va-print id='person' key='gender'></va-print>
    </li>
</ul>
```

### Print HTML State

If you want to print a state that contains a HTML Code you should pass html attribute otherwise you will see the HTML Code printed in the browser

JS:

```js

const title = new Vastate('title', '<h1>Hello World!</h1>')

```

HTML:

```html

<!-- This will print <h1>Hello World!</h1> -->

<va-print id="title"></va-print>

<!-- This will print Hello World! in h1 tag -->
<h1>
    <va-print id="title" html></va-print>
</h1>
```

### Grouping
If you want to print the state multiple times in the browser you can use the `va-print-group` html element which takes 1 attribute `id` that will be used when creating the state using Vastate object, `va-print-group` will take the state value and pass it to all the `va-print` elements inside it except the one that has the `id` attribute so you can print other states that do

JS: 
```js
const title = new Vastate('title', 'Hello World!')
const todo = new Vastate('todos',
  {
      name: 'Unit Test',
      description: 'Test my js scripts',
      status: 'completed'
  }
)
```
HTML:
```html
<va-print-group id="todos">
    <!-- Hello World! -->
    <va-print id="title"></va-print>
    
    <!-- Unit Test -->
    <va-print key="name"></va-print>
    
    <!-- Test my js scripts -->
    <va-print key="description"></va-print>
    
    <!-- completed -->
    <va-print key="status"></va-print>
</va-print-group>
```

Notes:
- Grouping won't work with `va-each`
- Events handlers won't work with `va-print-group` currently, but it will be available in the future

There is another way to group states, you can use `multiple()` methods to group states

JS:
```js
const person = Vastate.multiple('va-print', {
            name: 'ahmed',
            age: '23',
            job: 'developer',
            school: 'school',
            home: 'home',
        });
```

HTML:
```html
    <!-- ahmed -->
    <va-print key="name"></va-print>
    <!-- 23 -->
    <va-print key="age" ></va-print>
    <!-- developer -->
    <va-print key="job" ></va-print>
    <!-- school -->
    <va-print key="school" ></va-print>
    <!-- home -->
    <va-print key="home" ></va-print>
```

In the above example you can see that instead of the state name there is `va-print` string, this means it will select all elements with tag `va-print` and print the state value to the browser, also you can use any query selector (id, class, etc) to select the elements

### Loop a state
If you want to loop a state you can use the `va-each` html element which takes 1 attribute `id` that will be used when creating the state using Vastate object, from the example below you can see how to loop the state `todos` and print the state value in the browser using `va-print` element please note that `va-each` takes a template element as a child element and the template element will be used to print the state value in the browser

JS:
```js
const todos = new Vastate('todos', [
    {
        name: 'Unit Test'
    },
    {
        name: 'Learn php'
    },
    {
        name: 'learn c#'
    },
])
```

HTML:
```html
<!-- This will print every name -->
<va-each id="todos">
    <template>
        <va-print key="name"></va-print>
    </template>
</va-each>
```
Notes:
    - Grouping won't work with `va-each`
    - You can use `va-each` in any html element
  

### Set or Get the state in Javascript
If you want to get/set the state value in javascript you can use the `value` property of the state object
- `value` return current value of the state
- `value = NewValue` set the value of the state to the given value and update the value in the browser

For example

JS:
```js
const title = new Vastate('title', 'Hello World!')

console.log(title.value) // Hello World
title.value = 'Hello Vastate' // set new value for the state
console.log(title.value) // Hello Vastate
```

### Save the state
if you want to save/restore the current state value to/from Storage,
Vastate provide you a way to do it easily. there is 3 methods that can be used
- `setSaveStorage(storage: Storage)` - change the current save storage to the given storage (default storage: localStorage)
- `save()` - save the state to Storage
- `load()` - restore the state from Storage

for example here is a simple todo app:
  
HTML:
```html
<va-each id="todos">
    <template>
        <va-print key="name"></va-print>
    </template>
</va-each>
<input type="text" />
<button>Add todo</button>
```
JS:
```JS
    // create new state
    const todos = new Vastate('todos', [])
    // restore state from localStorage (if there is no data in localStorage the method won't change the state value)
    todos.load()

    const input = document.querySelector('input')
    const button = document.querySelector('button')
    button.addEventListener('click', () => {
        // set new state value
        todos.value = [ ...todos.value, { name: input.value } ]
        // save the state to localStorage
        todos.save()
        input.value = ''
    })
```

### Events
If you used `va-each` you won't be able to add events to html elements inside it (click, mouseover, etc) that is because the elements inside `va-each` is inside a shadow dom and you can't add events to it.

Vastate JS provide you a way to add events to the elements inside `va-each` using `va-event` and `va-callback` html attribute.
And use `on` method to create events handlers

`on` method takes 2 arguments, the first argument is the event name and the second argument is an object contains callback functions that will be called when the event is triggered

For example

HTML:
```html
<va-each id="todos">
    <template>
        <!-- This will call increament method when clicking it -->
        <button va-event="click" va-callback="log">Click Me</button>
        <!-- you can also use shorthand one -->
        <button va-event="click:log">Click Me</button>

        <va-print key="name"></va-print>
    </template>
</va-each>
```

```js
const todos = new Vastate('todos', [
                {
                    name: 'Unit Test'
                },
                {
                    name: 'Learn php'
                },
                {
                    name: 'learn c#'
                },
            ])
// here we have a callback function that will be called when the event is triggered 
// in this case when the button is clicked we should see `123` in the console
todos.on('click', {
    log: function() {
        console.log(123)
    }
})
```
**Note: Events in Vastate 2 is not the same as Vastate JS 1**

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
