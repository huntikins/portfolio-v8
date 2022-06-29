---
title: "NodeList vs HTMLCollection: What's the difference and how to use them"
description: "In JavaScript, you will often get a NodeList or an HTMLCollection returned when using built-in methods. Both are very similar but don't share the same properties. Let's take a look at the difference and how to use them."
image: "/images/blog-cover/nodelist-vs-collection.jpg"
created_at: "06/28/2022"
tags: ["JavaScript"]
---

As a developer, you often need to query like elements using a class or an attribute as a selector. Luckily JavaScript has several methods built in such as `getElementById()`, `getElementByClassName()`, or `querySelector()`. Working with these methods you will likely encounter a NodeList or an HTMLCollection and need to know the difference and the properties available on each. I know I often get confused and need to consult documentation when I try to run a `forEach` on an HTMLCollection (you can't) and get an error. Let's take a look at both of these array-like collections.

## What is a NodeList?

A NodeList is a collection of document nodes, these can include element nodes, text nodes, and attribute nodes. NodeLists can be static or live but are typically static. If a NodeList is static that means that the nodes that are returned are the nodes you will end with. Using `querySelectorAll()` returns a static node list. If another element matching that selector is added to the DOM, the node list will not be updated. If you want to get a live NodeList you would need to use something like `getElementById` and then access the `childNodes` property on the node that is returned.

### NodeList properties

While a NodeList seems like an Array and is it is not an Array and you cannot use normal Array methods such as `.push()` or `.shift()`. You can however use the following properties:

- `forEach()`
- `entries()`
- `item()`
- `keys()`
- `length`
- `values()`

[More information on NodeLists](https://developer.mozilla.org/en-US/docs/Web/API/NodeList)

## What is an HTMLCollection?

An HTMLCollection is a live collection of HTML Elements that is returned by methods such as `getElementsByTagName()` or `getElementsByClassName`. Since this is a live list, if more elements matching your query are added to the DOM it will automatically reflect those elements. The biggest difference between an HTMLCollection and a NodeList is the properties available.

### HTMLCollection properties

- `item()`
- `length`
- `namedItem()`

Notice how we don't have any iterable properties that are native to the HTMLCollection. Before using standard Array properties you must first convert to an Array using `Array.from()` method or using a spread operator.

[More information on HTMLCollections](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCollection) 

## Conclusion

NodeLists and HTMLCollections share a lot of similarities but are just different enough that it is beneficial to understand the differences. I hope this article helped to outline the differences between the two array-like objects and gave you a better understanding of the properties available for each.

Happy Coding!
