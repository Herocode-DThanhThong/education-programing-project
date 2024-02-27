import classNames from "classnames";
import { FcBullish } from "react-icons/fc";
import {
  HiOutlineCog,
  HiOutlineCube,
  HiOutlineDocumentText,
  HiOutlineLogout,
  HiOutlineUsers,
} from "react-icons/hi";
import { TbRoute } from "react-icons/tb";
import { Link, useLocation } from "react-router-dom";
import { DASHBOARD_SIDEBAR_BOTTOM_LINKS } from "../../lib/constants";
import LogoImg from "assests/images/logo.png";

const linkClass =
  "flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base";

export default function Sidebar() {
  const { pathname } = useLocation();
  return (
    <div className="bg-neutral-900 w-60 p-3 flex flex-col">
      <div className="flex items-center gap-2 px-1 py-3">
        <img src={LogoImg} alt="" className="w-10 h-10 rounded-md" />
        <span className="text-neutral-200 text-lg">FREE ITs</span>
      </div>
      <div className="py-2 flex flex-1 flex-col gap-0.5">
        <Link
          to={"/admin/dashboard"}
          className={classNames(
            pathname === "/admin/dashboard"
              ? "bg-neutral-700 text-white"
              : "text-neutral-400",
            linkClass
          )}
        >
          <span className="text-xl">
            <HiOutlineCube />
          </span>
          Thống kê
        </Link>

        <Link
          to={"/admin/users"}
          className={classNames(
            pathname.includes("/admin/users")
              ? "bg-neutral-700 text-white my-2"
              : "text-neutral-400 my-2",
            linkClass
          )}
        >
          <span className="text-xl">
            <HiOutlineUsers />
          </span>
          Quản lý Người dùng
        </Link>

        <Link
          to={"/admin/study-path"}
          className={classNames(
            pathname.includes("/admin/study-path")
              ? "bg-neutral-700 text-white my-2"
              : "text-neutral-400 my-2",
            linkClass
          )}
        >
          <span className="text-xl">
            <TbRoute />
          </span>
          Quản lý lộ trình
        </Link>

        <Link
          to={"/admin/courses"}
          className={classNames(
            pathname.includes("/admin/courses")
              ? "bg-neutral-700 text-white my-2"
              : "text-neutral-400 my-2",
            linkClass
          )}
        >
          <span className="text-xl">
            <HiOutlineCube />
          </span>
          Quản lý khóa học
        </Link>

        <Link
          to={"/admin/chapter"}
          className={classNames(
            pathname.includes("/admin/chapter")
              ? "bg-neutral-700 text-white my-2"
              : "text-neutral-400 my-2",
            linkClass
          )}
        >
          <span className="text-xl">
            <HiOutlineCog />
          </span>
          Quản lý chương
        </Link>

        <Link
          to={"/admin/lesson"}
          className={classNames(
            pathname.includes("/admin/lesson")
              ? "bg-neutral-700 text-white my-2"
              : "text-neutral-400 my-2",
            linkClass
          )}
        >
          <span className="text-xl">
            <HiOutlineDocumentText />
          </span>
          Quản lý bài học
        </Link>
      </div>
    </div>
  );
}
