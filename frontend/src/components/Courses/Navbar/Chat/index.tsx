import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import Popover from "@mui/material/Popover";
import { Path } from "api/paths";
import { AxiosResponse } from "axios";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { idUser } from "common/services/authService/authSlice";
import { baseService } from "common/services/baseService";
import {
  allConversation,
  chatActions,
} from "common/services/chatService/chatSlice";
import { loadingActions } from "common/services/loadingService/loadingSlice";
import { Inbox } from "components/Chat";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Conversation } from "types/ChatType";

const Chat = () => {
  const dispatch = useAppDispatch();
  const idUserLoggedIn = useAppSelector(idUser);
  const [openChat, setOpenChat] = useState(false);
  const [anchorElChat, setAnchorElChat] = useState(null);
  const allConversationData = useAppSelector(allConversation);

  // Effects
  useEffect(() => {
    fetchConversation();
  }, []);

  // Handler
  const handleClickChat = (event: any) => {
    setOpenChat(!openChat);
    setAnchorElChat(event.currentTarget);
  };

  const fetchConversation = async () => {
    dispatch(loadingActions.startLoading());
    try {
      const response: AxiosResponse<Conversation[]> = await baseService.GET(
        `${Path.GetAllConversation}/conversation-by-user/${idUserLoggedIn}`
      );
      dispatch(chatActions.setAllConversation(response.data));
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(loadingActions.endLoading());
    }
  };

  return (
    <>
      <IconButton
        onClick={handleClickChat}
        size="large"
        aria-label="show 17 new notifications"
        color="inherit"
      >
        <Badge badgeContent={17} color="error">
          <ChatBubbleOutlineIcon />
        </Badge>
      </IconButton>

      <Popover
        onClose={() => {
          setOpenChat(false);
        }}
        anchorEl={anchorElChat}
        open={openChat}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Inbox allConversation={allConversationData} />
      </Popover>
    </>
  );
};

export default Chat;
