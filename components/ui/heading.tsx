import classNames from "classnames";
import { FunctionComponent } from "react";
import { IHeadingProps } from "./ui.interface";

export const Heading: FunctionComponent<IHeadingProps> = ({
  level,
  children,
  theme = "primary",
  align,
}) => {
  const CustomHeading = `h${level}` as keyof JSX.IntrinsicElements;

  const headingClass = classNames({
    "text-4xl": level === 1,
    "text-2xl": level === 2,
    "text-xl": level === 3,
    "text-base": level === 4,
    "text-primary": theme === "primary",
    "text-secondary": theme === "secondary",
    "text-light": theme === "light",
    "font-bold": true,
    "text-center": align === "center",
    "text-right": align === "right",
    "text-left": align === "left",
  });

  return <CustomHeading className={headingClass}>{children}</CustomHeading>;
};
