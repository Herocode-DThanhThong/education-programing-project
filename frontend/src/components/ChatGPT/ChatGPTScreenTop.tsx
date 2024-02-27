import CloseIcon from "@mui/icons-material/Close";
import { Avatar, IconButton } from "@mui/material";
import ChatGPTImage from "assests/images/chatgpt-logo.jpg";
type Props = {
  isChatGPTTyping: boolean;
  hideChat: () => void;
};
const ChatGPTScreenTop = ({ isChatGPTTyping, hideChat }: Props) => {
  return (
    <div className="bg-white shadow-md p-2 flex justify-between items-center">
      <div className="flex items-center gap-2">
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
        <div className="">
          <span className="font-semibold text-sm">Trợ lý FreeITs AI</span>
        </div>
      </div>
      <IconButton
        disabled={isChatGPTTyping}
        onClick={() => hideChat()}
        size="small"
        aria-label="phone-call"
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </div>
  );
};

export default ChatGPTScreenTop;
