// import { getPost } from "@/app/_services/notion";
import ReactMarkdown from "react-markdown";
import { Client } from "@notionhq/client";
import { NotionDatabaseResponse } from "@/app/_types/notion";
import { NotionToMarkdown } from "notion-to-md";
import Image from "next/image";
import { getPost } from "@/app/_services/notion";
import rehypeRaw from "rehype-raw";
import { Markup } from "react-render-markup";

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const notionClient = new Client({
    auth: process.env.NOTION_TOKEN,
  });

  const post = await getPost(params?.slug);

  console.log(post?.content);
  const article = post?.content;

  return (
    <div className="w-full bg-backgroundBg min-h-screen">
      <div className="m-auto max-w-2xl bg-white p-6 min-h-screen">
        <h1 className="text-4xl py-6 text-black font-bold	">{post.title}</h1>
        {post?.postImage && (
          <Image src={post?.postImage} alt="post" width={500} height={500} />
        )}
        <ReactMarkdown
          components={{
            h2: ({ node, ...props }) => (
              <h2 className="text-2xl text-blue-700" {...props} />
            ),
          }}
          className={"my-8"}
        >
          {post.content}
          {/* <Markup markup={post?.content} /> */}
        </ReactMarkdown>
      </div>
    </div>
  );
}
