---
title: "Alpine.js: The lightweight and powerful framework you should consider using for your next project"
description: "Alpine.js is a lightweight and powerful framework that adds the reactivity you come to expect from a large framework like React or Vue without the overhead."
image: "/images/blog-cover/alpine-writeup.jpg"
created_at: "06/20/2022"
tags: ["Alpine.js", "JavaScript"]
---

Clocking in at 7.1kb gzipped, [Alpine.js](https://alpinejs.dev/start-here) packs a heavy punch. Built to be a _"drop and develop"_ JavaScript framework, it can add a lot of functionality to your application with little configuration. I have been working with Alpine.js for the last year and I have to say I really enjoy its syntax and overall ease of use. It does not rely on a development environment and its directives can be used directly in HTML. In this article, we will take a look at the methods Alpine.js provides as well as how you can create your own custom contexts to extend the functionality.

![Spongebob with caption, look at all this cool stuff](https://media2.giphy.com/media/3o6wNLInS2LxnFNPq0/giphy.gif?cid=ecf05e47nektp08kt2qbfcghdh50h1f7cjonjbsucybuvkpp&rid=giphy.gif&ct=g)

## Installation

Alpine.js can be instantiated via CDN or as a node module. For specific instructions on [how to set up Alpine.js using a node module](https://alpinejs.dev/essentials/installation#as-a-module) check out their great documentation. For the sake of this article, we will be using the CDN link to get it up and running. We place the CDN link in the head of the document so we can be sure it loads before our content.

```html
<html>
  <head>
    ...
    <script
      defer
      src="https://unpkg.com/alpinejs@3.10.2/dist/cdn.min.js"
    ></script>
  </head>
  ...
</html>
```

## Directives

There are several directives that Alpine.js provides and we won't cover all of them, but here are a few key ones that you will frequently utilize when developing an application.

### x-data

The most important of all of them, `x-data` provides context for your component to reference, here you can define variables or even create a context to hold all of the functionality for that block of code. For example, if we want to declare the text that should be rendered within a component we can define the text in `x-data` and use another directive, `x-text` to print that data.

```html
<div x-data="{ firstName: 'Hunter' }">
  <h1 x-text="firstName"></h1>
</div>
```

We initiate the value of `firstName` in our `x-data` and then use `x-text` to print that within our `h1` element. While this is useful, I find that creating a context provides a lot more flexibility as values/methods defined in an `x-data` context can be inherited by the child elements. We need to first listen for the event `alpine:init` that is fired once Alpine has finished loading and then we can register a new context.

```html
<div x-data="name">
  <h1 x-text="firstName"></h1>
  <button @click="handleClick">Send my name to the console</button>
</div>

<script>
  document.addEventListener("alpine:init", ()=>{

      Alpine.data("name", ()=>{

          firstName: "Hunter",

          handleClick() {
              console.log(this.firstName);
          }
      })
  })
</script>
```

By creating a custom `x-data` context we have created a reusable set of logic that can be utilized and inherited by any children where `x-data="name"` has been set since _"name"_ is the namespace we used to register our context. We can also define custom methods to be called when using another directive `x-on` or `@` for short to bind events to our element. In this case, we are binding a click event to the button and printing my name to the console when it is clicked. For a more in-depth look at what `x-data` can do, take a look at the [documentation](https://alpinejs.dev/directives/data).

### x-bind

When developing an application you often need to dynamically assign values to attributes in your HTML, that is where `x-bind` comes in to save the day. As with `x-on` using the `@` as a shorthand, `x-bind` uses `:` to notate a bound attribute. In the below example we have set our `x-data` to handle the state of a menu, we have initialized the variable `isOpen` to store the state of the menu. When our button is clicked we toggle the `isOpen` state to the opposite (true or false). And our menu has a bound class that uses a ternary operator to determine what class to print. We can also simultaneously register an unbound attribute such as `class` to hold our base styles.

```html
<div x-data="{ isOpen: false }">
  <button @click="isOpen = ! isOpen">Toggle Menu</button>
  <div :class="isOpen ? 'menu--active' : 'menu--closed'" class="menu">
    <!--menu content-->
  </div>
</div>
```

More information on `x-bind` can be found in the [documentation](https://alpinejs.dev/directives/bind).

## x-model

Most frameworks have some sort of built-in method to handle binding the value of an attribute to a variable. With React you can use State or Refs, Vue has v-model, and Alpine.js has `x-model`. Having a way to dynamically bind the value of an element can save a ton of time when developing especially with large forms. All that needs to be done to use this is to add an `x-model` to an element that can return a value and assign the variable that is used to store the data. Whenever the value of the input is changed, the `x-model` will reflect the new value instantly. In our below example we are initiating our component with a `firstName` variable and binding it to our input using `x-model`. Pair this with a custom `x-data` context as we saw before and you can handle forms with ease.

```html
<form x-data="{ firstName: '' }">
  <label for="firstName">First Name</label>
  <input id="firstName" name="firstName" type="text" x-model="firstName" />
</form>
```

## x-for

When developing you often encounter repeatable content and while you can hardcode them or use JavaScript to dynamically render a list of items from an array, Alpine.js has a directive that handles this gracefully. With `x-for` you can loop over a template and dynamically render content from an array. In the below example we have a list of developers, each with an ID which we will use as a `key` to help Alpine.js keep track of the rendered elements. We define the array in our `x-data` and use a template to iterate over the elements we want to print on the page.

```html
<ul
  x-data="{ developers: [
    { id: 1, name: 'Hunter' },
    { id: 2, name: 'Ceri' },
    { id: 3, name: 'Grace' },
]}"
>
  <template x-for="dev in developers" :key="dev.id">
    <li x-text="dev.name"></li>
  </template>
</ul>
```

We use `x-bind` to bind the value to our key attribute in the template and the content is looped over giving us the following result in HTML

```html
<ul>
  <li>Hunter</li>
  <li>Ceri</li>
  <li>Grace</li>
</ul>
```

### x-if and x-show

Conditional rendering is a very common need when building out a dynamic webpage, Alpine.js comes with a few directives that assist with this.

#### x-if

When you want to conditionally render certain content, `x-if` will dynamically render or prevent rendering based on the case it is provided. In the below example we have a variable `isLoggedIn` that determines if the user is authenticated or not. While authenticated content should be handled at a route level, something like a log-in button might need to be removed if the user has an authenticated status. Since our content is wrapped in a `<template>` tag it will not be rendered unless Alpine forces it to do so.

```html
<div x-data="{isLoggedIn: false}">
  <template x-if="isLoggedIn">
    <!--Authenticated Content-->
  </template>
</div>
```

#### x-show

Similar to `x-if`, `x-show` conditionally hides an element based on the specified parameter. We used a menu example before when looking at `x-bind`, instead of dynamically adding a class here, we can use `x-show` to visually hide the element based on the value of `isOpen`.

```html
<div x-data="{ isOpen: false }">
  <button @click="isOpen = ! isOpen">Toggle Menu</button>
  <div x-show="isOpen" class="menu">
    <!--menu content-->
  </div>
</div>
```

## Conclusion

Alpine.js is a brilliant framework that can handle a lot of heavy lifting in your application without needing to load in a large library or be bound to a specific development environment. I implore you to read further into their [documentation](https://alpinejs.dev/start-here) as it is top-notch and covers a lot more capabilities than I highlighted in this article.

Happy Coding!
