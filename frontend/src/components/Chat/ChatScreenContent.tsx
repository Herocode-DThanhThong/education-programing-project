import { Conversation } from "types/ChatType";
import MessageReceive from "./Message/MessageReceive";
import MessageSend from "./Message/MessageSend";
import { useEffect, useRef } from "react";

interface Props {
  conversationDetail: Conversation;
  idUserLoggedIn: number | null;
}

const ChatScreenContent = ({ conversationDetail, idUserLoggedIn }: Props) => {
  const messageRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "end",
      });
    }
  }, [conversationDetail]);
  return (
    <div className="flex flex-col flex-grow h-0 px-4 overflow-auto">
      {idUserLoggedIn && (
        <>
          {conversationDetail.messages.map((mess, idx) => (
            <div key={mess.id}>
              {idUserLoggedIn === mess.user.id ? (
                <MessageSend mess={mess} />
              ) : (
                <MessageReceive mess={mess} />
              )}
            </div>
          ))}
          <div className="my-2" ref={messageRef}></div>
        </>
      )}
    </div>
  );
};

export default ChatScreenContent;
