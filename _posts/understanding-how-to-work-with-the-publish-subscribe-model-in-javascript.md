---
title: "Understanding how to work with the publish/subscribe model in JavaScript"
description: "The publish/subscribe design pattern is a helpful concept that allows you to decouple areas of your application so that you can have communication between components. In this article, we will go over how the pub/sub model works and build out our own implementation."
image: "/images/blog-cover/pubsub.jpg"
created_at: "06/25/2022"
tags: ["JavaScript"]
---

Lately, I've been reading about data structures and algorithms to try and up my software development game. The pubsub model is something I have been particularly interested in as I use it a lot at work, but haven't had to implement one from the start. There are tons of great resources relating to this and while I feel like I have a pretty good understanding of it now, I figured the best way to solidify my understanding was to write about it.

In this article, we will cover how you can implement a pubsub model in your applications using JavaScript. This is not a definitive guide, as there are many ways you can implement this across different languages, but the concepts in this article should be relatable to whatever you work with. I will be providing a basic overview of how it works using examples in JavaScript.

## What is a pubsub?

A pubsub or publish and subscribe is a design system that allows two unrelated components in your application to speak to one another. Similar to how you would use `.addEventListener()` to bind a click event to a button, you can create a subscriber that listens whenever a publish event happens in your application and execute a function based on the subscription that was called. For Example, you could create an alert component (the subscriber) that would alert your users whenever a certain condition is met. If you submitted a form and there was a network error or even a successful submission, instead of handling the alert state within the form component you could publish an event that would trigger the alert component to render a payload containing a message to the user. The form and the alert have no connection to each other and are separate components, but by implementing a pubsub model you can allow those components to speak to one another.

## Implementing the subscription

Subscriptions allow you to subscribe to an event as the name suggests. We could create a subscription with the name of `alert` that would contain a callback function that would handle rendering a message on the screen. The subscriber would then listen to any publish event that matches the event name of `alert` and execute the callback function with parameters passed in by the publisher.

We can create a method within a class called subscribe that would take in an event name and a callback function as parameters. Then we use the event name as a key and push the callback function to an array. In the example below we first check to see if our event has an array associated, if it doesn't we create an empty array and then push our function into the array. Otherwise, we simply push the function into the array. We want to use an array to store our callbacks as we might need more than one callback to be executed for the same event.

```js
subscribe(event, callback) {
  if (!Array.isArray(bus[event])) {
    bus[event] = [];
  }
  bus[event].push(callback);
}
```

## Creating our publisher

Our publisher will accept the event name and any arguments we want to be passed into our subscriber's callback function. If we had a callback function in our `alert` subscriber that would render a message to the user, our publisher would contain an argument that would set the message to be displayed.

In the below example we have a publish method that accepts an event name and uses the spread operator for arguments, this allows multiple arguments to be passed in. We then check to see if that event is registered on our bus and if it is not we return the function as no action can be taken. If the event does exist we iterate over our array of callbacks and execute the functions spreading in our arguments as parameters.

```js
publish(event, ...args) {
  if (!bus[event]) return;
  bus[event].forEach((callback) => callback(...args));
}
```

## Creating the service

Now that we know how a publish and subscribe model looks we need to store our methods somewhere. You can create this as a function, but for this example, I will be creating it as a class so that we can house our methods and register it to the window.

We start by creating a variable to store our events, I am calling this variable `bus` in the below example since it is what is housing our event bus and their respective callbacks. Our class is initiated and inside we register our publish and subscribe methods. Lastly, we can register a new instance of the `PubSub` class to the window so that we can freely call our publish and subscribe methods without needing to worry about importing any files.

```js
const bus = {};

class PubSub {
  subscribe(event, callback) {
    if (!Array.isArray(bus[event])) {
      bus[event] = [];
    }
    bus[event].push(callback);
  }

  publish(event, ...args) {
    if (!bus[event]) return;
    bus[event].forEach((callback) => callback(...args));
  }
}

window.bus = new PubSub();
```

## How to use our pubsub model

Let's see how this might look using our `alert` example. We can call `window.bus.subscribe` and pass in our event name and a callback function. The `e` parameter will contain the payload that our publisher will set when called. Once a publish event happens we will see the message appear in our web console. You could alternatively execute a function that physically renders the message to the user and set that as the callback.

```js
window.bus.subscribe("alert", (e) => {
  console.log(e.message);
});
```

Whenever we publish with an event of `alert` the callback function in our subscribe will be executed. In the below example we are calling `window.bus.publish` and assigning the event with a payload that contains the message to be printed into the console.

```js
window.bus.publish("alert", { message: "Hello World" });
```

When the above code runs you will see a message appear in the console. You can [checkout this codepen](https://codepen.io/huntertrammell/pen/yLKBNbg?editors=0011) with the completed code and inspect the console to see it in action!

## Conclusion

Using a pubsub is a great way to decouple areas of your application and provide a streamlined way of transferring data between components. As I said before this is a basic example of a pubsub, we could also consider implementing an unsubscribe method that would remove watchers from our bus. I hope you enjoyed this article and learned a bit about how pubsub models work in general. 

Happy Coding!