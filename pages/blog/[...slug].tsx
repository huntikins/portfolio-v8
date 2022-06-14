import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Section } from "../../components/layout/section";
import { Heading } from "../../components/ui/heading";
import { supabase } from "../../utils/client";
import Prism from "prismjs";
import { useEffect } from "react";
import "prismjs/themes/prism-tomorrow.css";

const BlogPost: NextPage = ({ data }: any) => {
  useEffect(() => {
    Prism.highlightAll();
  }, []);
    
  const page = data[0];
  const date = new Date(page.created_at).toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  return (
    <>
      <Head>
        <title>{page.title}</title>
        <meta name="title" content={page.title} />
        <meta name="description" content={page.description} />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`https://huntertrammell.dev/blog/${page.path}`}
        />
        <meta property="og:title" content={page.title} />
        <meta property="og:description" content={page.description} />
        <meta property="og:image" content={page.image} />
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content={`https://huntertrammell.dev/blog/${page.path}`}
        />
        <meta property="twitter:title" content={page.title} />
        <meta property="twitter:description" content={page.description} />
        <meta property="twitter:image" content={page.image} />
      </Head>
      <Section>
        <div className="flex justify-between lg:items-center flex-col lg:flex-row">
          <div>
            <Heading level={1}>{page.title}</Heading>
            <Heading level={2} align="left">
              {date}
            </Heading>
          </div>
          <div className="pt-4">
            {page.tags.length &&
              page.tags.map((tag: any, index: number) => (
                <span
                  key={index}
                  className="inline-block bg-secondary text-light rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                >
                  {tag}
                </span>
              ))}
          </div>
        </div>
      </Section>
      <Section theme="none">
        <div className="pb-6">
          <Image
            src={page.image}
            layout="responsive"
            alt={page.title}
            width={1024}
            height={768}
          />
        </div>
        <div dangerouslySetInnerHTML={{ __html: page.body }}></div>
      </Section>
    </>
  );
};

export default BlogPost;

export async function getStaticPaths() {
  const { data } = await supabase.from("posts").select();

  const paths = data?.map((page) => ({ params: { slug: [page.path] } }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: any) {
  const { data } = await supabase
    .from("posts")
    .select("path, title, description, image, tags, body, created_at")
    .match({ path: params.slug });

  return { props: { data } };
}
