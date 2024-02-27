import { Conversation } from "types/ChatType";
import { Conservation } from "./Conservation";

interface Props {
  allConversation: Conversation[];
}

const ConversationList = ({ allConversation }: Props) => {
  return (
    <div className="px-2">
      {allConversation.length === 0 && (
        <p className="text-center">Bạn chưa có hộp thoại nào</p>
      )}
      {allConversation.map((conv, _) => (
        <Conservation conversation={conv} key={conv.id} />
      ))}
    </div>
  );
};

export default ConversationList;
