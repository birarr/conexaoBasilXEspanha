import { Properties } from "@/app/_types/notion";
import Image from "next/image";
import noImage from "../../../../public/assets/no_image.jpg";
import Link from "next/link";

interface BlogPostCardProps {
  id: string;
  title: string;
  description: string | undefined;
  slug: string;
  tags: string[];
  createdAt: string;
  bannerImage: string;
}

export const Test = ({
  id,
  title,
  description,
  slug,
  tags,
  createdAt,
  bannerImage,
}: BlogPostCardProps) => {
  return (
    <div>
      <li key={id} className="mb-3">
        {bannerImage ? (
          <Image src={bannerImage} alt="post" width={250} height={250} />
        ) : (
          <Image src={noImage} alt="post" width={250} height={250} />
        )}
        <Link href={`/blog/${slug}`}>{title}</Link>
        <div className="space-x-2">
          {tags?.map((tag) => (
            <span key={tag} className="text-sm text-slate-400">
              #{tag}
            </span>
          ))}
        </div>

        <p>{new Intl.DateTimeFormat("pt-BR")?.format(new Date(createdAt))}</p>
      </li>
    </div>
  );
};
