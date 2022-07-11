---
title: "How to create a dynamic alert component in React"
description: "Having an alert component that you can trigger from anywhere in your application can be a great asset, let's take a look at how we can achieve this in React"
image: "/images/blog-cover/pubsub-alert.jpg"
created_at: "07/11/22"
tags: ["React", "JavaScript"]
---

Howdy, it's been a while! I've been hard at work on my [Hashnode x PlanetScale Hackathon](https://townhall.hashnode.com/planetscale-hackathon?source=hashnode_countdown) project and have put a pause on blogging to focus on that. While I can't share what I'm building just yet, I did implement a cool feature I thought would make an interesting blog post. I recently wrote an article about creating a [pubsub in JavaScript](https://huntertrammell.dev/blog/understanding-how-to-work-with-the-publish-subscribe-model-in-javascript), I added a pubsub into my application to allow me to trigger alerts to users whenever API calls succeed or fail. Doing this was a lot more straightforward than I thought and adds a lot of powerful functionality to the app without a lot of configuration, just setup the pubsub, bind the event subscriber to the components state and you are all set!

## Creating our pubsub

A pubsub allows us to listen for events across our application similar to how you would listen for a click on a button. If you want a deeper explanation [check out my pubsub article](https://huntertrammell.dev/blog/understanding-how-to-work-with-the-publish-subscribe-model-in-javascript), otherwise let's jump right into the code. At the root of the `src` directory, create a new folder called `utils` and a file named `pubsub.js`.

```js
// pubsub.js
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

The above code creates our pubsub, basically an array that holds our callback functions. You will need to import this file into your `index.js`. Once imported you can check to see if it is working by typing `window.bus` into the browser console, you should see definitions for the subscribe and publish methods. 

## Creating the alert component

Our alert component will be our subscriber, which means that it will listen for the publish method from across our app to be invoked and use the data published to render an alert to our users. We first need to setup a state array to house our alerts, we will then map over this array of alerts to display on the page. Let's create a file called `Alert.js`

```jsx
// Alert.js
import { useState } from "react";

export const Alert = () => {
  const [alerts, setAlerts] = useState([]);
  // More to come
}
```

Now that we have a place to store our alerts, we need to handle setting our alerts array. We will use the `useEffect` hook to handle setting up our subscriber so that it only happens on the first render and we don't end up with multiple instances of the same subscriber.

```jsx
// Alert.js
import { useState, useEffect } from "react";
import { uid } from "uid";

export const Alert = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    window.bus.subscribe("alert", (e) => {
      const uid = uid();
      const { type, message } = e;
      setAlerts((prev) => [...prev, { type, message, uid }]);
      setTimeout(() => {
        setAlerts(alerts.filter((alert) => alert.uid !== id));
      }, 5000);
    });
  }, []);

  // More to come
}
```

We have created the subscriber that listens for the `alert` event to be published, when it does we extract the payload that contains an alert type (either success or error) and the message to render to our users. We will use the alert type to determine the text color in our markup which I will touch on later. I added the uid package to generate a new id for each alert that comes through, this is needed so that we have a way to identify our alert in the event we have multiple alerts in our que with the same message. Once we set the alert we initiate a `setTimeout` that will filter our alerts array and remove the alert with a matching id. This is so the alert will only remain on the screen for a few seconds then it will disappear on its own.

The functionality is set up, now let's take a look at the final piece to our Alert component, the markup. For this, I am using Tailwind CSS classes to style the alert.

```jsx
// Alert.js
import { useState, useEffect } from "react";
import { uid } from "uid";

export const Alert = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    window.bus.subscribe("alert", (e) => {
      const uid = uid();
      const { type, message } = e;
      setAlerts((prev) => [...prev, { type, message, uid }]);
      setTimeout(() => {
        setAlerts(alerts.filter((alert) => alert.uid !== id));
      }, 5000);
    });
  }, []);

    return (
    <div className="fixed z-20 bottom-3 w-full max-w-3xl flex flex-col justify-center align-center left-1/2 transform -translate-x-1/2">
      {alerts &&
        alerts.map((alert) => (
          <div
            key={alert.uid}
            role="status"
            className={`${classNames({
              "text-red-500": alert.type === "error",
              "text-green-500": alert.type === "success",
            })} bg-gray-800 text-center py-4 px-8 w-full shadow-lg flex justify-center items-center my-2`}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="mr-2"
              aria-hidden="true"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 10.9794C11 10.4271 11.4477 9.97937 12 9.97937C12.5523 9.97937 13 10.4271 13 10.9794V16.9794C13 17.5317 12.5523 17.9794 12 17.9794C11.4477 17.9794 11 17.5317 11 16.9794V10.9794Z"
                fill="currentColor"
              />
              <path
                d="M12 6.05115C11.4477 6.05115 11 6.49886 11 7.05115C11 7.60343 11.4477 8.05115 12 8.05115C12.5523 8.05115 13 7.60343 13 7.05115C13 6.49886 12.5523 6.05115 12 6.05115Z"
                fill="currentColor"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12Z"
                fill="currentColor"
              />
            </svg>
            {alert.message}
          </div>
        ))}
    </div>
  );
}
```

Our Alert component is now complete, when triggered it will display a fixed position block of text on the bottom center of the screen. I added the `role="status"` attribute instead of `role="alert"` for accessibility purposes since this is just a status update and does not require immediate attention from the user. As mentioned above the type will determine the text color that is used, we can use the classnames package to dynamically render the proper class based on the state of the alert. 

You can now place this component in your `App.js` file so that it is included in all pages. No need to import the alert everytime you need to send an alert to the user since we are using the pubsub.

## How to trigger an alert

All you need to do to trigger the alert is to call `window.bus.publish` from your component and pass in the event name and the payload. It would look a little something like this:

```js
window.bus.publish("alert", {type:"success", message: "Your submission has been saved!"});
```

That's it! One thing worth noting as I ran into this myself but when using strictmode in react it will actually mount components more than once. While this is helpful in development that also means that even if you have a `useEffect` in place, that is going to get called everytime the component mounts so you may see double alerts. Strict mode is a development only feature so you shouldn't see this in production, but if you disable it everything will work properly.

## Conclusion

Creating an alert component can be very useful for applications that heavily rely on network requests to render data to the user. By implementing the pubsub we are able to dynamically generate an alert throughout our application without needing to import components or code. I hope you enjoyed this article and learned something new!

Happy Coding!