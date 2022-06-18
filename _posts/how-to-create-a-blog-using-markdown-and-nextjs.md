---
title: "How to create a blog using Markdown and Next.js"
description: "I recently rebuilt my blog site using Next.js and Markdown, I learned a lot from this process and am really happy with the results. In this article I will show you what you can do to create your own blog using Next.js"
image: "/blog-tutorial.jpg"
created_at: "06/19/2022"
tags: ["Project", "Next.js", "Tutorial"]
---

I recently overhauled my portfolio site and built this blog using [Next.js](https://nextjs.org/) with Markdown for posts. I had originally built a full backend using [Supabase](https://supabase.com/) and had gotten everything working but it didn't quite fit the authoring experience I wanted. So I decided to remove the backend and replace it with a few functions to render markdown on the page. Overall I am fairly pleased with this project and am excited to show how you can build your own. I will also show how you can add some SEO to your posts!

!["Let's Rock and Roll"](https://media2.giphy.com/media/6cyUfrl0rXz3etJ0NJ/giphy.gif?cid=ecf05e479oqu57j5iopcoygj95cfrn1h8lzouyp2vb1cn1hs&rid=giphy.gif&ct=g)

## Getting started

The first thing we need to do is generate a new project, if you already have one generated you should be able to just add this in without issue. If you are using Next.js for the first time, I suggest you check out this article I wrote on [some of the core features behind Next.js](https://huntertrammell.dev/blog/building-production-apps-with-nextjs) that make it so wonderful.

```bash
npx create-next-app your-project-name
```

Once your project is generated we will need to install a few dependencies, cd into your project and run the following command:

```bash
npm i gray-matter remark remark-html remark-prism
```

Once that installs you can start your development server by running `npm run dev`. That is all we need to do to get started!

## Getting the blog post content

Now that we have our project generated we need to create a folder called `utils` to store the logic that we will use to handle retrieving our posts and rendering the markdown. We also need to create a folder called `_posts` to store our blog posts. Before we dive into rendering the markdown, let's create a folder called `templates` and a file called `new-post.md` inside. We can use this as a template when creating new blog posts:

```json
---
title: ""
description: ""
image: ""
imageAlt: ""
created_at: ""
---

Hello World
```

### Get all posts

In order to retrieve our posts, we need to look through the `_posts` directory and grab the metadata from each file including the filename which will be used as the slug. We can use the `gray-matter` package to read our markdown files and separate the metadata from the content. In your `utils` folder create a new file called `post.js`, below is the code we will need to place in that file:

```js
import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

const postsDirectory = join(process.cwd(), "_posts");

// Get individual blog post data
export function getPostBySlug(slug, fields[] = []) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const items = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = realSlug;
    }
    if (field === "content") {
      items[field] = content;
    }

    if (typeof data[field] !== "undefined") {
      items[field] = data[field];
    }
  });

  return items;
}
```

We will use the `getPostsBySlug()` method to populate our blog page with data using the route parameter to determine what post to pull from. With the inclusion of this function, we now need a way to grab every post. We can achieve this by looping over an array of posts and calling this function each time, see the additional code for `post.js` below:

```js
// Get array of posts
export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

// Get all posts and sort by date
export function getAllPosts(fields: string[] = []) {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => {
      const post1_date = new Date(post1.created_at);
      const post2_date = new Date(post2.created_at);

      return (post2_date as any) - (post1_date as any);
    });

  return posts;
}
```

### Render the markdown

We have a way to get our data from the markdown files, but we need to be able to convert markdown into HTML for the browser. Go ahead and create a new file called `markdown.js` in the `utils` directory. We will be using [Remark](https://github.com/remarkjs/remark) to handle the conversion. Inside your `markdown.js` file place the following code:

```js
import { remark } from "remark";
import html from "remark-html";
import prism from "remark-prism";

export default async function markdownToHTML(markdown) {
  const result = await remark()
    .use(html, { sanitize: false })
    .use(prism)
    .process(markdown);
  return result.toString();
}
```

This will accept a string that contains the markdown from our document and remark will convert it to HTML. Note that we have `.use(prism)` chained in our remark statement. This will help provide syntax highlighting for your posts, if you do not want to have any highlighting, feel free to remove it!

## Building the blog post template

The heavy lifting is done and we can now retrieve the data from our markdown files, it is now time to render our content! To do this we will use the `getStaticProps` method provided by Next.js to pull in the data and pass it into our component as a prop. We will use the `markdownToHTML()` method to parse our markdown using the content that is retrieved by `getPostBySlug()`. We need to create a new directory in the `pages` folder called `blog` and inside of that directory a new file named `[slug].js`, the bracket is important as the name will be dynamically generated based on the slug.

Our `[slug].js` file should look like this:

```jsx
import Image from "next/image";
import { getAllPosts, getPostBySlug } from "../../utils/post";
import markdownToHtml from "../../utils/markdownToHTML";
import { Params } from "next/dist/server/router";
// Adds prism styling into blog post
import "prismjs/themes/prism-tomorrow.css";

const BlogPost = ({ post }) => {
  return (
    <>
      <h1>{post.title}</h1>

      <Image
        src={post.image}
        layout="responsive"
        alt={post.imageAlt}
        width={1024}
        height={768}
      />

      <div
        className="post-content"
        dangerouslySetInnerHTML={{ __html: post.content }}
      ></div>
    </>
  );
};

export default BlogPost;

// Get this posts data
export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug, [
    "title",
    "created_at",
    "slug",
    "description",
    "content",
    "image",
    "imageAlt",
  ]);

  // Convert markown to HTML
  const content = await markdownToHtml(post.content || "");

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
}

// this is required when using a dynamic page name
export async function getStaticPaths() {
  const posts = getAllPosts(["slug"]);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}
```

Now if we create a file called `hello-world.md` and place it into our `_posts` directory using the template we created earlier if we navigate to `localhost:3000/blog/hello-world` we should see our content!

## Adding SEO to our project

Our blog is now converting markdown files into pages our site visitors can consume, but how good is that if our readers can't find our content? SEO is an important part of blogging and luckily Next.js has a way we can easily add metadata to our page! we will add the following import to our `[slug].js` file as well as some additional jsx at the top of our return statement:

```jsx
import Head from "next/head"
...

const BlogPost = ({ post }) => {
  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="title" content={post.title} />
        <meta name="description" content={post.description} />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`YOUR_DOMAIN/blog/${post.slug}`}
        />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        <meta property="og:image" content={`YOUR_DOMAIN/blog${post.image}`} />
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content={`YOUR_DOMAIN/blog/${post.slug}`}
        />
        <meta property="twitter:title" content={post.title} />
        <meta property="twitter:description" content={post.description} />
        <meta property="twitter:image" content={`YOUR_DOMAIN/blog${post.image}`} />
      </Head>
     ...
```

### Generating a sitemap for your blog

Our metadata is set so we have a pretty picture when we share our posts on social networks but how do we optimize for search engines? By creating a sitemap we can give search engines a map of our site that they can use to index our pages. Generating one is pretty straightforward and only requires a little bit of code. In the `pages` directory, create a new file called `sitemap.xml.js` and place the following content inside:

```jsx
import * as fs from "fs";
import { getAllPosts } from "../utils/post";

const Sitemap = () => {};

export const getServerSideProps = async ({ res }) => {
  const BASE_URL = "YOUR_DOMAIN";
  const BASE_DIR = process.env.NODE_ENV === "production" ? "./" : "pages";

  const staticPaths = fs
    .readdirSync(BASE_DIR)
    .filter((staticPage) => {
      return ![
        "api",
        "_app.js",
        "_document.js",
        "sitemap.xml.js",
        "index.js",
      ].includes(staticPage);
    })
    .map((staticPagePath) => {
      return `${BASE_URL}/${staticPagePath}`;
    });

  const posts = getAllPosts(["slug"]);

  const dynamicPaths = posts.map((post) => {
    return `${BASE_URL}/blog/${post.slug}`;
  });

  const allPaths = [`${BASE_URL}/`, ...staticPaths, ...dynamicPaths];

  const sitemap = `
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${allPaths
        .map((url) => {
          return `
            <url>
              <loc>${url}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>1.0</priority>
            </url>
          `;
        })
        .join("")}
    </urlset>
  `;

  // since the sitemap is XML we need to set the response to deliver the content
  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;
```

If you navigate to `localhost:3000/sitemap.xml` you should see an xml document containing all of your blog posts and pages ready for [google search console](https://search.google.com/search-console/about)!

## Conclusion

Next.js is jam-packed with powerful features that make it a great framework to choose when building a blog. That combined with a little SEO love and you should be able to show off all your hard work! Thank you so much for reading, I hope you were able to follow along and add blog functionality to your project!

Happy Coding!
