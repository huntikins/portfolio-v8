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
        {!isFormSubmitted ? (
          <ContactForm setFormState={setIsFormSubmitted} />
        ) : (
          <p className="text-primary">
            Thank you for your message! I will get back to you as soon as
            possible!
          </p>
        )}
      </Section>
    </>
  );
};

export default Contact;
