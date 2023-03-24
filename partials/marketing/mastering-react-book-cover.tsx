import Image from "next/image";
import { FunctionComponent } from "react";
import { Section } from "../../components/layout/section";
import { Button } from "../../components/ui/button";
import { Heading } from "../../components/ui/heading";
import graphic from "../../public/mastering-react-ebook.png";

export const PromoHeaderEBook: FunctionComponent = () => {
  return (
    <Section theme="tertiary">
      <div className="flex flex-col lg:flex-row justify-center items-center">
        <div className="order-2 pt-8 lg:pt-0 lg:w-1/2 lg:order-1">
          <Heading level={2}>Unleash Your React Potential</Heading>
          <p className="py-4">
            Are you ready to transform your web development expertise and craft
            cutting-edge applications? Set sail on an extraordinary learning
            voyage with our new eBook, &quot;Mastering React.js: A Comprehensive
            Guide to Building Modern, Scalable Web Applications&quot;. Delve
            into the depths of this remarkable library and elevate your web
            projects beyond the ordinary. For a limited time only, seize this
            exclusive <br />
            <b className="bg-primary text-light p-1">20% discount</b> with promo
            code <b className="bg-primary text-light p-1">REACTMASTER23</b>.
            Don&apos;t miss your chance – secure your copy now and embark on
            your path to React mastery!
          </p>
          <p className="pb-4">
            As you progress through the pages of this comprehensive guide,
            you&apos;ll uncover the true power of React.js and its many features.
            Learn how to set up your project with Vite, create maintainable code
            with TypeScript, and optimize performance for the ultimate user
            experience. Understand the core concepts of components, props, and
            state, and dive into advanced topics like server-side rendering and
            backend integration. Discover essential tools and libraries within
            the React ecosystem, and learn how to build accessible and
            progressive web applications that cater to a diverse user base. This
            invaluable resource is your key to unlocking the full potential of
            React.js – don&apos;t let this opportunity pass you by!
          </p>
          <div className="flex flex-col lg:flex-row">
            <Button
              type="link"
              path="https://trammellwebdev.gumroad.com/l/mastering-react/REACTMASTER23"
              newTab={true}
              label="Unlock Your React Potential – Save 20% Now!"
              theme="primary"
            />
          </div>
        </div>
        <div className="order-1 lg:w-1/2 lg:order-2 lg:px-8 lg:flex lg:items-center lg:justify-center">
          <Image src={graphic} alt="Mastering React cover on a screenreader" />
        </div>
      </div>
    </Section>
  );
};
