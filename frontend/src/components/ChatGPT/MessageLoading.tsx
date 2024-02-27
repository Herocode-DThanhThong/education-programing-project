import { Avatar } from "@mui/material";
import ChatGPTImage from "assests/images/chatgpt-logo.jpg";
import TypingLoading from "components/Loading/TypingLoading";

const MessageLoading = () => {
  return (
    <div className="flex w-full mt-2 space-x-3 max-w-xs">
      <div className="user-img">
        <Avatar
          sx={{
            width: 28,
            height: 28,
            m: 1,
            bgcolor: "orange",
            margin: "auto",
          }}
          alt="avatar"
          src={ChatGPTImage}
        />
      </div>
      <div className={`py-4 px-2 shadow-lg border rounded-r-lg rounded-bl-lg`}>
        <TypingLoading />
      </div>
    </div>
  );
};

export default MessageLoading;
