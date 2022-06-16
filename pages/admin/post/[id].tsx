import { NextPage } from "next";
import { useRouter } from "next/router";
import { MouseEventHandler, useEffect, useRef, useState } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "../../../utils/client";
import { Section } from "../../../components/layout/section";
import { Heading } from "../../../components/ui/heading";
import { Wysiwyg } from "../../../components/editor/wysiwyg";

const UpdatePost: NextPage = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>();
  const [body, setBody] = useState<string | undefined>();
  const title = useRef<HTMLInputElement>(null);
  const description = useRef<HTMLInputElement>(null);
  const image = useRef<HTMLInputElement>(null);
  const tags = useRef<HTMLInputElement>(null);
  const path = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);

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
    const { id } = router.query;
    let tagList, titleVal, descriptionVal, imageVal, pathVal, bodyVal;
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
    if (bodyRef.current !== null) {
      bodyVal = bodyRef.current.value;
    }

    const { error, data } = await supabase
      .from("posts")
      .update({
        title: titleVal,
        description: descriptionVal,
        tags: tagList,
        image: imageVal,
        path: pathVal,
        body: bodyVal,
      })
      .match({ id: id });

    if (error) {
      alert(JSON.stringify(error));
    } else {
      router.push(`/blog/${pathVal}`);
    }
  };

  useEffect(() => {
    if (!router.isReady) return;
    const { id } = router.query;

    const getFieldInfo = async () => {
      const { data } = await supabase.from("posts").select().eq("id", id);
      console.log(data);
      if (data) {
        if (title.current) {
          title.current.value = data[0].title;
        }
        if (description.current) {
          description.current.value = data[0].description;
        }
        if (image.current) {
          image.current.value = data[0].image;
        }
        if (path.current) {
          path.current.value = data[0].path;
        }
        if (tags.current) {
          tags.current.value = data[0].tags.join(",");
        }
        if (bodyRef.current) {
          bodyRef.current.value = data[0].body;
        }
      }
    };

    const getProfile = () => {
      const profile = supabase.auth.user();

      if (profile) {
        setUser(profile);
      } else {
        router.push("/admin");
      }
    };

    getProfile();
    getFieldInfo();
  }, [router.isReady]);

  if (!user) {
    // Currently loading asynchronously User Supabase Information
    return null;
  }
  return (
    <>
      <Section>
        <div className="flex justify-between flex-col lg:flex-row">
          <div>
            <Heading level={1}>Update Blog Post</Heading>
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
        <textarea className="w-full border-primary border-2" name="body" rows={30} cols={30} ref={bodyRef} />
        <button
          className="mt-6 text-lg bg-primary block text-light font-semibold bg-green-500 py-3 px-6 rounded-md focus:outline-none focus:ring-2"
          onClick={handleSubmit}
        >
          Update Post
        </button>
      </Section>
    </>
  );
};

export default UpdatePost;
