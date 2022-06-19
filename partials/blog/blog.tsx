import { ChangeEvent, FunctionComponent, useState } from "react";
import { Section } from "../../components/layout/section";
import { Card } from "../../components/ui/card";
import { Heading } from "../../components/ui/heading";
import { IBlogProps } from "../../interfaces/page.interface";

export const Posts: FunctionComponent<IBlogProps> = ({ posts, tags }) => {
  const [postNum, setPostNum] = useState(6);

  const [activePosts, setActivePosts] = useState(posts);

  const showMore = () => {
    setPostNum((prevPostNum) => prevPostNum + 3);
  };

  const handleFilter = (e: ChangeEvent<HTMLSelectElement>) => {
    const filterVal = (e.target as HTMLSelectElement).value;

    if (filterVal === "all") {
      setActivePosts(posts);
    } else {
      const filteredPosts = posts.filter((post: any) => {
        return post.tags.includes(filterVal);
      });

      setActivePosts(filteredPosts);
    }
  };

  return (
    <Section theme="none">
      <Heading level={2} align="center">
        Recent Posts
      </Heading>
      <div className="w-full md:w-1/2 lg:w-1/4">
        <label
          htmlFor="filter"
          className="block mb-1 ml-2 text-sm font-medium text-dark"
        >
          Filter by topic
        </label>
        <select
          id="filter"
          className="bg-light border-2 border-primary text-primary text-sm rounded-lg font-bold focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          onChange={handleFilter}
        >
          <option value="all">All</option>
          {tags.map((tag: any) => (
            <option value={tag} key={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>
      <div className="pt-8 grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {activePosts &&
          activePosts
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
        {postNum < activePosts.length && (
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
