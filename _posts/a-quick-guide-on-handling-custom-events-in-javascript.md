---
title: "A quick guide on handling custom events in JavaScript"
description: "Events are an important part of any JavaScript app as they allow you to add interactivity. Let's take a look at how to create a custom event and the properties they return!"
image: "/images/blog-cover/js-events.jpg"
created_at: "06/27/22"
tags: ["JavaScript"]
---

JavaScript has several events you can utilize, whether they be load-related events such as `DOMContentLoaded` which fires when the browser has finished loading the HTML or action-based events such as `click` or `scroll`. There is an event for just about anything you might need to listen for. But what happens when you want to create your own event? I recently wrote an article about [creating a pubsub](https://huntertrammell.dev/blog/understanding-how-to-work-with-the-publish-subscribe-model-in-javascript) to decouple parts of your application so that unrelated components can speak freely to one another, you can also achieve this with custom events. For example, if we created a standard event listener that fires on an events input, we could use a custom event to send that input's value to another component. That other component could print the input's value on the screen for the user as they type. There does not need to be any relation between the two components, only that one element is firing an event and the other is listening for it. In this article, we will go over how you can create a custom event as well as the properties you can set within them.

## How to create a custom event

Creating a custom event is pretty straightforward and doesn't require a lot of code. Take a look at the example below, we can create a new event simply by calling `CustomEvent()` and pass in a few options. These options will define how our event works as well as the data that we want to send in our event.

```js
const event = new CustomEvent("knowledge-gained", {
  detail: { message: "I learned something new today!" },
  bubbles: true,
  cancelable: true,
  composed: false
});

document.addEventListener("knowledge-gained", () => {
  console.log(e.detail.message);
});

// I learned something new today!
```

Let's take a look at the options we can provide in our custom event constructor.

### detail

This is our payload, or how we can pass data to our users. In our above example, when the event `knowledge-gained` fires a message is returned in the detail object. While we are only passing a simple string, we could use a callback function to provide a more robust response to our event.

### bubbles

In JavaScript, bubbles refer to the upward inheritance events have in the DOM. For example, if we have placed an event listener on an input and we were to set bubbles to true, we could also listen for the same event on its parent - a form element. The event will continue to rise through ancestors with like event listeners until none are left or `e.stopPropigation()` gets called.

- [More information on event bubbling](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#event_bubbling_and_capture)

### cancelable

This is a boolean that dictates whether an event can be canceled. When you click a submit button in a form the default behavior is for the page to refresh so the form values can be appended to the URL, when you override that default behavior with `e.preventDefault()` you are canceling the event.

- [More information on cancelable events](https://developer.mozilla.org/en-US/docs/Web/API/Event/cancelable)

### composed

Composed is a boolean that determines if an event will propagate through [the shadow DOM](https://huntertrammell.dev/blog/a-brief-introduction-to-web-components) into the lite DOM. This would need to be set to true if you wanted to listen to an event from a parent element in the lite DOM that originated in the shadow DOM.

- [More information on composed events](https://developer.mozilla.org/en-US/docs/Web/API/Event/composed)

## Conclusion

Custom events can be a great way to pass data around in your application. I hope you learned something new and can utilize custom events in your own applications!

Happy Coding!
