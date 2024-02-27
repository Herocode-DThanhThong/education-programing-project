import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";
type Props = {
  isChatGPTTyping: boolean;
  sendMessageToChatGPT: (content: string) => Promise<void>;
};

const ChatGPTScreenBottom = ({
  isChatGPTTyping,
  sendMessageToChatGPT,
}: Props) => {
  const [content, setContent] = useState("");
  return (
    <div className="p-2 border-t-[1px] flex items-center">
      <input
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            if (content && !isChatGPTTyping) {
              sendMessageToChatGPT(content);
              setContent("");
            }
          }
        }}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="outline-none flex items-center h-10 w-full rounded px-3 text-sm"
        type="text"
        placeholder={"Nhập tin nhắn"}
      />
      <button
        disabled={isChatGPTTyping || !content}
        onClick={() => {
          sendMessageToChatGPT(content);
          setContent("");
        }}
      >
        <SendIcon style={{ fontSize: "24px", color: "#3f51b5" }} />
      </button>
    </div>
  );
};

export default ChatGPTScreenBottom;
