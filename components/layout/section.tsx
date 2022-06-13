import classNames from "classnames";
import { FunctionComponent } from "react";
import { ISectionProps } from "./layout.interface";

export const Section: FunctionComponent<ISectionProps> = ({
  theme = "primary",
  children,
}) => {
  const sectionClass = classNames({
    "bg-light text-primary": theme === "primary",
    "bg-secondary text-light": theme === "secondary",
    "bg-tertiary bg-opacity-20 text-primary": theme === "tertiary",
    "bg-white text-primary": theme === 'none',
    "px-4 py-8 max-w-screen-xl mx-auto": true,
  });

  return <section className={sectionClass}>{children}</section>;
};
