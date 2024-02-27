import { NavLink } from "react-router-dom";
import LogoImg from "assests/images/logo.png";

interface Props {}

const Logo = (props: Props) => {
  return (
    <NavLink to={"/"} className="flex items-center">
      <img src={LogoImg} className="h-8 mr-3 rounded-md" alt="Flowbite Logo" />
      <span className="text-black font-semibold self-center text-sm whitespace-nowrap ">
        FREE ITs
      </span>
    </NavLink>
  );
};

export default Logo;
