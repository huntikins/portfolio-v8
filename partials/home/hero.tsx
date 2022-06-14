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
        I&apos;m a Front End Developer from Kansas City. Welcome to my blog, here I
        will post anything from short stories to coding-related articles and
        tutorials. I hope you enjoy, Happy Coding!!
      </p>
      <div>
        <Button
          label="Say Hello"
          type="link"
          path="mailto:hunterttrammell@gmail.com"
        />
      </div>
    </Section>
  );
};
