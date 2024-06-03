"use server";
import { Client } from "@notionhq/client";
import { ButtonTest } from "./components/ButtonTest";
// import { addNotionPageToDatabase } from "@/app/_services/notion";

export default async function Page() {
  async function create(formData: FormData) {
    "use server";

    // mutate data
    // revalidate cache
  }

  // addNotionPageToDatabase();

  async function addNotionPageToDatabase() {
    "use server";
    const notionClient = new Client({
      auth: process.env.NOTION_TOKEN,
    });

    const pageProperties = {
      Title: {
        type: "title",
        title: [{ type: "text", text: { content: "test 999" } }],
      },
      Slug: {
        type: "rich_text",
        rich_text: [
          {
            type: "text",
            text: {
              content: "sluggg",
              link: null,
            },
            plain_text: "",
            href: null,
          },
        ],
      },
      BannerImage: {
        type: "url",
        url: "https://images.unsplash.com/photo-1716042540023-9df12e865749?q=80&w=3164&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    };

    const newPage = await notionClient?.pages?.create({
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
                  content: "texttttttt",
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
  }

  return (
    <div>
      <div>hahaha</div>
      <ButtonTest addNotionPageToDatabase={addNotionPageToDatabase} />
    </div>
  );
}
