---
title: "A Brief Introduction To Web Components"
description: "A few years ago I attended a local Drupal meetup and there was a guest speaker who gave a presentation about Web Components. I had..."
image: "/web-components.jpg"
created_at: "03/14/2021"
tags: ["Web Components", "JavaScript"]
canonical: "https://blog.huntertrammell.dev/a-brief-introduction-to-web-components"
---

## Clues From The Past

A few years ago I attended a local [Drupal](https://www.drupal.org/) meetup and there was a guest speaker who gave a presentation about [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components). I had joined the group to try and get some more knowledge about using Drupal since it was the primary CMS my job was using for their websites. Let me start by sharing a little bit about myself, I love to learn and get super excited when I discover new things. After the presentation had ended I was so pumped to get started I couldn’t hardly wait to get home and learn all there was to know about Web Components. But that excitement was quickly replaced with self doubt and a bit of anxiety. How do I even go about creating a Web Component? I didn’t think I had the bandwidth to learn something new, I was only a few months into my first job as a Web Developer and was already racing to get more comfortable with Drupal. So I added this to my ever expanding list of things to “check out” and shelved it. Fast forward a few years and I am tasked with finding a solution to issues we were having on a group of sites that had a universal nav that linked between the sites. The navbar looked slightly different on every site. A lightbulb immediately turned on, this would be a perfect use case for a style agnostic Web Component. I pitched this idea, advising that I would need a bit of time for research but it seemed like it would solve our issues. I was correct in my thinking but I was also wrong to get intimidated by this a few years prior. Had I done the research instead of underestimating my own abilities I would have realized that Web Components aren’t as scary as they seem. 

## Web Components

In a nutshell, Web Components are reusable custom HTML tags that live in their own little bubble - the [Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM). Because these components live in their own DOM they aren’t targetable via  the Light DOM (Light DOM is used when talking about the Shadow DOM so there is a differentiation between the two DOM’s). CSS from the parent will not be usable by the web component so you can have a completely encapsulated element within your DOM. I would like to note that while your Web Component won’t have access to the styles of the parent it can still inherit styles specified via the body or html tag. Web Components are [supported by every major browser](https://caniuse.com/custom-elementsv1) aside from IE (what’s new 🤷🏼‍♂️) making them a powerful tool to add to your knowledge base. In this Article we will explore some possible use cases for Web Components, and the methods available to us.

## When To Leverage Web Components

When considering using a Web Component, here are a couple use cases:
- The need for a component that can be reused in any website.
- An element that needs to be visually identical across multiple themes/websites

## How To Create A Web Component

To create a Web Component we first need to create a class that defines our components functionality and initiates the Shadow DOM. Then we can define a template to hold our HTML if needed and lastly we need to register our component with the Light DOM so that we can load it onto the page using a custom HTML tag name. Let’s take a look at a barebones Web Component to better understand how it is constructed and what methods are available to us - though not all are required or needed in every Component.

[GitHub Gist](https://gist.github.com/huntertrammell/0be202a282c111f0a416870aa82b536b)

[CodePen](https://codepen.io/huntertrammell/pen/zYobEMe)

<img src="https://strapifileserver.s3.us-east-2.amazonaws.com/web_component_1d7bb3a20b.png" style="
    width: 100%;
    margin: 0 auto;
    padding: 2rem;
    display: block;
">

## More information
 - **[constructor()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/constructor)**
 - **[this.attatchShadow()](https://developer.mozilla.org/en-US/docs/Web/API/Element/attachShadow)**
 - **[Lifecycle Callbacks](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements#using_the_lifecycle_callbacks)**
 
