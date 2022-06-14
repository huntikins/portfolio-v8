import { FunctionComponent } from "react";
import { Section } from "../../components/layout/section";
import { Button } from "../../components/ui/button";
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
        I&apos;m a Front End Developer from Kansas City. Welcome to my blog, here I
        will post anything from short stories to coding-related articles and
        tutorials. I hope you enjoy, Happy Coding!!
      </p>
    </Section>
  );
};
