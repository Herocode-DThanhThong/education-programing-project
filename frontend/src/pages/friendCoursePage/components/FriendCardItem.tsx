import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Avatar } from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { idUser } from "common/services/authService/authSlice";
import { chatActions } from "common/services/chatService/chatSlice";
import { useNavigate } from "react-router-dom";
import { UserType } from "types";

interface Props {
  friend: UserType;
}

const Friend = ({ friend }: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const idUserLoggedIn = useAppSelector(idUser);
  return (
    <div className="w-full h-[150px] flex items-center justify-center rounded-md border shadow-lg">
      <div className="">
        <div className="">
          <div className="flex gap-2 items-center">
            <div className="relative inline-flex items-center justify-center w-10 h-8 overflow-hidden bg-gray-100 rounded-full">
              {friend.imageUrl ? (
                <Avatar
                  sx={{
                    m: 1,
                    bgcolor: "orange",
                    margin: "auto",
                    width: 32,
                    height: 32,
                  }}
                  alt="avatar"
                  src={friend.imageUrl}
                />
              ) : (
                <AccountCircleOutlinedIcon style={{ fontSize: "28px" }} />
              )}
            </div>
            <p className="font-semibold text-black">
              {friend.firstName + " " + friend.lastName}{" "}
            </p>
          </div>

          <div className="flex gap-2 items-center">
            <button
              onClick={() => {
                navigate(`/community/userPost/${friend.id}`);
              }}
              className="text-black mt-4 px-4 py-2 border rounded-md text-sm shadow-lg transition-all ease-in-out duration-300 hover:opacity-80"
            >
              Xem trang cá nhân
            </button>
            <button
              onClick={() => {
                dispatch(
                  chatActions.getDetailConversationRequest({
                    userIdOne: idUserLoggedIn as number,
                    userIdTwo: friend.id,
                  })
                );
              }}
              className="text-white bg-blue-500 mt-4 px-4 py-2 border rounded-md text-sm shadow-lg transition-all ease-in-out duration-300 hover:opacity-80"
            >
              Nhắn tin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Friend;
