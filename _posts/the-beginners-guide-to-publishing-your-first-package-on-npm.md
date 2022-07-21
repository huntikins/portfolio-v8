---
title: "The beginner's guide to publishing your first package on npm"
description: "Publishing a package to npm is easier than you think! In this article, we will take a look at how you can publish your first package to npm."
image: "/images/blog-cover/first-npm-package.jpg"
created_at: "07/21/2022"
tags: ["JavaScript", "TypeScript", "Node"]
---

I remember in the early days of Bootcamp, my instructor shared an npm package that he had created. I was awestruck and thought that must be something only the "big-time" developers can do. I've always wanted to create an npm package but never got around to it as I thought it was just too technical. As usual with things I put off because I _think_ they are too complex, it turned out to be pretty straightforward. Let's take a look at how we can create a simple npm package that provides us with a function that will return a string in SpongeBob case.

![SpongeBob doing chicken face](https://media4.giphy.com/media/SUnnfaSxhfLvf8H7XB/giphy.gif?cid=790b7611a3927063b405a87991db4c872547405d2130fff0&rid=giphy.gif&ct=g)

## Setting up our repository

Our code needs a place to live, before we publish to npm we need to create a place for us to store our code. Head on over to [GitHub](https://github.com) and create a new repository. Give it a title, I called mine `spongebobcase` but you are welcome to call it whatever, just note that this will be used as your package name later on. While creating, select the options to generate a readme, MIT license, and a .gitignore using the Node profile. Once complete grab the url from the top right corner of your repository and run `git clone <your url>` to pull your files down.

## Creating a package.json

Now the fun part, everything we are going to do will be driven by our package.json file. Everything we put in here from the name of our repository to the scripts we define will be used to determine the output and registry of our package on npm hence the name package.json. Before we generate a package.json, let's authenticate our npm accounts in the cli. If you haven't created an account on npm, navigate to [npmjs.org](https://www.npmjs.com/signup) and create a user account. Once your account has been created go ahead and log in by running `npm login` in your terminal and follow the prompts that appear.

To generate our package.json we just need to run `npm init --scope=@username -y` with `username` being your username. This will create the package with your username prepended to the package name. That's it for now, we will make a few more adjustments once we set up TypeScript in our project.

## Setting up the project

For this project, we will be using TypeScript and use the tsc command to output our vanilla JavaScript. The reason... well it's 2022 and there isn't a good reason not to 😅. To set up our project we will install TypeScript as a dependency by running `npm i --save-dev typescript` in our terminal. We will then create a tsconfig.json file that will tell our TypeScript compiler how to handle our code and what to do when we export it to vanilla JavaScript.

```json
{
  "compilerOptions": {
    "target": "es2016",
    "module": "commonjs",
    "outDir": "./lib",
    "declaration": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true
  }
}
```

The important part of this is the `outDir` option as it will tell TypeScript where to place our generated files. We will be placing our generated files in a lib folder, a common practice with npm modules. Let's go ahead and update our package.json to reflect our new TypeScript changes.

```json
{
  ...
  "main": "lib/index.js",
  "scripts": {
    "build": "tsc",
    "prepare": "npm run build"
  },
  ...
  "files": [
    "lib/**/*"
  ]
}
```

We have updated our main code entry point to reflect the new output directory that TypeScript will use. We also added the scripts for build and prepare, the prepare script will be executed when the npm package is installed and as such will build our project into the lib folder. And lastly, we have the files array. This will ensure that the only code we are serving in our package is the generated code in the lib folder and not the TypeScript files we are using for development.

> You should also update your .gitignore to include the /lib directory.

## Adding in our code

Let's create an index.ts file at the root of the project, this is where we will keep all of our code - there isn't much. Inside that file place the following code snippet:

```ts
export type TSpongebobCase = (str: string) => string;

export const spongebobCase: TSpongebobCase = (str) => {
  return str
    .split("")
    .map((letter, index) => {
      return index % 2 === 0 ? letter.toLowerCase() : letter.toUpperCase();
    })
    .join("");
};
```

Our function is simple, as you can infer from the type, it accepts a string and then returns a string - bUt iN SpOnGeBoB CaSe.

## Publishing our first package

Now that we have created our package, all that we need to do is run a simple command `npm publish --access public` and that will publish our directory to npm 🙌. Npm will use everything we have set up in our package.json to author our package to the platform.

### Implement a version change

Since our package has been published whenever we make a code change we can run `npm publish` to publish our changes to npm, but before we do that we need to manually update the version in our package.json file to notate that there has been a code change - or we can run `npm version <version type>` with the version type being major, minor, or patch. More information on when you should use each can be found [here](https://docs.npmjs.com/about-semantic-versioning).

![two people tapping boots with an overhead caption that reads, we did it!](https://media4.giphy.com/media/W2DqPx5CHFPMU6SYc6/giphy.gif?cid=ecf05e47yz8w5fr58qglenwk5f0fzbv2qqaezllkck7bzzxo&rid=giphy.gif&ct=g)

## Conclusion

Congratulations! You have successfully published a package to npm. You can also look into automating your releases by leveraging githooks and [Auto](https://www.npmjs.com/package/auto). I hope you enjoyed this article and learned something new.

Happy Coding!