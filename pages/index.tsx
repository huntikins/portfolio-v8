import type { NextPage } from "next";
import Head from "next/head";
import { IHomeProps } from "../interfaces/page.interface";
import { About } from "../partials/home/about";
import { Blog } from "../partials/home/blog";
import { Hero } from "../partials/home/hero";
import { supabase } from "../utils/client";

const Home: NextPage<IHomeProps> = ({posts}) => {
  return (
    <>
      <Head>
        <title>Hunter Trammell&apos;s Blog</title>
        <meta name="title" content="Hunter Trammell's Blog" />
        <meta
          name="description"
          content="I'm a Front End Developer from
        Kansas City. Welcome to my blog, here I will post anything from short
        stories to coding-related articles and tutorials. I
        hope you enjoy, Happy Coding!"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://huntertrammell.dev" />
        <meta property="og:title" content="Hunter Trammell's Blog" />
        <meta
          property="og:description"
          content="I'm a Front End Developer from
        Kansas City. Welcome to my blog, here I will post anything from short
        stories to coding-related articles and tutorials. I
        hope you enjoy, Happy Coding!"
        />
        <meta
          property="og:image"
          content="https://huntertrammell.dev/home-about.svg"
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://huntertrammell.dev" />
        <meta property="twitter:title" content="Hunter Trammell's Blog" />
        <meta
          property="twitter:description"
          content="I'm a Front End Developer from
        Kansas City. Welcome to my blog, here I will post anything from short
        stories to coding-related articles and tutorials. I
        hope you enjoy, Happy Coding!"
        />
        <meta
          property="twitter:image"
          content="https://huntertrammell.dev/home-about.svg"
        />
      </Head>
      <Hero />
      <About />
      <Blog posts={posts} />
    </>
  );
};

export default Home;
export async function getStaticProps() {
  const {data} = await supabase.from('posts').select()
  return {
    props: {
      posts: data
    }, // will be passed to the page component as props
  };
}
