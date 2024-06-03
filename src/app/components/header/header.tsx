// import siteMetadata from "../site-meta-data/siteMetadata";
// import Logo from "@/data/logo.svg";
// import MobileNav from "./MobileNav";
import Link from "next/link";
// import { ThemeSwitcher } from "../theme-switcher/theme-switcher";
// import SearchButton from "./SearchButton";

const headerNavLinks = [
  { href: "/", title: "Home" },
  { href: "/blog", title: "Blog" },
  { href: "/tags", title: "Tags" },
  { href: "/projects", title: "Projects" },
  { href: "/about", title: "About" },
  { href: "/admin", title: "Admin" },
];

const Header = () => {
  return (
    <header className="md:flex items-center justify-between pt-10 md:pb-10 bg-backgroundBg text-black">
      <div>
        <Link href={`/blog`}>
          <h1 className="ml-12 text-3xl font-bold">Conexão Brasil x Espanha</h1>
        </Link>
      </div>
      <div className="flex w-full md:w-5/12 justify-center mt-4 md:mt-0 items-center space-x-4 leading-5 sm:space-x-6 ">
        {headerNavLinks
          .filter((link) => link.href !== "/")
          .map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="font-medium sm:block"
            >
              {link.title}
            </Link>
          ))}
        {/* <SearchButton /> */}
        {/* <MobileNav /> */}
      </div>
    </header>
  );
};

export default Header;
