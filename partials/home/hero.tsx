import { FunctionComponent } from "react";
import { Section } from "../../components/layout/section";
import { Button } from "../../components/ui/button";
import { Heading } from "../../components/ui/heading";
import { PromoEBook } from "../marketing/mastering-react-book-promo";

export const Hero: FunctionComponent = () => {
  return (
    <>
      <Section>
        <div className="flex lg:items-center flex-col lg:flex-row">
          <div>
            <Heading level={1}>Hi, I&apos;m Hunter!</Heading>
            <Heading level={2} theme="secondary">
              Senior Software Engineer, Blogger, </br>
              Cetacean Enthusiast, Taco Bell Fanboy, </br>
              Slinger of Dank Code.
            </Heading>
          </div>
        </div>
        <p className="py-4">
          I&apos;m a Front End Developer hailing from Kansas City, and I&apos;m
          excited to welcome you to my blog! Here, you&apos;ll find a diverse
          range of content, from intriguing short stories to informative
          coding-related articles and tutorials. Happy Coding and enjoy
          your stay on my blog!🤘🐋
        </p>
        <div>
          <Button
            label="Let's chat!"
            type="link"
            path="mailto:hello@huntertrammell.dev"
          />
        </div>
      </Section>
    </>
  );
};
