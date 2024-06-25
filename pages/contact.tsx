import { NextPage } from "next";
import { useState } from "react";
import { ContactForm } from "../components/form/contact";
import { Section } from "../components/layout/section";
import { Heading } from "../components/ui/heading";
import { Hero } from "../partials/contact/hero";

const Contact: NextPage = () => {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  return (
    <>
      <Hero />
      <Section theme="none">
          <p className="text-primary">
            Unfortunatley the contact form is down at the moment while I migrate servers, please send me a message through LinkedIn or email me at <a href="mailto:hello@huntertrammell.dev">hello@huntertrammell.dev</a>
          </p>
      </Section>
    </>
  );
};

export default Contact;
