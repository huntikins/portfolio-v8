import { FunctionComponent, useState } from "react";
import { Section } from "../../components/layout/section";
import { Card } from "../../components/ui/card";
import { Heading } from "../../components/ui/heading";
import { IBlogProps } from "../../interfaces/page.interface";

export const Posts: FunctionComponent<IBlogProps> = ({ posts }) => {
  const [postNum, setPostNum] = useState(6);

  const showMore = () => {
    setPostNum((prevPostNum) => prevPostNum + 3);
  };

  return (
    <Section theme="none">
      <Heading level={2} align="center">
        Recent Posts
      </Heading>
      <div className="pt-8 grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {posts &&
          posts
            .slice(0, postNum)
            .map((post: any, index: number) => (
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
      <div className="text-center">
        {postNum < posts.length && (
          <button
            className="py-2 px-4 inline-block font-bold hover:opacity-80 border-2 border-primary mb-2 mt-6 mr-2 text-center bg-primary text-light"
            onClick={showMore}
          >
            Load More
          </button>
        )}
      </div>
    </Section>
  );
};
