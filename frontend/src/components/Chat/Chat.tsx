import { useAppSelector } from "common/hooks";
import { currentConversation } from "common/services/chatService/chatSlice";
import { ChatScreen } from "./ChatScreen";

type Props = {};

const Chat = (props: Props) => {
  const currentConverstationData = useAppSelector(currentConversation);
  return (
    <>
      {currentConverstationData && (
        <ChatScreen
          // Space right = width (350) + space with scroll left(24) + space betweend 2 screen (12)
          spaceRight={24}
          // Data binding
          conversationDetail={currentConverstationData}
        />
      )}
    </>
  );
};

export default Chat;
