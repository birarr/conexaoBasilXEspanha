"use client";

import { TextForm } from "@/app/components/text-form/text-form";
import ImageInput from "@/app/components/utils/image-input/image-input";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { addNotionPageToDatabase } from "@/app/_services/notion";
import { AdminLogin } from "./admin-login";

export const PostForm = () => {
  const router = useRouter();
  const [pageTitle, setPageTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [bannerImage, setBannerImage] = useState("");
  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");
  const [description, setDescription] = useState("");
  const [matchPassword, setMatchPassword] = useState(false);

  useEffect(() => {
    if (pageTitle) {
      let wordsArray = pageTitle.split(" ");
      let hyphenatedSentence = wordsArray.join("-");

      setSlug(hyphenatedSentence);
    }
  }, [pageTitle]);

  const sendPost = useCallback(() => {
    addNotionPageToDatabase(
      pageTitle,
      slug,
      description,
      bannerImage,
      text,
      author
    );
    router?.push("/");
    router?.refresh();
  }, [author, bannerImage, description, pageTitle, router, slug, text]);

  const renderForm = useMemo(() => {
    if (matchPassword) {
      return (
        <div className="flex items-center justify-center w-full bg-backgroundBg">
          <div className="w-full flex flex-col gap-4 items-center justify-center m-8 p-4 bg-white bg-clip-border text-gray-700 shadow-2xl rounded-xl">
            <h1 className="text-2xl">Novo post</h1>
            <div className="block text-grey-darker text-sm font-bold mb-2 w-11/12">
              <p>Título</p>
              <input
                type="text"
                className="shadow mt-1 appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                onChange={(e) => setPageTitle(e?.target?.value)}
              />
            </div>
            {/* <div className="block text-grey-darker text-sm font-bold mb-2 w-11/12">
          <p>Slug</p>
          <input
            type="text"
            className="mt-1 hadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
          />
        </div> */}
            <div className="block text-grey-darker text-sm font-bold mb-2 w-11/12">
              <p>Descrição</p>
              <textarea
                name=""
                id=""
                cols={3}
                rows={2}
                placeholder="Tell us about desired property"
                className="border p-2 mt-1 w-full font-normal"
                onChange={(e) => setDescription(e?.target?.value)}
              ></textarea>
            </div>
            <div className="block text-grey-darker text-sm font-bold mb-2 w-11/12">
              {/* <TextForm setText={setText} /> */}
              <p>Conteúdo</p>
              <textarea
                name=""
                id=""
                cols={3}
                rows={2}
                placeholder="Tell us about desired property"
                className="border p-2 mt-1 w-full font-normal"
                onChange={(e) => setText(e?.target?.value)}
              ></textarea>
            </div>
            <div className="mb-6 pt-4 w-11/12">
              <label className="mb-5 block text-xl font-semibold text-[#07074D]">
                Upload File
              </label>
              <ImageInput setBannerImage={setBannerImage} />
            </div>
            <div className="my-8 flex flex-col justify-center w-11/12">
              <label htmlFor="author"> Autor</label>
              <select
                name="author"
                id="author"
                className="my-2 border shadow rounded-md p-2"
                value={author}
                onChange={(e) => setAuthor(e?.target?.value)}
              >
                <option disabled defaultValue={"Select..."}>
                  {" "}
                  -- select an option --{" "}
                </option>
                <option value="" disabled>
                  Select...
                </option>
                <option value="Ubiratan">Ubiratan</option>
                <option value="Mar">Mar</option>
                <option value="Cássia">Cássia</option>
                <option value="Rodolfo">Rodolfo</option>
              </select>
            </div>
            <button
              className="bg-black p-4 rounded-md text-white"
              onClick={sendPost}
            >
              Salvar
            </button>
          </div>
        </div>
      );
    } else {
      return <AdminLogin setMatchPassword={setMatchPassword} />;
    }
  }, [author, matchPassword, sendPost]);

  return <>{renderForm}</>;
};
