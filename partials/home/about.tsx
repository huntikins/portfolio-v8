import Image from "next/image";
import { FunctionComponent } from "react";
import { Section } from "../../components/layout/section";
import { Button } from "../../components/ui/button";
import { Heading } from "../../components/ui/heading";
import graphic from "../../public/home-about.svg";

export const About: FunctionComponent = () => {
  return (
    <Section theme="tertiary">
      <div className="flex flex-col lg:flex-row">
        <div className="order-2 lg:w-1/2 lg:order-1">
          <Heading level={2}>Get To Know Me</Heading>
          <p className="py-4">
            Howdy folks, my name is Hunter and I am a Front End Developer
            currently working at VMLY&R. Wether it is writing, writing about,
            teaching or learning code; I just can’t get enough. I started my
            coding journey in 2019 when I made a career switch as an IT Help
            Desk agent and enrolled in a coding bootcamp through a local
            university. It was then during that course that I truly fell in love
            with coding. I recently had the opportunity to teach the very same
            course that I took when I got my start as a developer and it was a
            great experience. I currently enjoy working with Next.js, Webpack,
            AEM, Alpine.js, TypeScript and Tailwind but am always learning and
            revisiting technologies.
          </p>
          <div className="flex flex-col lg:flex-row">
            <Button
              type="link"
              path="https://twitter.com/@trammellwebdev"
              newTab={true}
              label="Connect With Me On Twitter"
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
        <div className="order-1 lg:w-1/2 lg:order-2 lg:px-8">
          <Image
            src={graphic}
            alt="illustration of coder sitting at desk with computer eauipment coding."
          />
        </div>
      </div>
    </Section>
  );
};
