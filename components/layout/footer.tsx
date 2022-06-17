import { FunctionComponent } from "react";
import Image from "next/image";

export const Footer: FunctionComponent = () => {
  const date = new Date().getFullYear();
  return (
    <footer className="bg-primary text-light p-4 max-w-screen-xl mx-auto text-center">
      <Image src="/logo.png" height={30} width={30} alt="HTT initials logo" />
      <p>&copy; {date} Hunter Trammell</p>
      <p>Made with ❤️ using Next.js</p>
    </footer>
  );
};
