import { FunctionComponent } from "react";
import { Section } from "../../components/layout/section";
import { Heading } from "../../components/ui/heading";

export const Hero: FunctionComponent = () => {
  return (
    <Section>
      <div className="flex items-center flex-col lg:flex-row">
        <div>
          <Heading level={1}>Hunter Trammell&apos;s Blog</Heading>
        </div>
      </div>
      <p className="py-4">
      I&apos;m a Front End Developer hailing from Kansas City, and I&apos;m excited
        to welcome you to my blog! Here, you&apos;ll find a diverse range of content,
        from intriguing short stories to informative coding-related articles and
        tutorials. I&apos;m also thrilled to announce the recent publication of my
        book on React, Mastering React.js: A Comprehensive Guide to Building
        Modern, Scalable Web Applications, which I believe will be a valuable
        resource for fellow developers. Don&apos;t miss out on this opportunity to
        elevate your skills - check it out now by clicking here! Happy Coding
        and enjoy your stay on my blog!
      </p>
    </Section>
  );
};
