A javascript library that can be used to print javascript variables to html easily

[<img width="200" alt="Vastate JS" src="https://ik.imagekit.io/omarkhaled/My_Portfolio/prev_works/vastateLogo_-sR7dE5q5.svg?ik-sdk-version=javascript-1.4.3&updatedAt=1648420864822"/>](https://github.com/OmarWebDev/vastate-js/)
# Vastate JS
Sometimes you may want to create a simple project using html, css and js, but sometimes you will need to print or loop your javascript variables to the browser and when changed they need to be changed in the browser. Vastate JS will help you to do this easily what you will need to do is just to change the state, and it will be updated automatically in browser

#### Content
- [Vastate JS](#vastate-js)
    * [Installation](#installation)
    * [Usage](#usage)
        + [Print to the browser](#print-to-the-browser)
        + [Print HTML State](#print-html-state)
        + [Grouping](#grouping)
        + [Loop a state](#loop-a-state)
        + [Set or Get the state in Javascript](#set-or-get-the-state-in-javascript)
        + [Preloader](#preloader)
        + [Save the state](#save-the-state)
        + [Events](#events)
        + [Mounting (NEW)](#mounting)
    * [Contributing](#contributing)
    * [License](#license)

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

- title = state name
- Hello World! = state value

### Print to the browser
Now we want to print the state in the browser you have 2 options to print it first option is to use vastate-print tag and second option is to use vastate-print attribute. you will need to pass state attribute with state name, for example
```html
<!-- This prints 'Hello, Hello World!' -->
<vastate-print state="title">Hello, {#VALUE#}</vastate-print>

<!-- This prints 'Hello, Hello World!' in heading tag -->
<h1 vastate-print state="title">Hello, {#VALUE#}</h1>
```
Now you might be thinking what is `{#VALUE#}` ? Well vastate js doesn't know where to print your state you must provide `{#VALUE#}` keyword, so it will be replaced with state value


Now you maybe have an object that has `key: value` how would you print it ? you will need to pass an attribute called obj that contain the key name, for example

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
    <li vastate-print state="person" obj="name">{#VALUE#}</li>

    <!-- 35 -->
    <li vastate-print state="person" obj="age">{#VALUE#}</li>

    <!-- Male -->
    <li vastate-print state="person" obj="gender">{#VALUE#}</li>
</ul>
```

### Print HTML State

Now if you have a state that contain HTML and tried to print it you will see that it will print html in plain text to fix this you will need to pass html attribute this will tell vastate that the state contain html code, for example

JS:

```js

const title = new Vastate('title', '<h1>Hello World!</h1>')

```

HTML:

```html

<!-- This will print <h1>Hello World!</h1> -->

<main vastate-print state="title">

    {#VALUE#}

</main>

<!-- This will print Hello World! in h1 tag -->

<main vastate-print state="title" html>

    {#VALUE#}

</main>

```

### Grouping
If you want to print the same state multiple times, 
it's not a good idea to keep repeating state name every time you use vastate-print. 
what if you wanted to change the state name? it will be hard to edit all of those vastate-print.
Vastate JS provide you a way to make your vastate-prints be on the same state without 
passing state attribute by using vastate-print-group tag/attribute for example:

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
<main vastate-print-group state="todos">
    <!-- Hello World! -->
    <p vastate-print state="title">
        Page Title: {#VALUE#}
    </p>
    
    <!-- Unit Test -->
    <p vastate-print obj="name">
        Task Name: {#VALUE#}
    </p>
    
    <!-- Test my js scripts -->
    <p vastate-print obj="description">
        Task Description: {#VALUE#}
    </p>
    
    <!-- completed -->
    <p vastate-print obj="status">
        Task status: {#VALUE#}
    </p>
</main>

<vastate-print-group state="todos">
    <!-- Hello World! -->
    <p vastate-print state="title">
        Page Title: {#VALUE#}
    </p>

    <!-- Unit Test -->
    <p vastate-print obj="name">
        Task Name: {#VALUE#}
    </p>

    <!-- Test my js scripts -->
    <p vastate-print obj="description">
        Task Description: {#VALUE#}
    </p>

    <!-- completed -->
    <p vastate-print obj="status">
        Task status: {#VALUE#}
    </p>
</vastate-print-group>
```
you can see that it's not needed to pass the state attribute
to vastate-print cause its already passed to vastate-print-group
but if you wanted to print other state in this case you can use
state attribute to print the other state normally like the first vastate-print that prints
page title

Notes:
    - Grouping won't work with vastate-each

### Loop a state
Now you have an array of objects that contain some data, and you want to loop and print that array. to do it using vastate you will need to use either vastate-each tag or vastate-each attribute and pass the state attribute with the state name, For example

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
<vastate-each state="todos">
    <h3 vastate-print obj="name">Task Name: {#VALUE#}</h3>
</vastate-each>


<!-- This will print every name -->
<main vastate-each state="todos">
    <h3 vastate-print obj="name">Task Name: {#VALUE#}</h3>
</main>
```
Now you see that when I used vastate-print I didn't pass the state name this is because when you use vastate-each vastate will know that every child vastate-print will be on the same state

### Set or Get the state in Javascript
Now you might be thinking how to get or set the state in javascript. well its very simple vastate provide 2 methods `get()` and `set()`
- `get()` return current value of the state
- `set(value)` set the value of the state to the given value and update the value in the browser

For example

JS:
```js
const title = new Vastate('title', 'Hello World!')

console.log(title.get()) // Hello World
title.set('Hello Vastate') // set new value for the state
console.log(title.get()) // Hello Vastate
```
### Preloader
If you are using Ajax/Axios/Fetch API/XMLHttpRequest and want to show a preloader to the user until the request is complete.

Vastate JS Provide you three method to do this 

- static setLoadingTemplate(template: string) - this function will take an HTML Template that will be used when loading is set to true (Global)
- non-static setLoadingTemplate(template: string) - this function will take an HTML Template that will be used when loading is set to true (For specific state)
- setLoading(value: boolean) - this function will set loader state to true or false

For example:

JS: 
```JS
    // set loading template globaly
    Vastate.setLoadingTemplate('<h1>Loading</h1>') // set loading template
    const users = new Vastate('users', [])
    users.setLoading(true) // set loading state to true

    // simple timeout function
    setTimeout(_ => {
        
        users.setLoading( false )
        users.set([{
            name: 'test'
        },{
            name: 'test'
        },{
            name: 'test'
        },{
            name: 'test'
        },])
    }, 3000)
    users.setLoadingTemplate(`loading users`) // set the loading template for users state only
```

HTML:
```HTML
    <!-- This will print Loading in h1 tag and after 3 seconds will print users list -->
    <ul vastate-each  state="users">
        <li hidden vastate-print obj="name"><span>{#VALUE#}</span></li>
    </ul>
```

Notes
- when using preloading you should use hidden attribute with vastate-print if you didn't you will see `{#VALUE#}` printed in the browser with the preloader
- Preloader will only work if the state has contains empty array
- Preloader won't work good when using vastate-print with state that is not empty

### Save the state
if you want to save/restore the current state value to/from localStorage/sessionStorage,
Vastate provide you a way to do it easily. there is 4 method that can be used
- setSaveMode(saveMode: 'localStorage' | 'sessionStorage') - change the current save mode to the given mode (default mode: localStorage)
- getSaveMode() - get the current save mode
- save() - save the state to localStorage/sessionStorage
- restore() - restore the state from localStorage/sessionStorage

for example here is a simple todo app:
  
HTML:
```html
<ul vastate-each state="todos">
    <li vastate-print obj="name">{#VALUE#}</li>
</ul>
<input type="text" />
<button>Add todo</button>
```
JS:
```JS
    // create new state
    const todos = new Vastate('todos', []).set([])
    // restore state from localStorage (if there is no data in localStorage the method won't change the state value)
    todos.restore()

    const input = document.querySelector('input')
    const button = document.querySelector('button')
    button.addEventListener('click', () => {
        // set new state value
        todos.set( [ ...todos.get(), { name: input.value } ] )
        // save the state to localStorage
        todos.save()
        input.value = ''
    })
```

### Events
What if you wanted to call a function every time you change the state value? 
What if you wanted to make a custom event that will be triggered after a specific condition?

With Vastate JS you can make this easily using 'on' and 'trigger' methods.

- on(event: string, callback: CallableFunction)
    - event: Event name (can be any name you want)
    - callback: a function that will be called when the event is triggered
- trigger(event: string, ...params)
    - event: Event name that is created using 'on' method if the given event name is not found Vastate JS will throw error
    - ...params: params that will be passed to the callback function that was passed using 'on' method when creating the event

Here is an example

HTML:
```html
<h1 vastate-print state="title">
	{#VALUE#}
</h1>
```

JS:
```javascript
const title = new Vastate('title', 'ERP')
title.on('change', () => {
    console.log('State Is Changed')
})
title.on('myEvent', (num) => {
    // prints 'My Event is triggered num is: 25'
    console.log('My Event is triggered num is: '+ num)
})
title.set('changing the state to some text') // this will trigger the 'change' event
title.trigger('myEvent', 25) // this will trigger 'myEvent' event and pass '25' as a parameter
```
From the example you can see that there is an event that will be called everytime you use set method called "change"
And there is an event that can be called using 'trigger' method and pass 25 as a parameter called 'myEvent'

### Mounting
Now You will notice when you use either `vastate-each` or `vastate-print` you will see `{#VALUE#}` for about 0.1 second then it will disappear 
to fix this problem you can use `mount()` method to do this what you need to do is to set `vastate-loader` attribute to `<body>` tag then put this code in the end of your javascript file
```javascript
Vastate.mount()
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
