import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { Heading } from "../../components/ui/heading";
import { supabase } from "../../utils/client";

const Admin: NextPage = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      const { error } = await supabase.auth.signIn({
        email,
        password,
      });

      if (error) {
        alert(JSON.stringify(error));
      } else {
        router.push("/admin/new-post");
      }
    };

    return (
      <div className="h-screen flex items-center justify-center bg-primary">
        <div className="max-w-lg w-full">
          <Heading level={1} theme="light" align="center">Welcome Hunter</Heading>

          <form className="mt-2 flex flex-col p-6" onSubmit={handleSubmit}>
            <label htmlFor="email" className="text-light">
              Email
            </label>
            <input
              className="py-2 px-4 rounded-md focus:outline-none focus:ring-2"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="password" className="mt-6 text-light">
              Password
            </label>
            <input
              className="py-2 px-4 rounded-md focus:outline-none focus:ring-2"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              className="mt-10 text-lg text-primary font-semibold bg-light py-3 px-6 rounded-md focus:outline-none focus:ring-2"
              type="submit"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
};

export default Admin;