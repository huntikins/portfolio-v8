import classNames from "classnames";
import { FunctionComponent } from "react";
import { ISectionProps } from "../../interfaces/layout.interface";

export const Section: FunctionComponent<ISectionProps> = ({
  theme = "primary",
  children,
}) => {
  const sectionClass = classNames({
    "bg-light text-dark": theme === "primary",
    "bg-secondary text-light": theme === "secondary",
    "bg-tertiary bg-opacity-20 text-dark": theme === "tertiary",
    "bg-white text-dark": theme === 'none',
    "px-4 py-8 max-w-screen-xl mx-auto": true,
  });

  return <section className={sectionClass}>{children}</section>;
};
