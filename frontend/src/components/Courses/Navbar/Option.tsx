import { NavLink } from "react-router-dom";
import Notification from "./Notification";
import Settings from "./Settings";

interface Props {}

const Option = (props: Props) => {
  return (
    <div className="flex items-center">
      <NavLink
        to={"/my-course"}
        className="text-gray-500 font-semibold cursor-pointer hover:text-blue-700"
      >
        Khóa học của tôi
      </NavLink>

      {/* Notification + Chat  */}
      <div>
        <Notification />
      </div>

      {/* Settings */}
      <Settings />
    </div>
  );
};

export default Option;
