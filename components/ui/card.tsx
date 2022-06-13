import { FunctionComponent } from "react";
import Image from "next/image";
import { Heading } from "./heading";
import { ICardProps } from "./ui.interface";
import Link from "next/link";

export const Card: FunctionComponent<ICardProps> = ({
  title,
  image,
  imageAlt,
  description,
  path,
  tags,
}) => {
  return (
    <article className="max-w-sm rounded overflow-hidden shadow-lg bg-tertiary bg-opacity-20 mb-4">
      <div className="w-full">
        <Image src={image} alt={imageAlt} width={358} height={260} layout="responsive"/>
      </div>
      <div className="px-6 py-4">
        <Heading level={3}>{title}</Heading>
        <p className="text-primary">
          {description} <Link href={path}>Read More</Link>
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        {tags.length &&
          tags.map((tag, index) => (
            <span
              key={index}
              className="inline-block bg-secondary text-light rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
            >
              {tag}
            </span>
          ))}
      </div>
    </article>
  );
};
