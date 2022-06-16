import Head from "next/head";
import Image from "next/image";
import { Section } from "../../components/layout/section";
import { Heading } from "../../components/ui/heading";
import { getAllPosts, getPostBySlug } from "../../utils/api";
import markdownToHtml from "../../utils/markdownToHTML";
import { Params } from "next/dist/server/router";
import "prismjs/themes/prism-tomorrow.css";

const BlogPost = ({ post }: any) => {
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
        <meta property="og:image" content={post.image} />
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content={`https://huntertrammell.dev/blog/${post.slug}`}
        />
        <meta property="twitter:title" content={post.title} />
        <meta property="twitter:description" content={post.description} />
        <meta property="twitter:image" content={post.image} />
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

  return {
    props: {
      post: {
        ...post,
        content,
      },
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
