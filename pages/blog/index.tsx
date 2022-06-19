import { NextPage } from "next";
import Head from "next/head";
import { Posts } from "../../partials/blog/blog";
import { Hero } from "../../partials/blog/hero";
import { getAllPosts } from "../../utils/api";

const Blog: NextPage = ({ posts, tags }: any) => {

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
          content="https://huntertrammell.dev/social.jpg"
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
          content="https://huntertrammell.dev/social.jpg"
        />
      </Head>
      <Hero />
      <Posts posts={posts} tags={tags} />
    </>
  );
};

export default Blog;

export async function getStaticProps() {
  const data = getAllPosts([
    "title",
    "description",
    "slug",
    "tags",
    "image",
    "created_at",
  ]);

  const tags = data.map((post) => {
    return post.tags;
  });

  return {
    props: {
      posts: data,
      tags: [...new Set(tags.flat())],
    },
  };
}
