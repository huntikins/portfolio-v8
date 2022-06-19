---
title: "The Beginners Guide to Building Production-ready Apps with Next.js"
description: "The What, How, and Why of Next.js · Over the last week, I have been a happy citizen in the wonderful world of Next.js. I have always defaulted to Vue.js..."
image: "/images/blog-cover/intro-to-nextjs.jpg"
created_at: "08/21/2021"
tags: ["Next.js"]
canonical: "https://blog.huntertrammell.dev/the-beginners-guide-to-building-production-ready-apps-with-nextjs-part-one-the-what-how-and-why-of-nextjs"
---

Over the last week, I have been a happy citizen in the wonderful world of [Next.js](https://nextjs.org/). I have always defaulted to Vue.js when building applications. React is great but I never really identified with it in the same way as Vue. My goodness was I mistaken, learning how to use Next.js made me seriously evaluate my current framework preferences. I recently needed to dive into Next.js to complete a project and this requirement as a result forced me to discover my new favorite framework. Honestly as glad as I am to have spent this time with Next.js, I have a feeling a new portfolio site is in my future 😅. It's that much fun!

## What is Next.js?

Next.js is a React framework that provides several utilities and optimizations so that you can build your project in a production-ready environment. One enhancement that Next.js provides is its file-based routing system. When building a standard React app you may run into issues with scalability when it comes to large websites - for example, when building a SPA you will need to import the React Router library, your page might look something like this: 

```jsx
<Switch>
  <Route exact path="/">
    <!--Homepage-->
  </Route>
  <Route path="/about">
    <!--About-->
  </Route>
  ...
</Switch>
```

As your application grows, that switch statement is going to have more children than Chuck's on free arcade night. Imagine having a site with 100's of pages, eventually, the structure and modular design that brought you to use a JavaScript framework might be undermined by large and potentially hard-to-maintain files. 

![American entertainer and pizza kingpin Chuck E. Cheese giving a half wink and a nose-flick to finger point](https://media.giphy.com/media/qVTwEFNbRtUKQ/giphy.gif?cid=ecf05e47eriq1w0swi0lfgv2kze3yc7jerlfnvb6arrp6aov&rid=giphy.gif&ct=g)

There is a lot more to Next.js than just routing, but its overall scalability is, in my opinion, a solid choice when comparing it with standard React routing. Next.js offers a production-ready solution to routing and several other optimizations that will allow you to build an app with little to no configuration and you are left to focus on building a product in a pre-configured development environment. To better understand *what it is*, let's take a look at *how it works* and *what it can do*.

## How does Next.js work?

By leveraging Node.js, we can generate static files for serving via a CDN or by keeping our server environment running to handle the server-side generation of files and data via an integrated API. There are many ways to build an app with Next.js so depending on what method you choose to build your app, that will determine Next.js' exact role.

## Key features

As noted earlier, Next.js comes with several pre-configured optimizations to help you scale production-ready applications quickly. Let's take a look at some of the powerful features Next.js brings to the table.

### React

As you would expect, Next.js apps are built with React! If you want to use a React-specific utility such as Fragments or Portals, you would just import them as you would when building a standard React application.

 ```js 
import {Fragment} 'react' 
import ReactDOM from 'react-dom'
```

With Next.js you are still building a React application - you just have a ton of performance and architectural optimizations straight out of the gate.

### Routing

Next.js provides an alternate way of handling page route definitions. Next.js utilizes file-based routing, meaning that all files placed in the ``` pages ``` directory will be automatically evaluated as a route based on their filename/path. Folders would be treated as nested routes, using the name of the folder for the URL parameter and index.js as the default file if the route directly matches the parameter. Dynamic content can also be rendered using ``` [ square-brackets ] ``` to help fetch and display dynamic content.

```
/pages <-- Next.js base directory for all pages, uses index.js as the default file
  about.js <-- /about
  /blog <-- Folders allow for nested routes, using index.js as the default file
    archive.js <- /blog/archive
    index.js <- /blog
    [slug].js <- /blog/10-programming-tips-senior-developers-dont-want-you-to-know
  contact.js <- /contact
  index.js <-- /
```

As with React Router, Next.js also comes with components and functions to assist with prefetching, rendering, and page routing.

### Rendering/Generating Files

When it comes to rendering, Next.js comes with several options that allow you the freedom to choose the best possible method for your data - and what is even better is that you don't need to choose only one method! If your homepage does not contain a lot of dynamic data, you might want to have it pre-rendered into static HTML at build time, while your product page may benefit from being rendered on request so that the client has the most up to date information (at the time of loading). Let's take a look at some of the methods available:

#### Static Generation

[Static generation](https://nextjs.org/docs/basic-features/pages#static-generation-recommended) involves building out static (no action required by the browser to render) HTML files when you run the build command. These files can then be served without needing to perform any server-side code. Since data is pre-rendered into the HTML file your assets can be cached and delivered much faster than dynamic files built when requested by the client. When using React or other SPA's you often will run into issues with SEO as the page is built in the client's web browser. When SEO-crawlers look at these apps, they will most often just find an empty page with no data. By statically rendering your site's HTML files *before* your end-user receives them, you get the SEO benefits of pre-rendered content with the power of using React. Using the ``` getStaticProps() ``` function in your page file, you can specify what data to load into your application during build time. You are then able to return an object you can pass directly into your page function as a prop.

```jsx
function Home(props){
  
  const {data} = props
  
  return (
    <section>
      <h1>API Fun!</h1>
      <ul>
        {data.map(item => <li key={item.id}>{item.title}</li>)}
      </ul>
    </section>
  )
}

export async function getStaticProps() {
  
  const response = await fetch('YOUR API ROUTE')
  const data = await res.json()
  
  return {
    props: {
      data
    },
  }
}

export default Home
```

*Note that when using this with a dynamic file route you will need to add a second function ```getStaticPaths()``` to assist with path generation. More information on this function can be found in [Next.js docs](https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation)!*

#### Server-side Rendering

Unlike static generation, where files are built and stored during the build process and all users share 1 version of a file, [Server-side Rendering](https://nextjs.org/docs/basic-features/pages#server-side-rendering) happens during a page request. When a user visits a server-side rendered page, the server builds that page and then returns it to the client. This happens for each request, pages are created specifically for the client that requested. Proper SEO will still be achievable as the HTML is still being generated before the client receives any files. Getting started with server-side rendering is fairly similar to static file generation, just call ```getServerSideProps()``` in your page file and you will be able to access the data that is fetched via props. Server-side generation is best suited for pages that have dynamic content or information that would need to be current at the time of loading. Check out the [Next.js docs](https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering) for more information on how you can utilize ```getServerSideProps()``` to render your pages.

#### Incremental Static Regeneration

Generating static files is the preferred method as it allows users to interact with your site quicker while achieving better SEO, it still requires the entire site to be rebuilt every time data changes. This is where Incremental Static Regeneration and Client-side rendering come in. By inserting the ``` revalidate ``` property into the object that is returned using our ```getStaticProps()``` function, we essentially give our rendered files and expiration date. If a user requests a file that is older than the time allocated with ```revalidate```, Next.js will rebuild that asset. 

```js
return {
  props: {
    fetchedData
  },
  revalidate: 1800 // 30 minutes
}
```

It is important to note that once the rebuild is triggered, the regenerated asset will only be served *after* the build is complete. The client will need to manually refresh once the new asset is available to get the latest version of the site. For more information on Incremental Static Regeneration and methods for implementing, more information can be found in the [Next.js docs](https://vercel.com/docs/next.js/incremental-static-regeneration)

#### Client Side Rendering

When dealing with pages that handle user-specific data or a page that does not need to consider SEO, data can be fetched on the client-side using standard React hooks or [SWR](https://swr.vercel.app/) - a React hook built by the Next.js team that provides a really solid and comprehensive way of fetching and persisting data from the client. 

#### Link

As with React Router, we have a similar ```<Link />``` component available for use to handle internal page routing and prefetching. There are several attributes you can add to the Link component to achieve the functionality you are looking for. When passing a path to the component, you can include the full path as a string or pass an object that contains the properties of the URL to be built by Next.js. More information on this component and how to use it is available as always via the [Next.js docs](https://nextjs.org/docs/api-reference/next/link).

```jsx
<ul>
  <li>
    <Link href="/">
      <a>Home</a>
    </Link>
  </li>
  <li>
    <Link
      href={{
        pathname: '/blog/[year]/[slug]',
        query: { 
          year: '2021',
          slug: 'my-post'
        },
      }}>
        <a>Blog</a>
    </Link>
  </li>
</ul>
```

#### Image

Images are important as they can be an essential aspect of the overall design. However, when used without any optimizations they can easily become a fault point, slowing down your site. Imagine running through a build, meticulously planning how you are going to render your pages only to have your performance cut short by large or oversized images. When you utilize the ```<Image />``` component, your images are optimized during the build process and served alongside your static files. File paths are source agnostic, so regardless of if the image originates on your local install or from a URL, all images will be optimized and configured based on the parameters set in the component.  If you are interested in asset optimization I highly recommend checking out the [Next.js Image docs](https://nextjs.org/docs/basic-features/image-optimization) as there are a ton of properties available to give you top-notch images and asset delivery. 

#### Head

Metadata is essential to achieving a good SEO ranking for your site. Using the ```<Head />``` component as a wrapper for your meta tags, you can easily add dynamic data into your site's ```head```. Since you may want to have certain data that is set globally, default data, or page-specific data Next.js will automatically merge your tags and for any data that might be duplicated, it will default to the lowest instance (i.e. page meta would override global app meta). See the [Next.js docs](https://nextjs.org/docs/api-reference/next/head) for additional information on configuring your sites ```<Head />``` component.

### FullStack Friendly

Another feature worth noting in Next.js is its ability to handle [serving API endpoints from your project](https://nextjs.org/docs/api-routes/introduction). Getting started with an API is pretty straightforward, you need to create an ```api``` folder in your pages directory then define the routes of the API just as you would when defining new pages. Since Next.js runs on Node, you can interface with databases securely without delivering server-specific files to the client. One caveat to the API system in Next.js is that if you are only serving static files - meaning that you are just deploying the build folder rather than keeping your server running, your API will not work as it requires a live server to handle requests. 

### Deployment

If it didn't have enough great things about it already, the team that built and maintains Next.js also built a hosting platform called [Vercel](https://vercel.com/solutions/nextjs). Apps can easily be deployed to Vercel with minimal configuration. You can of course also deploy to other platforms such as [Netlify](https://www.netlify.com/) and [Heroku](https://www.heroku.com/).

## Why you should consider Next.js

Next.js comes with a whole suite of features and optimizations that help you build production-ready apps. The different methods available give you a lot of freedom to define how you want your app to function. The ability to seamlessly build a full-stack application helps bridge the divide between front-end and back-end into a single optimized codebase. There is a good reason large web apps like [Twitch and Hulu are built with Next.js](https://nextjs.org/showcase). If you haven't gotten around to using Next.js I hope this article has helped you reconsider.

## Conclusion

My experience developing with Next.js has been overwhelmingly positive. Now that you have seen all the wonderful things Next.js brings to the table, I think it's time to build. In the next entries in this series, we will explore the many amazing features Next.js has to offer by building a real application. If you are as excited about Next.js as I was after learning what it could do, you should 100% play around with it before starting the next part in this series. There is so much more that I didn't cover, again I am going to link to the [Next.js docs](https://nextjs.org/docs/getting-started) so that you can give them a read (notice a trend here?). 

—-

If you found this article interesting I would love to hear from you in the comments or feel free to reach out on [Twitter](https://twitter.com/trammellwebdev), my DM's are always open! I will update this post as new sections are released so be sure to follow me on [Hashnode](https://blog.huntertrammell.dev/) to stay up to date with my latest posts.

Cheers 🍻