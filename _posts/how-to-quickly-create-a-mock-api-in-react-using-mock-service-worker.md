---
title: "How to quickly create a mock API in React using Mock Service Worker"
description: "Mock Service Worker is a JavaScript library that allows you to quickly mock API's in your application. Let's take a look at how to implement a mock API in React."
image: "/images/blog-cover/mock-api.jpg"
created_at: "06/30/2022"
tags: ["JavaScript", "React", "API"]
---

When working on an application there may be times when the front-end needs to be built out but the back-end is not quite ready. While these two can be separate, the front-end may rely on API's that have yet to be built. Enter [Mock Service Worker](https://mswjs.io/), a JavaScript library that allows you to quickly scale a mock API in your application with only a few lines of code. In this article, we will take a look at how to set up a mock API in React and how we can integrate the mock service worker into our application. Let's rock!

![Old folks dancing](https://media4.giphy.com/media/3rgXBQIDHkFNniTNRu/giphy.webp?cid=ecf05e478bip2uu3xjjdjo2vuskqvyupa2hagfwj7spvcmxe&rid=giphy.webp&ct=g)

## Getting started

Before we begin let's go ahead and generate a fresh React install using the command `npx create-react-app mswjs` once that completes navigate into the `mswjs` directory and install our dependency `npm install msw --save-dev`. We now have access to the Mock Service Worker library and can begin to create our handlers. Inside the `src` directory go ahead and create a new folder called `mocks`. This is where we will keep our mswjs related code.

## Setting up the mock handler

In order to create our mock API, we need to set up a handler. This will handle overriding the network request and sending our custom-defined payload to the browser. To start, go ahead and create a file called `handlers.js` inside of your `mocks` directory. We will continue to add files in the `mocks` directory so our code remains organized.

```js
// handlers.js
import { rest } from 'msw'

export const handlers = [
  rest.get("/api/movies", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        movies: [
          {
            title: "Demolition Man",
            release_date: "10/08/1993",
            summary: "Simon Phoenix, a violent criminal cryogenically frozen in 1996, escapes during a parole hearing in 2032 in the utopia of San Angeles. Police are incapable of dealing with his violent ways and turn to his captor, who had also been cryogenically frozen after being wrongfully accused of killing 30 innocent people while apprehending Phoenix.",
            director: "Marco Brambilla",
            poster: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/yC3TFv0lw57PCzXS5xx527AJogo.jpg",
          },
          {
            title: "Hardcore Henry",
            release_date: "04/06/2016",
            summary: "Henry, a newly resurrected cyborg who must save his wife/creator from the clutches of a psychotic tyrant with telekinetic powers, AKAN, and his army of mercenaries. Fighting alongside Henry is Jimmy, who is Henry's only hope to make it through the day. Hardcore Henry takes place over the course of one day, in Moscow, Russia.",
            director: "Ilya Naishuller",
            poster: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/vmJMY8cbKs78F59OlTc8xkLf9Fj.jpg",
          },
        ],
      })
    );
  }),
];
```

Let's digest what is happening here. We first start by extracting the `rest` method from `msw`, then we are defining a handlers array. The handlers array will hold all of our mock API data allowing us to set up multiple requests. We are defining a get request so we use `rest.get()`, if we wanted to perform another type of request we would just append the type to the `rest` method in the same fashion. Our handler takes in 2 arguments, the first being the route that should be mocked and the second is the callback function that will execute when the route is accessed. In our callback function, we return a response that contains some movie data using a context or `ctx`. In our context, we assign the response status as well as return our movie payload in JSON format.

## Registering our handlers

Now that we have defined our mock API route we need to register it with the service worker. Create a new file in the `mocks` directory called `browser.js`.

```js
import { setupWorker } from "msw";
import { handlers } from "./handlers";
// This configures a Service Worker with the given request handlers.
export const worker = setupWorker(...handlers);
```

We start by importing `setupWorker` and then pass in the handlers we defined into it and export this as a variable named `worker`. We will import our worker into our application and call `worker.start()` to get things running.

The last thing we need to do before we are ready to integrate with our React app is to generate a service worker for our public directory. Run the following command `npx msw init public/ --save` in your terminal. This will generate a pre-configured service worker for us to utilize and since we added `--save` this will update our package.json to automatically update our service worker if we decide to upgrade the `mws` package. 

## Adding the service worker into our React app

Now that we have created our handlers and defined our worker we are now ready to integrate it into our React app and start fetching some movie data! The below code will go in the index.js file in your React app. We only want our service worker to run in development so we wrap it in a conditional that checks the environment. We then call `worker.start()` to initialize the service worker.

```js
// index.js
if (process.env.NODE_ENV === "development") {
  const { worker } = require("./mocks/browser");
  worker.start();
}
```
That is all that is needed to get a mock service worker working in our application!

## Consuming our mock API

Our mock API is primed and ready for use. If you inspect the console you should see a message `[MSW] Mocking enabled.` notifying us that our service worker is running and ready to go. Let's take a look at how we can fetch our data.

```js
// App.js
import { useEffect } from "react";

function App() {
  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await fetch("/api/movies");

        if (!response.ok) {
          console.error(response);
        }

        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchMovies();
  }, []);

  return <h1>Hello World</h1>;
}

export default App;
```

If we replace the contents of our App.js with the above code we should be able to see our movies logged to the console on load. We are wrapping our API call in a `useEffect()` hook so that it only runs when the component is rendered and since we provided an empty dependency array we only run this on the first render. We create a try/catch inside of our `fetchMovies` function that will provide us with some simple error handling. Badabing, we have successfully created and consumed our mock API

## Conclusion

Setting up a mock API can be a great way to speed up front-end development when you are waiting on API's to be completed or even in situations where you don't have access. While the example I used was setting static data you could also use the service worker to mock session data and create/store tokens in the browser. You can also run Mock Service Worker in a node environment instead of the browser. I hope you enjoyed this article and learned something new. 

Happy Coding!
