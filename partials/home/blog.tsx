import { FunctionComponent } from "react";
import { Section } from "../../components/layout/section";
import { Card } from "../../components/ui/card";
import { Heading } from "../../components/ui/heading";
import { IBlogProps } from "../../interfaces/page.interface";

export const Blog: FunctionComponent<IBlogProps> = ({ posts }) => {
  return (
    <Section>
      <Heading level={2} align="center">
        Latest Posts
      </Heading>
      <div className="pt-8 grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {posts &&
          posts.map((post: any, index: number) => (
            <Card
              key={index}
              title={post.title}
              image={post.image}
              imageAlt={post.title}
              description={post.description}
              tags={post.tags}
              path={`/blog/${post.path}`}
            />
          ))}
      </div>
    </Section>
  );
};
