import { Avatar } from "@mui/material";
import ChatGPTImage from "assests/images/chatgpt-logo.jpg";
import { Button } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { useState } from "react";
import ChatGPTScreen from "./ChatGPTScreen";
type Props = {};

const ChatGPT = (props: Props) => {
  const [showChat, setShowChat] = useState(false);
  return (
    <div className="fixed bottom-8 left-7 z-[50]">
      {showChat && <ChatGPTScreen hideChat={() => setShowChat(false)} />}
      <Tooltip arrow title="Trợ lý FreeITs AI" placement="right-start">
        <Button
          onClick={() => setShowChat(true)}
          className="flex gap-2 items-center"
        >
          <Avatar
            sx={{
              width: 30,
              height: 30,
              m: 1,
              bgcolor: "orange",
              margin: "auto",
            }}
            alt="avatar"
            src={ChatGPTImage}
          />
        </Button>
      </Tooltip>
    </div>
  );
};

export default ChatGPT;
