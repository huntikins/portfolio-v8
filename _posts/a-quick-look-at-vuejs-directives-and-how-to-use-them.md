---
title: "A quick look at Vue.js directives and how to use them"
description: "Vue.js is a powerful JavaScript framework that contains several built-in directives that you can utilize to create responsive applications, let's take a look at them."
image: "/images/blog-cover/vue-directives.jpg"
created_at: "06/26/2022"
tags: ["Vue.js", "JavaScript"]
---

Oh, Vue.js how I love thee. Your syntax and template structure is truly something to be admired 😅. Vue.js is a popular JavaScript framework that helps you build powerful websites quickly. One of the features of Vue.js that makes it a real game-changer is its directives. Vue.js directives allow you to bind logical syntax directly into your HTML markup. For example, let's say you have a drop-down menu, using a directive you can easily bind a boolean value to an `aria-expanded` attribute instead of needing to manually handle that update yourself. Vue.js has many directives that you can utilize in your applications, let's take a look at some of them.

![Let's get to learning!](https://media0.giphy.com/media/l3dj09hpsfuYkijDi/giphy.gif?cid=ecf05e47n71cjbo3vdm8c857ie7zqrkvxhchie93pm1hy2ob&rid=giphy.gif&ct=g)

## v-text and v-html

With `v-text` and `v-html` you can set the text or HTML content of an element by assigning a value. You could use `v-text` to populate the title of a blog post and `v-html` to render the HTML contents. This allows you to create dynamic page templates with ease.

```html
<h1 v-text="title"></h1>
<div v-html="content"></div>
```

- [v-text documentation](https://vuejs.org/api/built-in-directives.html#v-text)
- [v-html documentation](https://vuejs.org/api/built-in-directives.html#v-html)

## v-if, v-else-if, and v-else

Conditionally rendering content is a necessity in JavaScript frameworks, you want your components to stay agnostic of static content so that they can be reused across multiple instances and sometimes there are certain elements you may or may not want to have rendered. Let's say you have a notification that should render a different markup based on the type of alert that is passed. Using `v-if`, `v-else-if`, and `v-else` you can conditionally render that markup and provide a fallback just as you would in a normal if-else statement.

```html
<div v-if="type === 'alert'">
  <!-- Notification Alert Markup-->
</div>
<div v-else-if="type === 'warning'">
  <!-- Notification Warning Markup-->
</div>
<div v-else>
  <!-- Standard Notification Markup-->
</div>
```

- [v-if documentation](https://vuejs.org/guide/essentials/conditional.html#v-if)
- [v-else-if documentation](https://vuejs.org/guide/essentials/conditional.html#v-else-if)
- [v-else documentation](https://vuejs.org/guide/essentials/conditional.html#v-else)

## v-show and v-cloak

Similar to `v-if` and friends, `v-show` allows you to conditionally _display_ an element. Your element will still render but will not be displayed on the page as it adds a display of none using CSS.

```jsx
<h2 v-show="loggedIn">Welcome {{ user.name }}</h2>
```

`v-cloak` works similar to `v-show` although it keeps components from being rendered during compiling until the value has been initiated. You may have a dashboard that loads some data from an API, this would keep things hidden until your content has been loaded.

```html
<section class="dashboard" v-cloak>
  <!-- Dashboard Content -->
</section>
```

- [v-show documentation](https://vuejs.org/guide/essentials/conditional.html#v-show)
- [v-cloak documentation](https://vuejs.org/api/built-in-directives.html#v-cloak)

## v-bind

In the introduction, I used an example of binding the value of an attribute with a variable to allow you to programmatically handle updating the HTML. `v-bind` allows you to do that very thing. In the below example we have bound the `aria-expanded` attribute to a variable `isOpen` that is a boolean that reflects the state of our menu. We can also use a shorthand of `:` instead of typing out `v-bind`.

```html
<!-- Without shorthand-->
<div class="dropdown-menu" v-bind:aria-expanded="isOpen">
  <!-- Dropdown Content -->
</div>

<!-- With shorthand-->
<div class="dropdown-menu" :aria-expanded="isOpen">
  <!-- Dropdown Content -->
</div>
```

- [v-bind documentation](https://vuejs.org/api/built-in-directives.html#v-bind)

## v-for

There are many instances where you might have repeatable content on your page, the `v-for` directive allows you to iterate over your components. You can pull data from an object, an array, a number or even a string. Note that the element that you instantiate `v-for` on will be repeated as will its contents. It is worth noting that when using `v-for` you must provide a key so that Vue.js can keep track of the elements being iterated over.

```html
<div v-for="(item, index) in items" :key="index">
  <!-- Items to be repeated -->
</div>
```

- [v-for documentation](https://vuejs.org/guide/essentials/list.html#v-for)

## v-on

Binding click events can be done with ease using the `v-on` directive or `@` as a shorthand. All you need to do is specify the event that is to be bound and then pass in a function to be executed when that event happens. You can also add modifiers such as `.prevent` to automatically invoke `event.preventDefault()`.

```html
<!-- Without shorthand -->
<button v-on:click="handleClick">Click Me!</button>

<!-- With shorthand -->
<form @submit.prevent="handleSubmit">
  <!-- Form Content -->
</form>
```

- [v-on documentation](https://vuejs.org/api/built-in-directives.html#v-on)

## v-model

Handling input values can get messy, especially with large forms. Luckily Vue.js has a directive that allows you to bind the value of an input to a variable. `v-model` automatically binds the value of an input on change to a variable, so as the user types the variable is updated with the text the user is adding. You can also add modifiers to alter the value such as `.trim` which would remove whitespace from around the value automatically.

```html
<label for="first_name">First Name</label>
<input v-model.trim="firstName" type="text" name="first_name" id="first_name" />
```

- [v-model documentation](https://vuejs.org/api/built-in-directives.html#v-model)

## Conclusion

Vue.js has a lot of directives that will help you build apps faster without needing to spend time on trivial aspects of development such as binding event listeners or grabbing input values. There are a few more that we didn't cover but documentation on those can be found on [the Vue.js website](https://vuejs.org/api/built-in-directives.html). I hope this article was able to provide some insight into the power of Vue.js directives and how you can utilize them in your applications.

Happy Coding!
