import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { useAppSelector } from "common/hooks";
import { idUser } from "common/services/authService/authSlice";
import { Conversation } from "types/ChatType";

interface Props {
  conversation: Conversation;
}

export const Conservation = ({ conversation }: Props) => {
  const idUserLoggedIn = useAppSelector(idUser);

  return (
    <div className="w-full py-4 px-2 flex items-center gap-2 hover:bg-gray-100 rounded-md cursor-pointer ease-in-out duration-300 transition-all">
      <div className="user-img">
        <AccountCircleOutlinedIcon style={{ fontSize: "40px" }} />
      </div>
      <div className="w-[80%]">
        <p className="truncate">
          {conversation.userFrom.id === idUserLoggedIn
            ? conversation.userTo.firstName + " " + conversation.userTo.lastName
            : conversation.userFrom.lastName + conversation.userFrom.lastName}
        </p>
        <p className="text-sm text-gray-400 truncate">
          {conversation.messages[conversation.messages.length - 1].content}
        </p>
      </div>
    </div>
  );
};
