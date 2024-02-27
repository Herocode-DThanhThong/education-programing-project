import Logo from "./Logo";
import Option from "./Option";
import Search from "./Search";

interface Props {}

const Navbar = (props: Props) => {
  return (
    <nav className="sticky top-0 bg-white shadow-md h-[64px] z-[1000]">
      <div className="flex flex-wrap items-center justify-between gap-8 mx-auto py-2 px-4">
        <Logo />

        <Search />

        <Option />
      </div>
    </nav>
  );
};

export default Navbar;
