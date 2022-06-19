---
title: "Using CSS Variables with JavaScript to create interactive styling"
description: "CSS variables can be a great way to keep your code organized but can also be set and accessed in javascript to create powerful interactive styles."
image: "/images/blog-cover/interactive-css.jpg"
created_at: "06/17/2022"
tags: ["Project", "CSS", "JavaScript"]
---

I built this [flexbox playground](https://luxury-churros-b4577b.netlify.app/) a few weeks ago as one of my weekend coding projects and heavily used CSS variables to pass the different states the user can select. By using the `setProperty()` method we are able to update a CSS variable by passing in the variable and a new value. I was able to get the functionality of the app working by assigning the value i.e. the CSS property value to the value of the select option. Once the input receives a change event, it reassigns the variable with the current value of the input. I'll walk you through how that can work in a moment, but let's first take a look at what a CSS Variables are.

## What is a CSS Variable?
A CSS variable or custom property is an entity that holds a value and can be reused throughout a CSS document. This is especially helpful with breakpoints as instead of reassigning a new property and value to a selector you can simply override the value of a variable to reflect the expected value. You can create and use CSS variables under any selector, but by using the `:root` selector you can define variable properties that can be inherited by all selectors. To access a CSS variable you can use `var(<variable-name>)` and to set a variable you simply define the variable using a double-hyphen at the beginning like so `--new-custom-property`.

```css
#parent-el {
  --align-items: center;
}

.child-el {
    display: flex;
    align-items: var(--align-items);
}

@media(max-width: 768px){
    #parent-el {
        --align-items: flex-start;
    }
}
```

Not only are CSS Variables useful for handling dynamic value changes but they also keep your code clean and organized, and when used properly can help enforce consistent styles across your apps. More info on CSS variables can be found as always on [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties).

## Reading and assigning values to CSS Variables using JavaScript

JavaScript has a built-in method called `getComputedStyle()` that takes an element as an argument and returns a [CSS declaration block](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration) object that contains several useful properties, but the one we want is `getPropertyValue()`. `getPropertyValue()` accepts a property argument and will return it's value. It is worth noting that using `getComputedStyle()` does have some performance implications you should account for as it can force a reflow.

```js
const element = document.getElementById("parent-el");

getComputedStyle(element).getPropertyValue("--align-items") // center
```

Now that we can read our properties, let's see how we can update them. That same CSS declaration block returns a method `setProperty()` that we can use to set the property value. This is also available on `element.style` and is what I will use as an example. `setProperty()` accepts 2 arguments the first being the property that is being accessed, and the second the value to set.

```js
const element = document.getElementById("parent-el");

element.style.setProperty("--align-items", "flex-start");
```

![Schitts Creek character saying it's as easy as that](https://media2.giphy.com/media/H1THXNSQOooS7Ytw1E/giphy.gif?cid=ecf05e47k279p15w58mfssy6evdpyu173d61jbl70shx2r1z&rid=giphy.gif&ct=g)

CSS Variables can be a great way to make your code more organized as well as providing a way for styles to be interactive on a page. I hope you enjoyed this article and learned a little bit more about some cool concepts. If you want to see the code behind the flexbox playground I linked above, here is the [repository](https://github.com/huntertrammell/css-playground).

Happy Coding!
