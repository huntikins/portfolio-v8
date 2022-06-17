import { FunctionComponent } from "react";

export const Footer: FunctionComponent = () => {
  const date = new Date().getFullYear();
  return (
    <footer className="bg-primary text-light p-4 max-w-screen-xl mx-auto text-center">
      <p>&copy; {date} Hunter Trammell</p>
      <p>Made with ❤️ using Next.js</p>
    </footer>
  );
};
