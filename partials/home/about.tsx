import Image from "next/image";
import { FunctionComponent } from "react";
import { Section } from "../../components/layout/section";
import { Button } from "../../components/ui/button";
import { Heading } from "../../components/ui/heading";
import graphic from "../../public/home-about.svg";

export const About: FunctionComponent = () => {
  return (
    <Section>
      <div className="flex flex-col lg:flex-row">
        <div className="order-2 pt-8 lg:pt-0 lg:w-1/2 lg:order-1">
          <Heading level={2}>Get To Know Me</Heading>
          <p className="py-4">
            Howdy folks, my name is Hunter and I am a Senior Socftware Engineer
            currently working for VML. Whether it&apos;s writing, teaching,
            learning, or writing about code - I just can&apos;t get enough. I started
            my coding journey back in 2018 when I made a career switch from being an
            IT Help Desk agent and enrolled in a coding bootcamp through the University of Kansas.
            It was then that I truly fell in love with coding. I had the opportunity a few years back 
            to teach that very same course and it was super cool to come full circle. 
            I currently am interested in Software Design & Architecture, Next.js,
            Vite, AEM, Java, Alpine.js, TypeScript and Tailwind but am always
            learning and revisiting technologies.
          </p>
          <div className="flex flex-col lg:flex-row">
            <Button
              type="link"
              path="https://twitter.com/@trammellwebdev"
              newTab={true}
              label="Follow Me On Twitter"
              theme="primary"
            />
            <Button
              type="link"
              path="https://linkedin.com/in/huntertrammell"
              newTab={true}
              label="Connect With Me On LinkedIn"
              theme="secondary"
            />
          </div>
        </div>
        <div className="order-1 lg:w-1/2 lg:order-2 lg:px-8 lg:flex lg:items-center lg:justify-center">
          <Image
            src={graphic}
            alt="illustration of coder sitting at desk with computer eauipment coding."
            width={716}
            height={520}
          />
        </div>
      </div>
    </Section>
  );
};
