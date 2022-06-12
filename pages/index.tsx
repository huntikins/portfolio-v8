import type { NextPage } from "next";
import { About } from "../partials/home/about";
import { Blog } from "../partials/home/blog";
import { Hero } from "../partials/home/hero";

const Home: NextPage = () => {
  return (
    <>
      <Hero />
      <About />
      <Blog />
    </>
  );
};

export default Home;
