export interface IButtonProps {
  type: "button" | "link";
  label: string;
  action?: "button" | "submit";
  theme?: "primary" | "secondary";
  path?: string;
  newTab?: boolean;
}

export interface IHeadingProps {
  level: 1 | 2 | 3 | 4;
  children: React.ReactNode;
  theme?: "primary" | "secondary" | "light";
  align?: "center" | "left" | "right";
}

export interface ICardProps {
    title: string;
    image: string;
    imageAlt: string;
    description: string;
    tags: string[];
    path: string;
}