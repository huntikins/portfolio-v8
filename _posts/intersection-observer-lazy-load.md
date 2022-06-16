---
title: "How to use the Intersection Observer API to lazy load your images"
description: "Using the Intersection Observer can be a great way to add performance boosts to your website. In this article we will take a look at how the Intersection Observer works and how you can lazy load your images."
image: "/intersection-observer.jpg"
created_at: "06-15-2022"
tags: ["Project", "JavaScript"]
---

I have had to work with the [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) quite a bit at work lately and wanted to get a little bit more comfortable with using it. I decided to build an app that was driven by scroll and use the Intersection Observer API to handle the functionality. I was able to get it up and running fairly quickly as I was just using it to dynamically add a class that would apply some animations but wanted to push for another use case; lazy loading images.

The application shows the latest tending movies including some data about the release as well as some visual imagery, but I was loading 20 results at once from the [TMDB API](https://www.themoviedb.org/) which returns both a poster and a background image meaning 40 images total on a single page. This was a great use-case for only loading the images once they hit the viewport. You can view the [completed app](https://roaring-pie-5e584a.netlify.app/) that utilizes lazy loading images.

## Intersection Observer API Basics

The Intersection Observer API allows you to observe changes in the viewport, watching certain elements and triggering an action when it is in a certain proximity to the viewport. For example, if you were to observe an image, once the image element hits the bottom of the viewport you could dynamically replace the src of the image with the actual path thus only loading the image when it is about to be seen. I find that reading code is worth 1000 words so let's take a look at how it works under the hood.
![Walmart Yodeling kid doing finger guns](https://media0.giphy.com/media/cdNSp4L5vCU7aQrYnV/giphy.gif?cid=ecf05e47gzx8ad8kzthjfc4itu6yakl9chh5oo9n0quhmaue&rid=giphy.gif&ct=g)

```js
const observer = new IntersectionObserver(callback, options);
```

We start off by creating a new instance of the Intersection Observer API and pass in 2 arguments `callback` and `options`. The callback will handle the action that needs to be applied whenever the parameters we define in our `options` are valid. Let's take a look at what `options` might look like.

```js
const options = {
  root: document.body, // area that is scrollable
  rootMargin: "0px", // offset of page
  threshold: 1.0, // elements visibility
};
```

We can set `root` option to the scrollable area that we wish to observe or leave the default value of null. `rootMargin` uses a CSS margin style value where each position represents a different side of the element. and finally, `threshold` dictates how visible the element should be when you perform the callback function. A `threshold` of 0 would mean that the Intersection Observer would fire once the element is first visible, alternately a value of 1 would mean the element is completely visible in the viewport. You can pass an array of values or a value other than 0 & 1 as long as they are between those two numbers.

> Note that in safari the threshold only goes to .9x, this threw me for a loop when I had the intersection set to 1 and it wasn't firing 🙄

Now that we have our options defined, let's create a callback function that will execute our code when the options parameters have been met.

```js
const callback = (entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Do Something
    }
  });
}
```

We have the callback function that accepts a parameter of entries (we will get to where these come from in a bit). You loop over each entry and if it is intersecting or if you have custom criteria, see MDN [IntersectionObserverEntry](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry) for a complete list of properties.

Once we have initiated our observer and passed the required arguments the last thing we need to do is to tell the Intersection Observer what elements to actually observe.

```js
const someEl = document.getElementByID("some-element");

observer.observe(someEl);
```

The intersection observer is now watching our selected element and based on the options we provide will trigger the callback function. This element is a part of the `entries` array parameter in our callback function. Let's see how it looks all together.

```js
const options = {
  root: document.body, // area that is scrollable
  rootMargin: "0px", // offset of page
  threshold: 1.0, // elements visibility
};

const callback = (entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Do Something
    }
  });
}

const observer = new IntersectionObserver(callback, options);

const someEl = document.getElementByID("some-element");

observer.observe(someEl);
```

## Using Intersection Observer to Lazy Load Images

Now that we have the basics of how to use an Intersection Observer let's do something with it. We will continue to build off the previous example, but this time we will add some logic to our callback function to handle lazy loading the images. Getting the images to lazy load is pretty straight forward.

When the image is rendered we will give it a placeholder source, try grabbing one from [placeholder.com](https://placeholder.com/) or using a low res blurred version of the photo to render. The real image source is stored in a data attribute on the image and when the element enters the viewport we grab that real url and replace the placeholder source.

```js
const callback = (entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Get Image
      const image = document.querySelector("image");
      // Get the real image source
      const imageSrc = image.getAttribute("data-src");
      // Assign source to image
      image.src = imageSrc
    }
  });
}
```

![Steven Colbert saying "that's about it"](https://media1.giphy.com/media/l3vQY4uui06iabkli/giphy.gif?cid=ecf05e47b2u912uks198oeopdarcf4z1wriot9lf7zrdlyvf&rid=giphy.gif&ct=g)

Understanding how the Intersection Observer can be challenging, it took me a few passes to understand how it works. I found this [Intersection Observer Playground](https://wilsotobianco.com/experiments/intersection-observer-playground/) very helpful. I hope you enjoyed this article and learned a little bit more about how the Intersection Observer works and how you can easily add lazy loading to any project! 

Happy Coding!

