# Vastate JS
Sometimes you may want to create a simple project using html, css and js, but sometimes you will need to print or loop your javascript variables to the browser and when changed they need to be changed in the browser. Vastate JS will help you to do this easliy what you will need to do is just to change the state and it will be updated automaticly in browser

## Instalation
---
What you need to do is to link javascript file with html
```html
<script src="path/to/vastatejs/dist/vastate.js"></script>
```
## Usage
---
Now to define a state you will need to use Vastate object which take 2 arguments state name and value
```javascript
const SITE_TITLE = new Vastate('title', 'Hello World!')
```

- title = the name of the state
- Hello World! = state value

### Print to the browser
Now we want to print the state in the browser you have 2 options to print it first option is to use vastate-print tag and second option is to use vastate-print attribute. you will need to pass state attribute with state name, for example
```html
<!-- This prints 'Hello, Hello World!' -->
<vastate-print state="title">Hello, {#VALUE#}</vastate-print>

<!-- This prints 'Hello, Hello World!' in heading tag -->
<h1 vastate-print state="title">Hello, {#VALUE#}</h1>
```
Now you maybe thinking what is `{#VALUE#}` ? Well vastate js doesn't know where to print your state you must provide `{#VALUE#}` keyword so it will be replaced with state value


Now you maybe have a object that has `key: value` how would you print it ? you will need to pass a attribute called obj that contain the key name, for example

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
    <li vastate-print state="person" obj="male">{#VALUE#}</li>
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
## Loop a state
---
Now you have an array of objects that contain some data and you want to loop and print that array. to do it using vastate you will need to use either vastate-each tag or vastate-each attribute and pass the state attribute with the state name, For example

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
Now you see that when i used vastate-print i didn't passed the state name this is because when you use vastate-each vastate will know that every child vastate-print will be on the same state

## Set or Get the state in Javascript
---
Now you maybe thinking how to get or set the state in javascript. well its very simple vastate provide 2 methods `get()` and `set()`
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
## Contributing
---
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
---
[MIT](https://choosealicense.com/licenses/mit/)