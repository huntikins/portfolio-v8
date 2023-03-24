import { FunctionComponent } from "react";
import { Section } from "../../components/layout/section";
import { Button } from "../../components/ui/button";
import { Heading } from "../../components/ui/heading";

export const Hero: FunctionComponent = () => {
  return (
    <Section>
      <div className="flex lg:items-center flex-col lg:flex-row">
        <div>
          <Heading level={1}>Hi, I&apos;m Hunter!</Heading>
          <Heading level={2} theme="secondary">
            Front End Developer, Blogger, Lover of Code.
          </Heading>
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
      <div>
        <Button
          label="Check It Out Now!"
          type="link"
          path="/books/master-react-js-comprehensive-guide-scalable-web-applications"
        />
      </div>
    </Section>
  );
};
