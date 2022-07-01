---
title: "A quick guide to understanding the basics of TypeScript"
description: "TypeScript is a popular language that adds a type layer on top of JavaScript. Let's take a quick look at why you should use TypeScript and how to get started."
image: "/images/blog-cover/typescript.jpg"
created_at: "07/01/2022"
tags: ["JavaScript", "TypeScript"]
---

I remember when TypeScript was starting to gain traction and it was one of those things I always wanted to try but never got around to doing it. Fast-forward to when I needed to get familiar with it since we used it at work and purchased a Udemy course only to find it wasn't as big of a task to digest as I had thought. I wish I would have started using it sooner. At its core, TypeScript is still JavaScript just with types. In JavaScript types already exist such as number, string, boolean, etc. but you don't need to declare them when writing out code as opposed to other strongly types languages such as Java or Python. In this article, we will cover the basics of TypeScript as well as how you can get it up and running in a simple application. If you are looking for a more immersive introduction to TypeScript I suggest taking a look at the [TypeScript handbook](https://www.typescriptlang.org/docs/handbook/intro.html) created by the team that developed and maintains TypeScript.

![gif of coder](https://media1.giphy.com/media/L1R1tvI9svkIWwpVYr/giphy.gif?cid=ecf05e47je2cr5g7v75ju1i0adpe81hv1azoijsx0595f4an&rid=giphy.gif&ct=g)

## Defining types

When writing TypeScript you need to define types, in the below example we have defined a variable in vanilla JavaScript.

```js
let message;

message = "Hello World";
```

Since we are using a let, there could be any type assigned to the variable. And being that it is a let and not a const, we could potentially change our variable to a number without a care in the world.

```ts
let message: string;

message = "Hello World";
```

In the above example we have written the same expression, but this time we have scoped the message variable to be a type of string. We use a colon after the declaration to assign the type. If we were to try to redefine our variable with anything other than a string we would have an error thrown in our code editor. It is worth noting that TypeScript does not run in the browser, we need to convert it into vanilla JavaScript before our app can consume the code, more on how to do that later.

You may be wondering at this point, why bother? Isn't it just extra work? and the answer is yes. It is extra work, but in the same fashion as writing tests, it is extra work that will help you create stronger less erroneous code. Let's take another look at how typing can help prevent errors.

```js
const link = document.getElementById("my-button");
const url = link.href;
```

Let's say we have an anchor element saved to a variable, certain properties exist on an anchor that do not exist on other elements such as href or target. If we wanted to access those properties using something like `link.href`, JavaScript would not have any idea what kind of element our link variable is. It knows it is an `HTMLElement` since we are using `getElementById()` but not what kind. If we tried to run this code in TypeScript it would throw an error `Property 'href' does not exist on type 'HTMLElement'.`. How do we navigate this? You guessed right, add a type. This typing also helps in the event of a typo, if we instead wrote `link.herf` (which I've done many times) we wouldn't see any errors until we ran our code in the browser.

```ts
const link = document.getElementById("my-button") as HTMLAnchorElement;
const url = link.href;
```

Notice how we didn't type our variable but instead added `as HTMLAnchorElement` after our expression? This is because `getElementById` already has a return type of `HTMLElement`. If we tried to use the colon syntax, we would get an error because our variable is expecting an `HTMLAnchorElement` but it received what our expression returned which is a plain `HTMLElement`. by using `as` we can reassign the type that is returned.

## Creating interfaces

When working with objects in TypeScript we need to define an interface to declare what properties exist.

```ts
interface Person {
  kicks_ass: boolean;
}

const hunter: Person = {
  kicks_ass: true,
};
```

Since our object interface is defined, if we tried to add another property such as `favorite_food` TypeScript would throw an error because we are adding additional properties that don't exist on the interface. We can also extend the interface if we want to. By extending our interface we inherit the initial properties we set in our `Person` interface, plus these additional properties we are defining in the `Me` interface.

```ts
interface Me extends Person {
  name: string;
  age: number;
  favorite_food: string;
}

const hunter: Me = {
  kicks_ass: true,
  name: "Hunter",
  age: 26,
  favorite_food: "Taco Bell",
};
```

## Setting up TypeScript in your application

Because of how powerful TypeScript is, it is widely adopted and an option to use TypeScript might already exist in the framework or library you are using. Popular frameworks such as React, Next.js, and Vue support TypeScript with very little configuration and have options where you can generate a new app pre-configured with TypeScript by adding an argument to the generation script.

- React: `npx create-react-app my-app --template typescript`
- Next.js: `npx create-next-app my-app --typescript`
- Vue CLI: Select TypeScript when generating a new project

For this article, we are going to roll our own TypeScript app. Start by creating a new folder to hold our files in and create an index.ts file. `.ts` is the file extension for TypeScript files. Run the following command `npm init -y` to generate a package.json in your directory.

Once the package.json is set up we can install TypeScript in our app by running `npm i typescript --save-dev`. Since we can't run TypeScript in the browser we use `--save-dev` to notate that it is a development dependency. The last thing we need to do is add a script to our package.json to tell it to compile our Typescript code as we make changes to our document. Add the below to your package.json.

```json
"scripts": {
  "watch": "tsc index.ts --watch"
},
```

`tsc` is the command that tells TypeScript to compile our code into vanilla JavaScript, we specify the entry file and lastly use the `--watch` flag to tell it to listen for changes in the document.

This is all you need to get started with TypeScript in your application. You can also create a tsconfig.json file to import certain libraries such as adding es6 support and defining settings to enforce different type behavior. Below is a basic implementation that will allow you to use es6 syntax as well as provide DOM definitions. More libraries can be found in the [TypeScript lib documentation](https://www.typescriptlang.org/tsconfig#lib).

```json
{
  "compilerOptions": {
    "lib": ["es6", "dom"]
  }
}
```

## Conclusion

If you haven't already started using TypeScript there is no better time than now, it helps you write better code and in my opinion, it helps make you be a better developer as it forces you to be more aware of the different properties that exist in your code. I hope you enjoyed this article and learned something new.

Happy Coding!
