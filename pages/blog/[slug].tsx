import Head from "next/head";
import Image from "next/image";
import { Section } from "../../components/layout/section";
import { Heading } from "../../components/ui/heading";
import { getAllPosts, getPostBySlug } from "../../utils/api";
import markdownToHtml from "../../utils/markdownToHTML";
import { Params } from "next/dist/server/router";
import "prismjs/themes/prism-tomorrow.css";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { PromoEBook } from "../../partials/marketing/mastering-react-book-promo";

const BlogPost = ({ post, recentPosts }: any) => {
  const date = new Date(post.created_at).toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="title" content={post.title} />
        <meta name="description" content={post.description} />
        {post.canonical && <link rel="canonical" href={post.canonical} />}
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`https://huntertrammell.dev/blog/${post.slug}`}
        />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        <meta
          property="og:image"
          content={`https://huntertrammell.dev${post.image}`}
        />
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content={`https://huntertrammell.dev/blog/${post.slug}`}
        />
        <meta property="twitter:title" content={post.title} />
        <meta property="twitter:description" content={post.description} />
        <meta
          property="twitter:image"
          content={`https://huntertrammell.dev${post.image}`}
        />
      </Head>
      <Section>
        <div>
          <Heading level={1}>{post.title}</Heading>
          <Heading level={3} align="left">
            {date}
          </Heading>
        </div>
        <div className="pt-4">
          {post.tags.length &&
            post.tags.map((tag: any, index: number) => (
              <span
                key={index}
                className="inline-block bg-secondary text-light rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
              >
                {tag}
              </span>
            ))}
        </div>
      </Section>
      <Section theme="none">
        <div className="max-w-3xl mx-auto">
          <div className="pb-6">
            <Image
              src={post.image}
              layout="responsive"
              alt={post.title}
              width={1024}
              height={768}
            />
          </div>
          <div
            className="post-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          ></div>
        </div>
      </Section>
      <PromoEBook />
      <Section>
        <div>
          <Heading level={3} align="center">
            Enjoyed this article? Connect with me on Social!
          </Heading>
          <div className="pt-6 flex items-center justify-center flex-col lg:flex-row">
            <Button
              type="link"
              path="https://twitter.com/@trammellwebdev"
              newTab={true}
              label="Follow Me On Twitter"
              theme="primary"
            />
            <Button
              type="link"
              path="https://linkedin.com/in/huntertrammell"
              newTab={true}
              label="Connect With Me On LinkedIn"
              theme="secondary"
            />
          </div>
        </div>
      </Section>
      <Section>
        <Heading level={2} align="center">
          About Hunter Trammell
        </Heading>
        <div className="flex items-center justify-center flex-col lg:flex-row max-w-4xl mx-auto mt-4">
          <div className="w-full lg:w-1/3 flex items-center justify-center">
            <div className="rounded-full inline-block overflow-hidden border-8 h-52 w-52 border-opacity-40 border-primary">
              <Image
                src="/hunter.jpg"
                height={150}
                width={150}
                alt="Image of Hunter Trammell"
                layout="responsive"
              />
            </div>
          </div>
          <div className="w-full lg:w-2/3 mt-4 lg:mt-0">
            <p className="pb-2 italic font-bold">
              &quot;The largest room in the world is the room for
              improvement.&quot; - Unknown
            </p>
            <p>
              While I can&apos;t say where that quote originated, I can say as a
              Full Stack Web Developer I am constantly reminded of this ever
              expansive room for improvement. There are always new technologies
              to learn, a JavaScript method to discover, or even development
              tools to take advantage of. In this infinite room, how does one
              quench that endless thirst for knowledge? We drink until
              we&apos;re full — so let&apos;s crack open a cold one and dive
              into some Web Development concepts.
            </p>
          </div>
        </div>
      </Section>
      <Section>
        <Heading level={2} align="center">
          Latest Posts
        </Heading>
        <div className="pt-8 grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {recentPosts &&
            recentPosts.map((post: any, index: number) => (
              <Card
                key={index}
                title={post.title}
                image={post.image}
                imageAlt={post.title}
                description={post.description}
                tags={post.tags}
                created_at={post.created_at}
                slug={`/blog/${post.slug}`}
              />
            ))}
        </div>
      </Section>
    </>
  );
};

export default BlogPost;

export async function getStaticProps({ params }: Params) {
  const post = getPostBySlug(params.slug, [
    "title",
    "created_at",
    "slug",
    "description",
    "content",
    "image",
    "tags",
    "canonical",
  ]);
  const content = await markdownToHtml(post.content || "");

  const posts = getAllPosts([
    "title",
    "description",
    "slug",
    "tags",
    "image",
    "created_at",
  ]);

  return {
    props: {
      post: {
        ...post,
        content,
      },
      recentPosts: posts
        .filter((posts) => posts.title !== post.title)
        .slice(0, 3),
    },
  };
}

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
