"use server";
import { Client } from "@notionhq/client";
import { NotionDatabaseResponse } from "../_types/notion";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { NotionToMarkdown } from "notion-to-md";
import { useRouter } from "next/navigation";

const notionClient = new Client({
  auth: process.env.NOTION_TOKEN,
});
const DATABASE_ID = process.env.NOTION_DATABASE_ID!;

export async function getPosts() {
  const response = await notionClient.databases.query({
    database_id: DATABASE_ID,
    sorts: [
      {
        property: "Date",
        direction: "ascending",
      },
    ],
  });

  const typedResponse = response as unknown as NotionDatabaseResponse;
  console.log(typedResponse?.results?.[0]?.properties?.Title);
  return typedResponse?.results.map((post) => {
    return {
      id: post?.id,
      title: post?.properties?.Title?.title?.[0]?.plain_text,
      description: post?.properties?.Description?.rich_text?.[0]?.plain_text,
      slug: post?.properties?.Slug?.rich_text?.[0]?.plain_text,
      tags: post?.properties?.tags?.multi_select?.map((tag) => tag?.name),
      createdAt: post?.created_time,
      author: post?.properties?.Author?.rich_text?.[0]?.plain_text,
      bannerImage: post?.properties?.BannerImage?.url,
    };
  });
}

export const getPageBySlug = (slug: string) => {
  return notionClient.databases
    .query({
      database_id: process.env.NOTION_DATABASE_ID!,
      filter: {
        property: "Slug",
        rich_text: {
          equals: slug,
        },
      },
    })
    .then((res) => res.results[0] as PageObjectResponse | undefined);
};

export async function getPost(slug: string) {
  console.log({ slug });
  const response = await notionClient.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    filter: {
      or: [
        {
          property: "Slug",
          rich_text: {
            equals: slug,
          },
        },
      ],
    },
  });

  const pageId = response?.results?.[0]?.id;

  const n2m = new NotionToMarkdown({ notionClient: notionClient });

  const mdblocks = await n2m?.pageToMarkdown(pageId);
  const mdString = n2m?.toMarkdownString(mdblocks);

  const typedResponse = response as unknown as NotionDatabaseResponse;

  return {
    title: typedResponse.results[0].properties.Title.title[0].plain_text,
    postImage: (typedResponse.results[0].properties?.BannerImage as any)?.url,

    content: mdString.parent,
  };
}

export async function addNotionPageToDatabase(
  pageTitle,
  slug,
  description,
  bannerImage,
  text,
  author
) {
  // const notionClient = new Client({
  //   auth: process.env.NOTION_TOKEN,
  // });

  const pageProperties = {
    Title: {
      type: "title",
      title: [{ type: "text", text: { content: pageTitle } }],
    },
    Slug: {
      type: "rich_text",
      rich_text: [
        {
          type: "text",
          text: {
            content: slug,
            link: null,
          },
          plain_text: "",
          href: null,
        },
      ],
    },
    Description: {
      type: "rich_text",
      rich_text: [
        {
          type: "text",
          text: {
            content: description,
            link: null,
          },
          plain_text: "",
          href: null,
        },
      ],
    },
    Author: {
      type: "rich_text",
      rich_text: [
        {
          type: "text",
          text: {
            content: author,
            link: null,
          },
          plain_text: "",
          href: null,
        },
      ],
    },
    BannerImage: {
      type: "url",
      url: bannerImage,
    },
  };
  console.log({ notionClient });
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
                content: text,
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
