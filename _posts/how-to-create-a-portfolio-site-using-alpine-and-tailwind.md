---
title: "How to create a portfolio site using Alpine.js and Tailwind CSS"
description: "Having a good portfolio site is an important part of being a developer, you need a place to show off your skills and serve as an archive for your contributions to the internet. In this tutorial we will be completing the Web Developer Portfolio challenge from Codewell."
image: "/images/blog-cover/portfolio.png"
created_at: "06/23/2022"
tags: ["Tutorial", "Tailwind", "Alpine.js"]
---

A portfolio is an important piece of a developer's toolbelt, it is a way to show off all that you have done for friends, family and most importantly employers! Building a slick portfolio is no simple feat and often requires a lot of design work which I can say can be a blocker for some (myself included). I recently wrote an [article about Codewell](https://huntertrammell.dev/blog/why-you-should-use-codewell-for-your-next-portfolio), a service that provides mockups as a challenge for you to use when building a website. Luckily, Codewell offers a [Web Developer Portfolio Challenge](https://www.codewell.cc/challenges/web-developer-portfolio--617d4897a383e41090a3e46f) where they provide a mockup of a pretty sharp-looking portfolio you can build and use as a starting point for your own portfolio.

In this article, I will show you how you can build the Codewell challenge using Alpine.js and Tailwind CSS. If you are looking for a challenge, head on over to Codewell to get the assets and give it a whirl, otherwise stick around and we can build it together. If you want to see a live version of the site you can check out the [deployed solution here](https://stately-duckanoo-7fe3ae.netlify.app/). You can also take a look at the completed project on [Github](https://github.com/huntertrammell/alpine-tailwind-portfolio).

## Getting Started

For this project, we will be using basic HTML, CSS, and JavaScript with a script that will help integrate tailwind with our project. Let's start by creating a few files, your project directory should look like this:

```
index.html
tailwind.css
app.js
```

We also need to get all of the assets, those can be found in the [completed repository on GitHub](https://github.com/huntertrammell/alpine-tailwind-portfolio/tree/main/assets). Place those files in a folder called assets at the root of your project.

### Adding In Tailwind CSS

Next, we will initialize a package.json file so that we can pull in our dev dependencies. In your terminal, run `npm init -y`. After that completes run `npm install -D tailwindcss`, this will install Tailwind CSS in our project. To utilize the powerful features of tailwind, we need to run `npx tailwindcss init` to generate our tailwind config files. Replace the content of the `tailwind.config.js` file with the following:

```js
module.exports = {
  content: ["*.{html,js}"],
  theme: {
    extend: {},
    fontFamily: {
      heading: ["'Prata'", "serif"],
      body: ["'Inter'", "sans-serif"],
    },
  },
  plugins: [],
};
```

Since our HTML is at the root level we need to tell it where to look, in addition, we are loading some google fonts and setting custom classes (font-heading & font-body). We will add in our import script once we set up our HTML document. Now that we have told Tailwind what to do, we need to pull in the styles into our `tailwind.css`. Open that file and add the following:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

We have access to tailwind styles in our `tailwind.css` file now. The last thing we need to do is add a script that we can run when developing that will build our CSS file with the styles we are using. In your `package.json` add the following script under the script section:

```json
"start": "npx tailwindcss -i ./tailwind.css -o ./style.css --watch"
```

When we run `npm run start` it will start watching our changes and build a `style.css` file that we will directly import into our project to be ran in the browser. Tailwind is now configured and we are ready to start developing!

### Setting Up Our Document Head

We need to pull in a few libraries into our HTML that we can use throughout the project, one of them being Alpine.js. If you are not familiar, Alpine.js is a lightweight JavaScript framework that provides a way for us to create a reactive app with little configuration. If you aren't familiar, I suggest you check out [this article I wrote on Alpine.js](https://huntertrammell.dev/blog/alpinejs-the-lightweight-and-powerful-framework-you-should-use-for-your-next-project).

Open your `index.html` file and add the following code. Here we will import our generated stylesheet in addition to loading some google fonts and Alpine.js

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Alpine x Tailwind Portfolio</title>
    <link rel="stylesheet" href="style.css" />
    <script
      defer
      src="https://unpkg.com/alpinejs@3.10.2/dist/cdn.min.js"
    ></script>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter&family=Prata&display=swap"
      rel="stylesheet"
    />
  </head>
</html>
```

## Scaffolding Our Layout

Time to start building our app! Before we get too deep I want to take a second and set up the layout of our HTML as well as our Alpine.js context so that we can continue to add to both as we progress with this tutorial.

In your `index.html` file let's create a body tag, and initiate our portfolio context using `x-data`. We will also assign a background color. Inside of our body tag, we need to create a header, main, and footer tags as well as import our `app.js` file. Your markup should look like this:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    ...
  </head>
  <body x-data="portfolio" class="bg-black font-body">
    <header></header>
    <main></main>
    <footer></footer>
    <script src="app.js"></script>
  </body>
</html>
```

We lastly need to set up our portfolio context in app.js. we will start by listening for `alpine:init` to make sure Alpine.js has loaded properly and then we can define our context. We will also define a title and create our navbar handler. your app.js file should look like this.

```js
// Wait for alpine to be instantiated before processing
document.addEventListener("alpine:init", () => {
  Alpine.data("portfolio", () => ({
    title: "Hunter Trammell",
    showNav: false,
    handleNav() {
      this.showNav = !this.showNav;
    },
  }));
});
```

We have defined a title for our site we can use in the header and the footer and a variable called `showNav` to hold the state of our navbar when it is open or closed. The `handleNav()` method will toggle our `showNav` value, we will bind this to a click event in our header.

## Creating The Header

```html
<header class="max-w-4xl mx-auto py-8 lg:px-4">
  <nav class="flex justify-between items-center text-white px-4 lg:px-0">
    <h2 class="font-heading" x-text="title"></h2>
    <button @click="handleNav" class="inline-block lg:hidden" @click="">
      <img src="./assets/menu.svg" alt="Mobile Menu" />
    </button>
    <ul
      id="menu"
      :class="showNav ? '' : 'hidden'"
      class="lg:flex lg:static absolute right-0 bg-black top-14 px-8 py-2 lg:p-0 text-gray-400"
    >
      <li class="px-3 cursor-pointer">Articles</li>
      <li class="px-3 cursor-pointer">Chats</li>
      <li class="px-3 cursor-pointer">Awards</li>
      <li class="px-3 cursor-pointer">About</li>
    </ul>
    <button
      class="hidden lg:inline-block bg-yellow-300 text-black hover:opacity-60 font-heading px-6 py-4"
    >
      Get In Touch
    </button>
  </nav>
</header>
```

Our header has a max-width that we will use across this app to keep things uniform and cropped a bit on larger screens. we set the title of our site using `x-text` and add the `@click="handleNav"` to our hamburger button which is of course hidden until on a medium viewport. We can dynamically add the `hidden` class based on the value of `showNav` using `x-bind` or `:` as a shorthand. Then on medium screens and smaller we use `absolute` positioning to move our menu links under our hamburger menu so that it looks like a dropdown. That is our header!

## Setting Up The Hero

In the mockup, our hero text appears to be about 75% of the page, rather than give it a width of 75% I assigned a max-width so that it will take up full width on smaller screens and I don't need to override that property.

```html
<section class="max-w-4xl mx-auto pt-8 px-4">
  <div class="text-gray-400 max-w-2xl">
    <h1 class="text-4xl lg:text-5xl text-white font-heading lg:leading-normal">
      Helping companies build better, scalable software.
    </h1>
    <p class="pt-4">
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quibusdam
      corrupti accusantium minima nisi incidunt autem. Expedita excepturi quis
      sed aliquid sit dicta, eum, pariatur amet ipsum debitis maxime. Assumenda,
      nesciunt.
    </p>
  </div>
  <div
    class="flex justify-center lg:justify-between items-center flex-wrap py-14"
  >
    <!-- Logo Grid -->
  </div>
</section>
```

## Using x-for To Handle Repeatable Content

There are a few sections with repeatable content on the site, we will utilize `x-for` to handle those and store the values in our portfolio context. The logo grid and the posts can both be created once using a template. Looking at the logo grid it is just the same element repeated. The only difference is the image source and alt text. For this, we can create a `<template>` tag and render our HTML in between using `x-bind` to bind the values of our attributes with the `x-for` iterator. We must use the `key` attribute so Alpine can keep track of its iterations.

```html
<template x-for="logo in logos">
  <img class="p-4" :src="logo.src" :alt="logo.alt" :key="logo.id" />
</template>
```

We need to define the `logos` array in our portfolio context, we can place the following code in our app.js file with the rest of our context values.

```js
logos: [
  {
    id: 1,
    src: "./assets/logos/walmart.svg",
    alt: "walmart",
  },
  {
    id: 2,
    src: "./assets/logos/jp-morgan.svg",
    alt: "jp-morgan",
  },
  {
    id: 3,
    src: "./assets/logos/visa.svg",
    alt: "visa",
  },
  {
    id: 4,
    src: "./assets/logos/tinder.svg",
    alt: "tinder",
  },
  {
    id: 5,
    src: "./assets/logos/samsung.svg",
    alt: "samsung",
  },
  {
    id: 6,
    src: "./assets/logos/verizon.svg",
    alt: "verizon",
  },
],
```

As with our logos, the next section on the page houses repeatable content as well, we can create a new section and place another template inside but this time looping over the posts. By using this approach we keep this repeatable content dynamic which will make it easier for you to update as your content evolves.

```html
<section class="max-w-4xl mx-auto px-4 pb-14">
  <div class="grid lg:grid-cols-2 gap-16">
    <template x-for="project in projects">
      <div class="text-gray-400" :key="project.id">
        <img :src="project.img" :alt="project.imgAlt" />
        <h2 class="font-heading text-white text-3xl py-4">
          <span x-text="project.title"></span> &rarr;
        </h2>
        <p x-text="project.body"></p>
      </div>
    </template>
  </div>
</section>
```

```js
projects: [
  {
    id: 1,
    img: "./assets/spense.png",
    imgAlt: "spense",
    title: "Spense.com",
    body: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sint facilis vero ipsum, officia doloremque reiciendis quia provident Tenetur dolorem nisi aut iste minima non error cum quod! Totam, quisquam molestiae?",
  },
  {
    id: 2,
    img: "./assets/yelp-camp.png",
    imgAlt: "yelp-camp",
    title: "YelpCamp.com",
    body: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sint facilis vero ipsum, officia doloremque reiciendis quia provident Tenetur dolorem nisi aut iste minima non error cum quod! Totam, quisquam molestiae?",
  },
],
```

## Adding In Some Copy

We have this full-width color section that has some copy inside. For this, we will add our background color to the `<section>` and then add a `<div>` on the inside that will have our max-width. We will also utilize the same grid we used for the posts so that we can keep that clean gap in the middle of our content.

```html
<section class="bg-gray-700">
  <div class="max-w-4xl mx-auto px-4 py-14">
    <div class="grid lg:grid-cols-2 gap-4 lg:gap-16">
      <div class="text-gray-400">
        <h2 class="font-heading text-white text-3xl pb-4">
          A co-founder of one of the world's largest communities
        </h2>
        <p class="pb-4">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sint facilis
          vero ipsum, officia doloremque reiciendis quia provident. Tenetur
          dolorem nisi aut iste minima non error cum quod! Totam, quisquam
          molestiae?
        </p>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sint facilis
          vero ipsum, officia doloremque reiciendis quia provident. Tenetur
          dolorem nisi aut iste minima non error cum quod! Totam, quisquam
          molestiae?
        </p>
      </div>
      <div class="text-gray-400">
        <p class="pb-4">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sint facilis
          vero ipsum, officia doloremque reiciendis quia provident. Tenetur
          dolorem nisi aut iste minima non error cum quod! Totam, quisquam
          molestiae?
        </p>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sint facilis
          vero ipsum, officia doloremque reiciendis quia provident. Tenetur
          dolorem nisi aut iste minima non error cum quod! Totam, quisquam
          molestiae?
        </p>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sint facilis
          vero ipsum, officia doloremque reiciendis quia provident. Tenetur
          dolorem nisi aut iste minima non error cum quod! Totam, quisquam
          molestiae?
        </p>
      </div>
    </div>
  </div>
</section>
```

Our last section before the footer is a 50% width CTA. We will utilize the same grid so that it "minds the gap" 🚇.

```html
<section class="max-w-4xl mx-auto px-4 py-14">
  <div class="grid lg:grid-cols-2 gap-16">
    <div class="text-gray-400">
      <h2 class="font-heading text-white text-3xl py-4">
        Interested in working with me?
      </h2>
      <p class="pb-6">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sint facilis
        vero ipsum, officia doloremque reiciendis quia provident. Tenetur
        dolorem nisi aut iste minima non error cum quod! Totam, quisquam
        molestiae?
      </p>
      <button
        class="bg-yellow-300 text-black hover:opacity-60 font-heading px-6 py-4"
      >
        Get In Touch
      </button>
    </div>
  </div>
</section>
```

## Finishing Touches

Our site is looking good and is almost completed, all that is left is to add the footer. Again we are using `x-text` to set the title in our footer. This helps as if we want to change the text we just need to make the change in one spot, if you can imagine if we had a few more pages how many spots would need to be manually updated without this.

```html
<footer class="bg-gray-700">
  <div class="max-w-4xl mx-auto px-4 py-8 flex justify-between items-center">
    <h2 class="font-heading text-white" x-text="title"></h2>
    <div>
      <ul class="flex">
        <li class="pr-1">
          <img src="./assets/social/github.svg" alt="github" />
        </li>
        <li class="px-1">
          <img src="./assets/social/linkedin.svg" alt="linkedin" />
        </li>
        <li class="pl-1">
          <img src="./assets/social/twitter.svg" alt="twitter" />
        </li>
      </ul>
    </div>
  </div>
</footer>
```

## Conclusion

Our portfolio is now complete! We used Tailwind CSS to handle styling and Alpine.js to handle the interactivity and repeatable content. I hope you enjoyed this tutorial and wish you the best of luck creating your portfolio. If you liked this challenge, be sure to checkout [Codewell](https://codewell.cc) as they have several other challenges you can do for free and some cool premium challenges as well. 

Happy Coding!
