import { format, setDefaultOptions } from "date-fns";
import Image from "next/image";
import { ptBR } from "date-fns/locale";

export interface BlogCardProps {
  bannerImage: string;
  title: string;
  author?: string;
  content?: string;
  createdAt: string;
  description?: string;
}

export const BlogCard: React.FC<BlogCardProps> = ({
  bannerImage,
  title,
  content,
  createdAt,
  description,
  author,
}) => {
  setDefaultOptions({ locale: ptBR });
  const date = new Date(createdAt);
  const dateFormatted = format(new Date(date), "d MMMM yyy");

  return (
    <div className="h-full rounded-xl">
      <div className="relative flex max-w-[24rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-2xl rounded-xl">
        <div className="relative max-h-72 rounded-t-xl m-0 overflow-hidden rounded-none bg-transparent bg-clip-border text-gray-700 shadow-none">
          <Image
            src={bannerImage}
            alt="post"
            width={300}
            height={300}
            sizes="100vw"
            style={{
              width: "100%",
              height: "auto",
            }}
          />
        </div>
        <div className="p-6">
          <h4 className="block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
            {title}
          </h4>
          <p className="mt-3 block font-sans text-xl font-normal leading-relaxed text-gray-700 antialiased overflow-hidden">
            {description}
          </p>
        </div>
        <div className="flex items-center justify-between p-6">
          {/* <div className="flex items-center -space-x-3">
            <Image
              alt="natali craig"
              src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1061&amp;q=80"
              className="relative inline-block h-9 w-9 rounded-full border-2 border-white object-cover object-center hover:z-10"
              data-tooltip-target="author-1"
              width={250}
              height={250}
            />
            <Image
              alt="tania andrew"
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1480&amp;q=80"
              className="relative inline-block h-9 w-9 rounded-full border-2 border-white object-cover object-center hover:z-10"
              data-tooltip-target="author-2"
              width={250}
              height={250}
            />
          </div> */}
          <div className="flex justify-between w-full">
            <p className="block font-sans text-base font-normal leading-relaxed text-inherit antialiased">
              Por: {author}
            </p>
            <p className="block font-sans text-base font-normal leading-relaxed text-inherit antialiased">
              {dateFormatted}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
