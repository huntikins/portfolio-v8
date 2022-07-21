import { FunctionComponent } from "react";
import Image from "next/image";
import { Heading } from "./heading";
import { ICardProps } from "../../interfaces/ui.interface";
import { Button } from "./button";
import { create } from "domain";

export const Card: FunctionComponent<ICardProps> = ({
  title,
  image,
  imageAlt,
  description,
  slug,
  tags,
  created_at
}) => {

  const date = new Date(created_at).toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <article className="max-w-sm rounded overflow-hidden shadow-lg bg-tertiary bg-opacity-20 mb-4">
      <div className="relative bg-primary">
        <div className="w-full opacity-80 relative h-64">
          <Image
            src={image}
            alt={imageAlt}
            className="object-cover"
            layout="fill"
          />
        </div>
        <div className="px-6 pt-4 absolute bottom-0">
          {tags.length &&
            tags.map((tag, index) => (
              <span
                key={index}
                className="inline-block bg-light text-primary rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-4"
              >
                {tag}
              </span>
            ))}
        </div>
      </div>
      <div className="px-6 pb-4">
        <p className="text-dark pt-4 font-bold italic">{date}</p>
        <Heading level={3}>{title}</Heading>
        <p className="text-dark py-4">{description}</p>
        <Button label="Read Article" type="link" path={slug} />
      </div>
    </article>
  );
};
