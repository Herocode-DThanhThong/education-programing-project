import { Conversation } from "types/ChatType";
import ChatScreenBottom from "./ChatScreenBottom";
import ChatScreenContent from "./ChatScreenContent";
import ChatScreenTop from "./ChatScreenTop";
import { useAppSelector } from "common/hooks";
import { idUser } from "common/services/authService/authSlice";
type Props = {
  spaceRight: number;
  conversationDetail: Conversation;
};

export const ChatScreen = ({ spaceRight, conversationDetail }: Props) => {
  const idUserLoggedIn = useAppSelector(idUser);
  return (
    <div
      style={{
        right: spaceRight + "px",
      }}
      className={`shadow-lg h-[500px] fixed bottom-0 z-50 w-[350px]`}
    >
      <div className="flex h-full flex-col flex-grow w-full bg-white shadow-xl rounded-lg overflow-hidden">
        {/* Chat Screen top */}
        <ChatScreenTop
          userTo={
            idUserLoggedIn === conversationDetail.userFrom.id
              ? conversationDetail.userTo
              : conversationDetail.userFrom
          }
        />
        {/* Chat screen content */}
        <ChatScreenContent
          idUserLoggedIn={idUserLoggedIn}
          conversationDetail={conversationDetail}
        />
        {/* Chat screen bottom */}
        <ChatScreenBottom conversationDetail={conversationDetail} />
      </div>
    </div>
  );
};
