import classNames from "classnames";
import Link from "next/link";
import { FunctionComponent } from "react";
import { IButtonProps } from "./ui.interface";

export const Button: FunctionComponent<IButtonProps> = ({
  type,
  label,
  path,
  newTab,
  theme = "primary",
  action = "button",
}) => {
  const btnClass = classNames({
    "bg-primary text-light": theme === "primary",
    "bg-light text-primary": theme === "secondary",
    "py-2 px-4 inline-block font-bold hover:opacity-80 border-2 border-primary my-2 mr-2 text-center":
      true,
  });

  if (type === "button") {
    return (
      <button className={btnClass} type={action}>
        {label}
      </button>
    );
  } else {
    return (
      <Link href={path as string} target={newTab ? "_blank" : "_self"}>
        <a className={btnClass}>{label}</a>
      </Link>
    );
  }
};
