import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import CloseIcon from "@mui/icons-material/Close";
import PhoneIcon from "@mui/icons-material/Phone";
import VideocamIcon from "@mui/icons-material/Videocam";
import { Avatar, IconButton } from "@mui/material";
import { useAppDispatch } from "common/hooks";
import { chatActions } from "common/services/chatService/chatSlice";
import { UserType } from "types";

interface Props {
  userTo: Pick<UserType, "id" | "firstName" | "lastName" | "imageUrl">;
}

const ChatScreenTop = ({ userTo }: Props) => {
  // Hooks
  const dispatch = useAppDispatch();

  return (
    <div className="bg-white shadow-md p-2 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <div className="user-img">
          {userTo.imageUrl ? (
            <Avatar
              sx={{
                m: 1,
                bgcolor: "orange",
                margin: "auto",
                width: 32,
                height: 32,
              }}
              alt="avatar"
              src={userTo.imageUrl}
            />
          ) : (
            <AccountCircleOutlinedIcon style={{ fontSize: "28px" }} />
          )}
        </div>
        <div className="">
          <span className="font-semibold">
            {userTo.firstName} {userTo.lastName}
          </span>
        </div>
      </div>
      <div className="flex items-center">
        <IconButton size="small" aria-label="phone-call">
          <PhoneIcon style={{ fontSize: "24px", color: "#e0e0e0" }} />
        </IconButton>
        <IconButton size="small" aria-label="video-call">
          <VideocamIcon style={{ fontSize: "24px", color: "#e0e0e0" }} />
        </IconButton>
        <IconButton
          onClick={() => {
            dispatch(chatActions.removeConversation());
          }}
          size="small"
          aria-label="close-chat-screen"
        >
          <CloseIcon style={{ fontSize: "24px", color: "#e0e0e0" }} />
        </IconButton>
      </div>
    </div>
  );
};

export default ChatScreenTop;
