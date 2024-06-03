// "use server";

// import { useEffect, useState } from "react";
import { TextForm } from "../components/text-form/text-form";
import ImageInput from "../components/utils/image-input/image-input";
import { Client } from "@notionhq/client";
import { useRouter } from "next/navigation";
import { addNotionPageToDatabase } from "../_services/notion";
import { PostForm } from "./component/PostForm";
import { useMemo } from "react";
import { AdminLogin } from "./component/admin-login";

export default async function Admin() {
  const addNotionPageToDatabase = async () => {
    "use server";
    const notionClient = new Client({
      auth: process.env.NOTION_TOKEN,
    });

    const pageProperties = {
      Title: {
        type: "title",
        title: [{ type: "text", text: { content: "test1234" } }],
      },
      Slug: {
        type: "rich_text",
        rich_text: [
          {
            type: "text",
            text: {
              content: "slugTest",
              link: null,
            },
            plain_text: "",
            href: null,
          },
        ],
      },
      BannerImage: {
        type: "url",
        url: "https://images.unsplash.com/photo-1715700704511-2ca4f2767ad3?q=80&w=3175&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    };

    const newPage = await notionClient.pages.create({
      parent: {
        database_id: process.env.NOTION_DATABASE_ID!,
      },
      properties: pageProperties as any,
      children: [
        {
          object: "block",
          type: "quote",
          quote: {
            rich_text: [
              {
                type: "text",
                text: {
                  content: "texto teste 1239389479304",
                },
              },
            ],
          },
        },
      ],
    });

    // router?.refresh();
    // router?.push("/blog");
    console.log({ newPage });
  };

  // addNotionPageToDatabase();
  return (
    <div className="flex items-center justify-center w-full bg-backgroundBg">
      <div className="w-full flex flex-col gap-4 items-center justify-center m-8 p-4 bg-white bg-clip-border text-gray-700 shadow-2xl rounded-xl">
        {/* <div className="block text-grey-darker text-sm font-bold mb-2 w-11/12">
          <p>Título</p>
          <input
            type="text"
            className="shadow mt-1 appearance-none border rounded w-full py-2 px-3 text-grey-darker"
          />
        </div>
        <div className="block text-grey-darker text-sm font-bold mb-2 w-11/12">
          <p>Slug</p>
          <input
            type="text"
            className="mt-1 hadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
          />
        </div>
        <div className="block text-grey-darker text-sm font-bold mb-2 w-11/12">
          <p>Descrição</p>
          <textarea
            name=""
            id=""
            cols={3}
            rows={2}
            placeholder="Tell us about desired property"
            className="border p-2 mt-1 w-full font-normal"
          ></textarea>
        </div>
        <div className="flex justify-center w-11/12">
          <TextForm setText={setText} />
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
          >
            <option disabled selected>
              {" "}
              -- select an option --{" "}
            </option>
            <option value="javascript">Ubiratan</option>
            <option value="python">Mar</option>
            <option value="c++">Cássia</option>
            <option value="java">Rodolfo</option>
          </select>
        </div> */}
        {/* <button
          className="bg-black p-4 rounded-md text-white"
          onClick={handleSubmit}
        >
          Salvar
        </button> */}
        <PostForm />
      </div>
    </div>
  );
}
