---
title: "Creating a contact form using Next.js and Supabase"
description: "Supabase is a fantastic open-source database provider that makes it easy to post data. In this article we will create a simple contact form in Next.js that posts messages to Supabase"
image: "/images/blog-cover/contact-form.jpg"
created_at: "06/24/2022"
tags: ["Next.js", "Supabase", "JavaScript"]
---

One thing I love about web development is technology that just works without a ton of configuration. Next.js and Supabase are both great examples of this. I recently [built out my blog with Next.js](https://huntertrammell.dev/blog/how-to-create-a-blog-using-markdown-and-nextjs) and had originally used Supabase as a backend but the text editor I built to author my posts wasn't the greatest authoring experience and if I'm being honest I just really like markdown. I was sad to leave all the work I had done with Supabase in an old commit but I just finished building out the contact form on my blog and was able to give Supabase another go. In this article, we will use Next.js to create an API that posts a form response to Supabase. We will also learn how to utilize the FormData API to gather our form values without needing to fuss with using state or refs on our inputs. Time to rock!

![Nick Cage points aggressively](https://media4.giphy.com/media/RrVzUOXldFe8M/giphy.gif?cid=ecf05e478zgioyp807qv00y7nabx4sp81819s3qgsrlifu14&rid=giphy.gif&ct=g)

## Setting up Supabase

[Supabase](https://supabase.com/docs/) is an open-source Postgres database that aims to be an alternative to Firebase. Having used Firebase in the past I can honestly say it is just as powerful and in my personal opinion more intuitive. Before we create our API routes we will create a quick table in our database and set up a client.

1. Log into Supabase and create a project. This can be done by clicking on "New Project" in the dashboard.
2. Open the table editor and create a new table, we will call this "messages"
3. Now we need to author our columns to reflect the fields in our form

![Screenshot of Supabase Table](https://huntertrammell.dev/images/blog-asset/supabase-columns.png)

Now that is created we can start integrating it with our app.

## Adding Supabase to Next.js

If you don't have an active Next.js project, create a new one by using the command `npx create-next-app supabase-contact`. This will generate a new Next.js instance for you to develop in. Once that is downloaded cd into the new project and install Supabase by running `npm i @supabase/supabase-js`.

Create a new folder called `utils` at the root of your project and inside of that directory create a file called `client.js`. Your client file will look like this:

```js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

Notice how we can initiate a connection to Supabase in only a few lines of code! We need to make sure we define our environment variables. Create a new file called `.env.local` and add the following:

```md
NEXT_PUBLIC_SUPABASE_URL=<YOUR API URL>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<YOUR ANON KEY>
```

You can find the Supabase url and key under settings/api in the Supabase dashboard.

## Creating our API route

Next.js allows you to create API routes with ease under the pages directory. Let's go ahead and create a new folder called `api` under the pages directory (it should already exist if you generated a new project). Since we want our message to post to a route called `api/contact` we need to create a file called `contact.js` inside of our api directory. We now can create a handler. We will start by importing Supabase, then check the `req.method` and confirm that it is indeed a POST request. If it is a post request we will extract the post body - no need to use `JSON.parse()` as Next.js does that automagically for us. Then we simply call Supabase, specify the table, and what data we want to insert.

```js
import { supabase } from "../../utils/client";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const body = req.body;

    const { data, error } = await supabase.from("messages").insert(body);

    if (!error) {
      res.status(200).json(data);
    } else {
      res.status(500).json(error);
    }
  }
}
```

## Creating the form

For this article I am going to pull in the form component I created for my website, there are quite a few classes on the form and they won't necessarily do anything unless you already have Tailwind CSS configured for your project. If you want to add it, check out their docs on [getting started with Next.js](https://tailwindcss.com/docs/guides/nextjs).

```jsx
export const ContactForm = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);

    const formData = {};

    for (let [key, value] of form) {
      formData[key] = value;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Hide your form
      } else {
        console.error(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      className="w-full max-w-3xl mx-auto px-0 lg:p-10"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-dark text-xs font-secondary mb-2"
            htmlFor="firstName"
          >
            First Name
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-dark border border-dark rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-primary"
            type="text"
            id="firstName"
            name="firstName"
            required
            placeholder="Jane"
          />
        </div>
        <div className="w-full md:w-1/2 px-3">
          <label
            className="block uppercase tracking-wide text-dark text-xs font-secondary mb-2"
            htmlFor="lastName"
          >
            Last Name
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-dark border border-dark rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-primary"
            type="text"
            id="lastName"
            name="lastName"
            required
            placeholder="Doe"
          />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label
            className="block uppercase tracking-wide text-dark text-xs font-secondary mb-2"
            htmlFor="email"
            placeholder="notspam@hotmail.ru"
          >
            E-mail
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-dark border border-dark rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-primary"
            id="email"
            type="email"
            name="email"
            required
            placeholder="notspam@hotmail.ru"
          />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label
            className="block uppercase tracking-wide text-dark text-xs font-secondary mb-2"
            htmlFor="message"
          >
            Message
          </label>
          <textarea
            name="message"
            required
            className=" no-resize appearance-none block w-full bg-gray-200 text-dark border border-dark rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-primary h-48 resize-none"
            id="message"
          ></textarea>
        </div>
      </div>
      <div className="md:flex md:items-center">
        <div className="md:w-1/3">
          <button type="submit">Submit</button>
        </div>
      </div>
    </form>
  );
};
```

That's a bit of code to digest so let's break it down. First off our inputs have the same name as our columns in Supabase, this is important as we don't need to map our values when creating our post request, we can simply just pass in the request body. We have a form submit handler that uses the FormData API to pull in the values then performs a post request.

```js
const handleSubmit = async (e) => {
  e.preventDefault();
  const form = new FormData(e.target);

  const formData = {};

  for (let [key, value] of form) {
    formData[key] = value;
  }
};
```

The [FormData API](https://developer.mozilla.org/en-US/docs/Web/API/FormData) pulls in the values using the name property as a key and assigns it the value of the input. This makes it really easy to grab your form values without needing to bind a ref or use state to access. All we need to do is pass the form, in this case the event target, into the FormData constructor. We then iterate over the new FormData object and assign it to an object using a key value pair. You can alternatively pass in the FormData object directly into the fetch call, but I prefer to extract it into an object first as if I decide to add in new inputs such as an input group I would need to add some additional logic to make those appear as an array.

```js
try {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (response.ok) {
    // Hide your form
  } else {
    console.error(response);
  }
} catch (error) {
  console.error(error);
}
```

The last thing we are doing in our submit handler is using a try catch to handle our fetch request. We can post directly to the `/api/contact` route we created after we parse our body into JSON.

## I challenge you!

Our form is created and we have a way to post to our API route which in turn will make a post to Supabase, but now we need a way to view that data on our website. Now that you have seen how Supabase handles insertions I challenge you to check out their [documentation](https://supabase.com/docs/reference/javascript/select) and see how you can pull in your messages onto a page for you to view. It might not be as challenging as you think 😊

Happy Coding!