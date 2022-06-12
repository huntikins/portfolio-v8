import Image from "next/image";
import { FunctionComponent } from "react";
import { Section } from "../../components/layout/section";
import { Heading } from "../../components/ui/heading";
import graphic from "../../public/home-about.svg";

export const About: FunctionComponent = () => {
  return (
    <Section theme="tertiary">
      <div className="flex flex-col lg:flex-row">
        <div className="order-2 lg:w-1/2 lg:order-1">
          <Heading level={2} theme="light">
            Get To Know Me
          </Heading>
          <p className="py-4">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus
            vero hic quaerat illo cupiditate. Officia fuga excepturi nisi fugiat
            quaerat quo neque impedit? Hic, vitae qui. Labore exercitationem
            quia nihil? Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Excepturi, voluptas ipsam! Neque sequi consequatur illum eos nostrum
            voluptatum illo repellendus suscipit. In tempora et dolor tenetur
            reiciendis doloribus, iusto accusantium.
          </p>
          <Heading level={3} theme="light">
            What I Am Currently Working With:
          </Heading>
          <ul className="list-dash pl-4 pt-2">
            <li className="pl-2">Next.js</li>
            <li className="pl-2">Webpack</li>
            <li className="pl-2">Adobe Experience Manager</li>
            <li className="pl-2">Alpine.js</li>
            <li className="pl-2">TypeScript</li>
            <li className="pl-2">Tailwind</li>
          </ul>
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
