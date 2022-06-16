---
title: "Getting Started With Serverless Functions on Netlify"
description: "Have you ever listened to a new song and it was the only thing that played in your head for days on end? Well, get ready because Netlify Serverless..."
image: "/netlify-cloud.jpg"
created_at: "07/29/2021"
tags: ["Netlify", "JavaScript", "API"]
canonical: "https://blog.huntertrammell.dev/getting-started-with-serverless-functions-on-netlify"
---

Have you ever listened to a new song and it was the only thing that played in your head for days on end? Well, get ready because [Netlify Serverless Functions](https://docs.netlify.com/functions/overview/) are going to be executing in your brain rent-free for the foreseeable future. They 👏 Are 👏 So  👏 Dope! 

## What is a serverless function?

A serverless function is a chunk of code that can be executed on demand and does not require a server to be running 24/7. This is helpful as it helps you scale your application since you are only utilizing the computing processes that your application needs versus a fixed amount you would get with a traditional server installation. 

Running serverless functions is especially helpful for - you guessed it - serverless websites or sites that use a headless approach. Since these functions are only executed on demand and don't have a persisted state they can be useful as a bridge between API's or even passing some of the heavier computed tasks that your application might rely on so that your client is only using the data it needs to run your application.


## How much configuration are we talking about?

If there is one thing Netlify excels at (and let's be honest they excel at everything) it is their intuitive UI. I remember when I first discovered Netlify and was completely blown away by how things just worked. Granted that is an application-specific statement, but for someone who previously had always seemed to run into trouble deploying their React/Vue apps for it to work on the first try was pure magic. Netlify Serverless Functions are no exception. Let's build a simple function that interfaces with the [Rick & Morty API](https://rickandmortyapi.com/) and returns a subset of data to our application for our users to view based on a search query.


## Build and deploy a serverless function

Before we begin, let's go ahead and install  [Netlify CLI](https://docs.netlify.com/cli/get-started/).

```js
/* Install Netlify CLI */
npm install netlify-cli -g

/* Check if installed */
netlify -v
``` 

Once the installation is completed, go ahead and  [create an empty project using this repo](https://github.com/huntertrammell/serverless-functions-demo) as a template. Our app starts with a simple search form. Once the form is submitted we record the value and log it to the console. We also have a div ready to hold our search results.

```html
    <!-- Let's search -->
    <form id="searchForm">
        <label for="query">Search</label>
        <input type="text" id="query">
        <input type="submit" value="Submit"/>
    </form>
    <div id="results">
        <!-- Results will display here -->
    </div>
    <script>
        // Wait for the page to load
        document.addEventListener('DOMContentLoaded', () => {
            // Register elements
            const form = document.getElementById('searchForm');
            const displayDiv = document.getElementById('results');
            const query = document.getElementById('query')
            // On submit record value and output to the console
            form.addEventListener('submit', e => {
                e.preventDefault();
                // Grab search query
                let search = query.value.trim();
                console.log('search')
            })
        })
    </script>
``` 

Now we get to the fun part 😊! There are several ways to initiate a project with Netlify, but since we already installed Netlify CLI, we are going to take advantage of that. In your projects directory, go ahead and run the following command. This will set the project up to be deployed on Netlify and also give us access to a local dev server that we can use to test out our functions before pushing them live.

```bash
netlify init
``` 

This command will open up a tab for you to log into netlify to connect your account. After you sign in, click Authorize and return to the app. You should now see a set of prompts to initialize the application. 

1. *Create & configure a new site*
2. Select your team
3. Choose a nickname for the project

Once these steps are completed you will need to authorize your GitHub account. Go ahead and follow the steps and return to the prompt after GitHub has been connected and you are prompted to head back to the CLI

1. Leave the build command blank, we don't need this here
2. Directory can be blank since we are serving the HTML page at the root of our project
3. Netlify functions folder: netlify/functions
4. Type Y as we want the netlify.toml file to communicate our settings to Netlify to make deployments pain free

Finally, our CLI steps are complete and we are ready to begin creating our first serverless function! As we notated in the CLI prompts our functions will be placed inside of the directory ```netlify/functions```. Go ahead and create these folders and create a new file titled ```rick_and_morty.js``` that will contain our serverless functions.

*Note that Netlify will automatically add a hidden folder to your project after the init is finished called ```.netlify```, the folder you are creating needs to be completely separate. This is just for your local dev server*

Inside the ```rick_and_morty.js``` file we will need to set up a few things that are required for this to work properly. 

```js
// Our serverless functions are exported via this handler
// the event parameter will hold our query data
exports.handler = async function(event){

    // This is what is returned to our client
    return {
        statusCode: 200,
        body: JSON.stringify({
            // our data
        })
    }
}
```

This is the basic structure that we need to get the function to return our data when fetched. If you are familiar with HTTP requests, the status code and body should look pretty familiar, but that is just the format we need to put things into so we can get the data from point A to point B. The status code tells our client that the request was successful and the body contains our data.

Now that we have our function scaffolded, let's fetch data from our API. Before we do that we need to run ```npm init -y``` then ``` npm i node-fetch``` in our terminal as ```fetch``` is a client function and Netlify uses a Node server to run these scripts.

```js
const fetch = require('node-fetch')
// Our serverless functions are exported via this handler
// the event parameter will hold our query data
exports.handler = async function(event){
    // Get value of search parameter from the event
    const {query} = JSON.parse(event.body)
    // Build our query URL
    const URL = `https://rickandmortyapi.com/api/character/?name=${query}`
    
    // Fetch our data
    const response = await fetch(URL)
    const data = await response.json()
    
    console.log(data)
    // This is what is returned to our client
    return {
        statusCode: 200,
        // By setting the data to data.results, we eliminate the need for our client app to do this
        body: JSON.stringify({
            data: data.results
        })
    }
}
``` 

Because we are acting as a bridge between the client and the API, we can simplify the data so that we are only pulling in what we need. If we only needed a few properties from our response object, we could create our own custom object and map those values so that our client data is minified.

Now on the front end, all we need to do is hit that API endpoint ```/.netlify/functions/rick_and_morty``` so that we can render the data.

```html
    <!-- Let's search -->
    <form id="searchForm">
        <label for="query">Search</label>
        <input type="text" id="query">
        <input type="submit" value="Submit"/>
    </form>
    <div id="results">
        <!-- Results will display here -->
    </div>
    <script>
        // Wait for the page to load
        document.addEventListener('DOMContentLoaded', () => {
            // Register elements
            const form = document.getElementById('searchForm');
            const displayDiv = document.getElementById('results');
            const query = document.getElementById('query')
            // On submit record value and output to the console
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                // Grab search query
                let search = query.value.trim();
                // Fetch API data
                const {data} = await fetch('/.netlify/functions/rick_and_morty',{
                    // This is how we send data to our export.handler function
                    method: 'POST',
                    body: JSON.stringify({
                        query: search
                    })
                }).then(res => res.json())
                
                // Map through our API response and append to our display div
                let results = data.map(result => {
                    let p = document.createElement('p');
                    p.textContent = `${result.name} - ${result.species}`;
                    return p
                })
                displayDiv.append(...results)

            })
        })
    </script>
```

After searching you should see the search results appended to the display div. Now, we pulled in more data than we needed and the styling/functionality could use some work, but the point of this article is more geared towards getting you comfortable with using serverless functions on Netlify. 

## Conclusion

That's it! After you push your repo to GitHub your serverless function will deploy on Netlify and you will be able to access the serverless function in production! If you enjoyed this and want more, why not challenge yourself and see how you can filter the API response before sending it to the client or even add some fun styles to the website 🚀

Here are a few great resources that you can utilize to learn more about how to implement these functions in your apps:

-  [Netlify Docs](https://docs.netlify.com/functions/overview/) 
-  [JAMStack Explorers](https://explorers.netlify.com/missions) 
-  [Netlify Functions for an Unrivaled Serverless Workflow](https://www.netlify.com/blog/2021/02/18/netlify-functions-for-an-unrivaled-serverless-workflow/) 

---

- [Completed Repo](https://github.com/huntertrammell/serverless-functions-demo/tree/final_app)
- [Live Demo](https://serene-booth-22b996.netlify.app/)
- [Support Rick & Morty API ❤](https://rickandmortyapi.com/help-us)

If you enjoyed this article or have any questions feel free to reach out on Twitter [@trammellwebdev](https://twitter.com/trammellwebdev) or in the comments below!

Cheers 🍻