import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import {
  HiOutlineCog,
  HiOutlineCube,
  HiOutlineDocumentText,
} from "react-icons/hi";
import { Link } from "react-router-dom";
export default function LinkExpand() {
  return (
    <div className="my-2">
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex items-center w-full gap-2 relative rounded-lg px-3 py-2 text-left text-sm font-medium">
              <span className="text-neutral-400 text-xl">
                <HiOutlineCube />
              </span>

              <span className="text-neutral-400">Quản lý khóa học</span>
              <ChevronUpIcon
                className={`absolute right-2 ${
                  open ? "  rotate-180 transform" : ""
                } h-5 w-5 text-gray-500`}
              />
            </Disclosure.Button>
            <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
              <Link to={"/"}>
                <p className={"text-neutral-400 flex items-center gap-1"}>
                  <span className="text-xl">
                    <HiOutlineDocumentText />
                  </span>
                  <span>Danh sách khóa học</span>
                </p>
              </Link>
            </Disclosure.Panel>
            <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
              <Link to={"/"}>
                <p className={"text-neutral-400 flex items-center gap-1"}>
                  <span className="text-xl">
                    <HiOutlineCog />
                  </span>
                  <span>Quản lý chương</span>
                </p>
              </Link>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
}
