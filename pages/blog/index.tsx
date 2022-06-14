import { NextPage } from "next";
import { Posts } from "../../partials/blog/blog";
import { Hero } from "../../partials/blog/hero";
import { supabase } from "../../utils/client";

const Blog: NextPage = ({ posts }: any) => {
  return (
    <>
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
