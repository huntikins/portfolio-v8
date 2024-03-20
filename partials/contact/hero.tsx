import { FunctionComponent } from "react";
import { Section } from "../../components/layout/section";
import { Heading } from "../../components/ui/heading";

export const Hero: FunctionComponent = () => {
  return (
    <Section>
      <div className="flex items-center flex-col lg:flex-row">
        <div>
          <Heading level={1}>Say Hello</Heading>
        </div>
      </div>
      <p className="py-4">
        Enjoyed an article, interested in working with me, or just want to say hi? Feel free to drop me a line,
        i&apos;d be happy to connect. Alternatively feel free to slide into my dm&apos;s on
        twitter{" "}
        <a
          href="http://twitter.com/@trammellwebdev"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          @trammellwebdev
        </a>
        .
      </p>
    </Section>
  );
};
