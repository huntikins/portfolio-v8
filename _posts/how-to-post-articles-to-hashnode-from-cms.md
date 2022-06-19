---
title: "How To Post Articles From Your Existing CMS Using The Hashnode API"
description: "About a month ago I decided to migrate my existing blog over to Hashnode. I was hosting my blog on my portfolio site but hadn't felt like I was moving..."
image: "/images/blog-cover/hashnode.jpg"
created_at: "08/06/2021"
tags: ["API", "JavaScript", "API"]
canonical: "https://blog.huntertrammell.dev/how-to-post-articles-from-your-existing-cms-using-the-hashnode-api"
---

About a month ago I decided to migrate my existing blog over to Hashnode. I was hosting my blog on my portfolio site but hadn't felt like I was moving in the right direction. I knew relying solely on search engines to connect readers with my content was a long SEO-fueled process, but I had a gut feeling it wasn't working - or at least I wasn't spending huge chunks of time optimizing my content for discoverability. I was hesitant to migrate at first as I felt like I was obligated to stay with my current portfolio considering I had put in the hours to get it up and running and I didn't want to feel like my blog was an afterthought.  I was putting some finishing touches on a set of updates to my portfolio and decided that now would be the best time to do it so since I was ready to call my portfolio complete*-ish*. The word *migration* can be triggering for many developers. At least in my experience, I haven't been fond of any system migration in the past. However, it was pretty painless and a lot less technical effort than I was envisioning. So I made the jump and moved my blog from my website - but what about the lonely Strapi backend I've left spun down on a Heroku server I used to use for blogging?

![Detective Pikachu, caption reads: I'm so lonely](https://media.giphy.com/media/fR4xLFaHS6hAfLDGYa/giphy.gif)

I have been interested in testing out Hashnode's API and this got me thinking, what is stopping me from publishing my articles from my existing CMS? Hashnode's UI is fantastic, no complaints here, but let's be honest one of the greatest things about being a developer is the ability to write integrations so things work the way you want them to. My use case isn't particularly necessary and still needs some work, but it was a lot of fun to play around with the Hashnode API and I learned a lot about some of the available Hooks in Strapi. While I am using Strapi as an example, the code used can be translated into whatever CMS you are using.

## Let's setup Strapi before we start

I am not going to spend too much time on this section outside of what is needed to get up and running. If you run into any issues or would like to get additional information about setting up a new Strapi project, check out their documentation.

To start, let's go ahead and install Strapi

```npx create-strapi-app hashnode-CMS --quickstart```

Once that finishes installing and you serve the application using the prompts in the CLI, a window should launch with a simple admin user registration form. Go ahead and complete, this will be your login should you need to get back into the application. 

After you hit the dashboard, click the button that says "Create your first content type". Let's give our new content type a name of Article and add 2 fields to start. Traditionally, we would want to create a field that responds to each of the ```createPublicationStory``` arguments available in the API (more on this later) but for the sake of this post, we are just going to create a field for Title and Article.


![Screen Shot of content types UI in Strapi](https://cdn.hashnode.com/res/hashnode/image/upload/v1628228622019/XgGDWd2ye.png)

Title can be a simple text field, while Article should be a Rich text field - this will give us Markdown support. One of the things I find cool about Strapi is that after creating a new content type, the data that defines that structure is generated into physical files, meaning you don't need to implement all changes to the content type directly using the UI. This also allows us to tap into the various lifecycle hooks provided by Strapi to execute a task. 

![Dr.Phil having his mind blown by Strapi life cycle hooks](https://media.giphy.com/media/l0IypeKl9NJhPFMrK/giphy.gif)

## Setting up our Life Cycle hooks

If you look at your Strapi project inside the ```api``` directory you should see a new folder directory called ```articles```. This directory contains the files that directly relate to your new content type. 


![Strapi file structure in VS Code](https://cdn.hashnode.com/res/hashnode/image/upload/v1628228717388/EKiD1E8sv.png)

We want to open up the ```models``` directory and modify the ```articles.js``` file within. This is where we can access the lifecycle hooks, and eventually where we will make our API call. 

Inside of the ```articles.js``` file let's go ahead and test it out to see what sort of data we are working with. 

```js
module.exports = {
    lifecycles: {
        async afterCreate(data) {
            console.log(data)
        }
    }
}
```

Open your Strapi admin and let's create a post. 


![Screen shot of content authoring screen](https://cdn.hashnode.com/res/hashnode/image/upload/v1628228760420/U0Emw1d8Q.png)

Once you create the post, you should see the data contained within that post inside of the console. *Note that since the functions in our ```articles.js``` file are running on Node and not in the browser, our data will be written to the console where Strapi is running, you won't see anything when inspecting the browser.*


![Screen Shot of console data logging out the post data](https://cdn.hashnode.com/res/hashnode/image/upload/v1628228791760/HY4JfXPAk.png)

## Accessing the Hashnode API

When we create a new Article, the ```afterCreate``` lifecycle hook runs and executes whatever is inside. This is a good place to go ahead and place our API call. Before we do that I want to take a look at the Hashnode API for a moment. Since their API is built on GraphQL, we have access to several predefined queries and mutations that we can use within our app, but if you haven't used GraphQL before, the syntax is a little different.


![Screen Shot of Hashnode API playground](https://cdn.hashnode.com/res/hashnode/image/upload/v1628228832194/YOg33wGbA.png)

By clicking the ```docs``` tab on the right side of the playground we can see what data is expected and will be returned by the API. The mutation we will be using is ```createPublicationStory``` as mentioned earlier, there is another similar mutation called ```createStory``` that achieves a similar functionality with the exception that this posts to a blog publication instead of your profile.

We do need to include some tags in our post so we will go ahead and hardcode them for now. We can get a list of tags and their respective metadata using the API by running a simple query. You can paste the following code directly into the API playground to see how the data is returned.

```js
{
    tagCategories {
        _id
        name
    }
}
```

Lastly, we need to get the publication id and generate a personal access token. 

To get your publication ID, navigate to your blog's dashboard and grab it from the URL.

```https://hashnode.com/PUBLICATION_ID/dashboard/```

To generate a new personal access token, open your account settings and select the Developer tab to create a new key.

## Time to post our data to Hashnode

From here we have enough data to build our full API call. We have accessed the lifecycle hook inside of our ```articles.js``` file and determined what query we will need to post our article directly to Hashnode. Here is what that call might look like:
<script src="https://gist.github.com/huntertrammell/33c7f135f86330da065e758300f780f1.js"></script>

Note that we are importing node-fetch since this code is being executed in a node environment and not the browser. We are then tying the data entered into our form directly into the GraphQL query using variables. You can set the value of ```hideFromHashnodeFeed``` to ```true``` if you want to test without worrying about seeing your test article showing up in your newsfeed. 

## Conclusion

That's it! With API's you have the power to develop integrations that match your workflow. Hashnode's publishing features are miles above what I have in this tutorial, but by utilizing their API the possibilities are endless for what you can create. I will be pulling my articles directly from the API to post previews on my portfolio so that I don't need to manually update my site whenever I add a new post (I'm about 3 posts behind 😅). I'm not the first to do this nor the last, but I hope that you found this article helpful!

- [Hashnode API](https://api.hashnode.com/)
- [Strapi](https://strapi.io/)
- [Delorean Ipsum](https://satoristudio.net/delorean-ipsum/)
- [Windows XP VSCode Theme](https://marketplace.visualstudio.com/items?itemName=sinedied.vscode-windows-xp-theme&WT.mc_id=javascript-36167-yolasors)

If you enjoyed this article or have any questions feel free to reach out on Twitter [@trammellwebdev](https://twitter.com/trammellwebdev) or in the comments below!