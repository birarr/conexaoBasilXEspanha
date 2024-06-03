import Link from "next/link";
import { NotionDatabaseResponse } from "../_types/notion";
import { Client } from "@notionhq/client";
import noImage from "../../../public/assets/no_image.jpg";
import BlogPostCard from "../components/blog-post-card/blog-post-card";
import { getPosts } from "../_services/notion";
import { Test } from "../components/test/test";
import { BlogCard } from "../components/blog-card/blog-card";

export default async function BlogHome() {
  const posts = await getPosts();

  return (
    <div className="w-full min-h-screen">
      <div className=" bg-backgroundBg p-6 min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-4xl py-6 text-black">Blog</h1>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-2 items-center mb-4">
          {posts?.map((item) => {
            return (
              <Link href={`blog/${item?.slug}`} key={item?.id}>
                <BlogCard
                  title={item?.title}
                  bannerImage={item?.bannerImage}
                  createdAt={item?.createdAt}
                  description={item?.description}
                  author={item?.author}
                />
              </Link>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
