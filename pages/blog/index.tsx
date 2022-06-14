import { NextPage } from "next";
import Head from "next/head";
import { Posts } from "../../partials/blog/blog";
import { Hero } from "../../partials/blog/hero";
import { supabase } from "../../utils/client";

const Blog: NextPage = ({ posts }: any) => {
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
      <Posts posts={posts} />
    </>
  );
};

export default Blog;

export async function getStaticProps() {
  const { data } = await supabase.from("posts").select();
  return {
    props: {
      posts: data,
    },
  };
}
