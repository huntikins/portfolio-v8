---
title: "A quick guide on how to strategically use Custom Properties in CSS"
description: "Custom Properties or variables in CSS can help keep your stylesheets DRY while providing a way to make your code sustainable. Let's take a look at how you can strategically use custom properties in CSS."
image: "/images/blog-cover/css-custom-properties.jpg"
created_at: "7/17/2022"
tags: ["CSS"]
---

CSS Custom Properties are something I use frequently in my everyday development, but one thing I struggle with is understanding the best practices around them. When is it appropriate to use a CSS Custom Property? I did a bit of research to help solidify my understanding of this and have come up with the following strategy when it comes to using CSS Custom Properties in your code.

## What are Custom Properties

Before we begin let's take a quick look at what Custom Properties or variables are in CSS. First introduced in 2012 with full browser support by 2017, CSS Custom Properties are a way for you to store the value of a property in a reusable variable that can be used throughout your code. While these are similar to the variables you would use in pre-processors such as Sass they are a bit different as they can only be used following a property definition. CSS Custom Properties help keep your code DRY as you won't be repeating the same values throughout your code but rather referencing a single source of truth. Their values can be inherited and redefined as needed making them a powerful asset to your developer toolbelt.

## How can you use them

Custom Properties are pretty straightforward in their use case. To define a variable all you need to do is add a double-dash followed by the property name as we can see below in the `:root` pseudo-class. To assign the value, you use the CSS function `var()` and pass the property name between the parenthesis.

```css
:root {
  --theme--color-primary: #a6d8d4;
}

.some-class {
  color: var(--theme--color-primary);
}
```

### Naming conventions

Naming conventions are important, while I couldn't find any definitive frameworks specifically geared toward Custom Properties, there are a few things worth noting when it comes to choosing names for your variables.

1. **Keep your naming consistent.** Whatever naming convention you choose you should stick with it throughout the process of development. This will help keep your code cleaner and more maintainable as more properties get added i.e. preventing naming conflicts.

2. **Consider using BEM notation.** BEM Notation (Block, Element, Modifier) is a naming convention widely used in CSS when naming classes, but it can also apply to the naming of CSS Custom Properties. In the above example, we could consider "theme" to be the block, "color" the element, and "primary" to be the modifier. More information on BEM Notation can be [found here](http://getbem.com/introduction/).

## When should you use custom properties

Now that we know how to use Custom Properties, we should also understand a few scenarios for when it is a good idea to implement them.

### Theming

When creating an app there will generally be a theme that you will follow to keep your design consistent, rather than defining these theme-related values individually with each property, it is generally a good idea to assign these to Custom Properties.

```css
:root {
  --theme--color-primary: #a6d8d4;
  --theme--color-secondary: #d1f5ff;
  --theme--color-tertiary: #eef8ff;
}
```

The `:root` selector is your best friend when it comes to theming. This pseudo-class refers to the root of the document and is the same as targeting the HTML tag but with higher specificity. Since Custom Properties are cascading, meaning they can be inherited, any element within the DOM will have access to the variables defined here. It is worth noting that while these can be considered global variables, elements attached to the shadow DOM will not inherit these. When working with the shadow DOM you can use the `:host` pseudo-class to assign your theme variables so they can be inherited by your custom elements.

### Media queries

Another great use case for Custom Properties are media queries. I for one can say that I don't enjoy writing these 😅, but after switching to using Custom Properties they have become a lot more tolerable.

```css
:root {
  --theme--font-large: 5rem;
}

@media (max-width: 1024px) {
  :root {
    --theme--font-large: 3rem;
  }
}

h1 {
  font-size: var(--theme--font-large);
}
```

Instead of assigning a new value to a property in a media query, you can simply redeclare the value of a Custom Property, this will help reduce the amount of code you write as you are overriding a single Custom Property that may be used in several places. Whereas with the property value approach you would need to make a media query for each instance.

### Sizing properties

Keeping with the trend of being able to make a change in a single place rather than update that value wherever it is used, it is a good idea to use variables when you are using properties that have values with measurements such as padding, margin, or font-size. Chances are you will run into a scenario where you have multiple elements that share the same measurements. By assigning these values to a Custom Property you can keep your code DRY and have a single source of truth should any of those values need to change. 

### Using JavaScript to apply styles

When building a front-end application there are often times when you need to use JavaScript to provide a style change on an element. With JavaScript, you can always assign a class or add an inline style, but you can also read and write the values of Custom Properties using the `getComputedStyle()` method. I wrote an article that goes a bit more in-depth on [how to use Custom Properties with JavaScript](https://huntertrammell.dev/blog/using-css-variables-to-create-interactive-styling) that you should check out!

## Conclusion

CSS Custom Properties can be a powerful addition to your application when used correctly, I hope the above strategies help keep your code DRY and maintainable. 

Happy Coding!
