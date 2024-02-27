import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { UserType } from "types";

interface Props {
  user: UserType;
}

const Messenger = ({ user }: Props) => {
  return (
    <div className="w-full py-2 px-3 flex items-center gap-2 rounded-md cursor-pointer ease-in-out duration-300 transition-all hover:bg-gray-100">
      <div className="user-img">
        <AccountCircleOutlinedIcon style={{ fontSize: "28px" }} />
      </div>
      <div className="w-[80%]">
        <p className="truncate text-sm">
          {user.firstName} {user.lastName}
        </p>
      </div>
    </div>
  );
};

export default Messenger;
