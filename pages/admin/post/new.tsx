import { NextPage } from "next";
import { useRouter } from "next/router";
import { MouseEventHandler, useEffect, useRef, useState } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "../../../utils/client";
import { Section } from "../../../components/layout/section";
import { Heading } from "../../../components/ui/heading";
import { Wysiwyg } from "../../../components/editor/wysiwyg";

const NewPost: NextPage = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>();
  const [body, setBody] = useState<string | undefined>("");
  const title = useRef<HTMLInputElement>(null);
  const description = useRef<HTMLInputElement>(null);
  const image = useRef<HTMLInputElement>(null);
  const tags = useRef<HTMLInputElement>(null);
  const path = useRef<HTMLInputElement>(null);

  const handleLogOut: MouseEventHandler = async (e) => {
    e.preventDefault();

    const { error } = await supabase.auth.signOut();

    if (error) {
      alert(JSON.stringify(error));
    } else {
      router.push("/");
    }
  };

  const handleSubmit: MouseEventHandler = async (e) => {
    e.preventDefault();
    let tagList, titleVal, descriptionVal, imageVal, pathVal;
    if (tags.current !== null) {
      tagList = tags.current.value.split(",");
    }
    if (title.current !== null) {
      titleVal = title.current.value;
    }
    if (description.current !== null) {
      descriptionVal = description.current.value;
    }
    if (image.current !== null) {
      imageVal = image.current.value;
    }
    if (path.current !== null) {
      pathVal = path.current.value;
    }

    const { error, data } = await supabase.from("posts").insert({
      title: titleVal,
      description: descriptionVal,
      tags: tagList,
      image: imageVal,
      path: pathVal,
      body,
    });

    if (error) {
      alert(JSON.stringify(error));
    } else {
      router.push(`/blog/${pathVal}`);
    }
  };

  useEffect(() => {
    const getProfile = () => {
      const profile = supabase.auth.user();

      if (profile) {
        setUser(profile);
      } else {
        router.push("/admin");
      }
    };

    getProfile();
  }, []);

  if (!user) {
    // Currently loading asynchronously User Supabase Information
    return null;
  }
  return (
    <>
      <Section>
        <div className="flex justify-between items-center flex-col lg:flex-row">
          <div>
            <Heading level={1}>Create New Blog Post</Heading>
            <Heading level={2} theme="secondary">
              Best of luck good sir.
            </Heading>
          </div>
          <div className="flex justify-start w-full pt-4 lg:pt-0 lg:w-auto lg:flex-col">
            <button
              className="mt-6 text-lg text-white font-semibold bg-green-500 py-3 px-6 rounded-md focus:outline-none focus:ring-2"
              onClick={handleLogOut}
            >
              Log out
            </button>
          </div>
        </div>
      </Section>
      <Section theme="none">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Post Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            placeholder="Garfield 2: A Tail of Two Kitties"
            ref={title}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Post Description
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            type="text"
            ref={description}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="image"
          >
            Featured Image
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="image"
            type="text"
            ref={image}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="tags"
          >
            Tags (seperated by comma)
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="tags"
            type="text"
            ref={tags}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="path"
          >
            Post Slug
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="path"
            type="text"
            ref={path}
          />
        </div>
        <Wysiwyg setBody={setBody} body={body} />
        <button
          className="mt-6 text-lg bg-primary block text-light font-semibold bg-green-500 py-3 px-6 rounded-md focus:outline-none focus:ring-2"
          onClick={handleSubmit}
        >
          Create Post
        </button>
      </Section>
    </>
  );
};

export default NewPost;
