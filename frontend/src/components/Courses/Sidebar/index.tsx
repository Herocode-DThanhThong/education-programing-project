import Diversity3Icon from "@mui/icons-material/Diversity3";
import GroupsIcon from "@mui/icons-material/Groups";
import HomeIcon from "@mui/icons-material/Home";
import LightModeIcon from "@mui/icons-material/LightMode";
import RouteIcon from "@mui/icons-material/Route";
import { useLocation } from "react-router";
import classnames from "classnames";
import { NavLink } from "react-router-dom";
import ChatGPT from "components/ChatGPT";
interface Props {}

const Sidebar = (props: Props) => {
  const { pathname } = useLocation();

  return (
    <div className="fixed top-[64px] bottom-0 px-2 py-4 bg-white shadow-md w-[120px]">
      <NavLink to={"/"}>
        <div
          className={
            classnames({ "bg-[#e8ebed]": pathname === "/" }) +
            " flex items-center gap-1 px-6 flex-col p-4 rounded-lg text-gray-700 hover:bg-[#e8ebed] transition-all ease-in-out duration-300"
          }
        >
          <HomeIcon fontSize="medium" />
          <p className="text-[12px] font-semibold text-center">Trang chủ</p>
        </div>
      </NavLink>
      <NavLink to={"/learn"}>
        <div
          className={
            classnames({
              "bg-[#e8ebed]":
                pathname === "/learn" ||
                pathname.startsWith("/course/") ||
                pathname.startsWith("/learning/course/"),
            }) +
            " my-4 flex items-center gap-1 px-6 flex-col p-4 rounded-lg text-gray-700 hover:bg-[#e8ebed] transition-all ease-in-out duration-300"
          }
        >
          <LightModeIcon fontSize="medium" />
          <p className="text-[12px] font-semibold text-center">Học</p>
        </div>
      </NavLink>
      <NavLink to={"/road-map"}>
        <div
          className={
            classnames({ "bg-[#e8ebed]": pathname === "/road-map" }) +
            " my-4 flex items-center gap-1 px-6 flex-col p-4 rounded-lg text-gray-700 hover:bg-[#e8ebed] transition-all ease-in-out duration-300"
          }
        >
          <RouteIcon fontSize="medium" />
          <p className="text-[12px] font-semibold text-center">Lộ trình</p>
        </div>
      </NavLink>
      <NavLink to={"/community"}>
        <div
          className={
            classnames({ "bg-[#e8ebed]": pathname.includes("/community") }) +
            " my-4 flex items-center gap-1 px-6 flex-col p-4 rounded-lg text-gray-700 hover:bg-[#e8ebed] transition-all ease-in-out duration-300"
          }
        >
          <GroupsIcon fontSize="medium" />
          <p className="text-[12px] font-semibold text-center">Cộng đồng</p>
        </div>
      </NavLink>
      <NavLink to={"/friends"}>
        <div
          className={
            classnames({ "bg-[#e8ebed]": pathname === "/friends" }) +
            " my-4 flex items-center gap-1 px-6 flex-col p-4 rounded-lg text-gray-700 hover:bg-[#e8ebed] transition-all ease-in-out duration-300"
          }
        >
          <Diversity3Icon fontSize="medium" />
          <p className="text-[12px] font-semibold text-center">Bạn bè</p>
        </div>
      </NavLink>
    </div>
  );
};

export default Sidebar;
