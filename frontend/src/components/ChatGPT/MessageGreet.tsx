import { Avatar } from "@mui/material";
import ChatGPTImage from "assests/images/chatgpt-logo.jpg";
const MessageGreet = () => {
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

      <div className={`p-3 shadow-lg border rounded-r-lg rounded-bl-lg`}>
        <p className="text-sm text-left">
          Xin chào, tôi có thể giúp gì cho bạn ?
        </p>
      </div>
    </div>
  );
};

export default MessageGreet;
