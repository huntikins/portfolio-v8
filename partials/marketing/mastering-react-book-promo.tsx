import Image from "next/image";
import { FunctionComponent } from "react";
import { Section } from "../../components/layout/section";
import { Heading } from "../../components/ui/heading";
import graphic from "../../public/mastering-react.jpg";
import Link from "next/link";

export const PromoEBook: FunctionComponent = () => {
  return (
    <Section theme="tertiary">
      <div className="flex flex-col lg:flex-row justify-center items-center">
        <div className="order-2 pt-8 lg:pt-0 lg:w-1/2 lg:order-1">
          <Heading level={2}>Supercharge Your Web Development Skills with Our React.js eBook!</Heading>
          <p className="py-4">
            Are you ready to elevate your React skills and build stunning web
            applications? Discover our latest eBook, &quot;Mastering React.js: A
            Comprehensive Guide to Building Modern, Scalable Web
            Applications,&quot; your one-stop resource for mastering this
            powerful library. From core concepts to advanced techniques, this
            comprehensive guide has it all. Plus, for a limited time, use promo
            code <b className="bg-primary text-light p-1">REACTMASTER23</b> for
            an{" "}
            <b className="bg-primary text-light p-1">exclusive 20% discount!</b>{" "}
            Don&apos;t miss this opportunity to level up your web development
            prowess.{" "}
            <Link href="/books/master-react-js-comprehensive-guide-scalable-web-applications">
              <a  className="inline-link">Click here to unlock your React potential and save 20% today!</a>
            </Link>
          </p>
        </div>
        <div className="order-1 lg:w-1/2 lg:order-2 lg:px-8 lg:flex lg:items-center lg:justify-center">
          <Image src={graphic} alt="Mastering React cover on a screenreader" />
        </div>
      </div>
    </Section>
  );
};
