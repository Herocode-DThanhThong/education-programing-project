import { Conversation } from "types/ChatType";
import ConversationList from "./ConversationList";
import InboxTop from "./InboxTop";

interface Props {
  allConversation: Conversation[] | null;
}
export const Inbox = ({ allConversation }: Props) => {
  return (
    <div className="w-[384px] py-2 px-2 max-h-[572px]">
      {/* Inbox top */}
      <InboxTop />

      {/* Inbox conversations */}
      {allConversation && (
        <ConversationList allConversation={allConversation} />
      )}
    </div>
  );
};
