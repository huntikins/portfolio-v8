import { FunctionComponent } from "react";
import { Section } from "../../components/layout/section";
import { Heading } from "../../components/ui/heading";

export const PromoTitleEBook: FunctionComponent = () => {
  return (
    <Section>
      <div className="flex items-center justify-center text-center lg:w-3/4 lg:mx-auto">
        <div>
          <Heading level={1}>Mastering React.js: A Comprehensive Guide to Building Modern, Scalable Web Applications</Heading>
        </div>
      </div>
    </Section>
  );
};
