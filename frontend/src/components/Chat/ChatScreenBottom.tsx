import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { idUser, userName } from "common/services/authService/authSlice";
import { chatActions } from "common/services/chatService/chatSlice";
import { useRealTime } from "hooks";
import { useUploadImage } from "hooks/useUploadImage";
import { ChangeEvent, useRef, useState } from "react";
import { toast } from "react-toastify";
import { Conversation } from "types/ChatType";
import CircularProgress from "@mui/material/CircularProgress";
interface Props {
  conversationDetail: Conversation;
}

const ChatScreenBottom = ({ conversationDetail }: Props) => {
  // Hooks
  const { uploadSingleImageToCloudinary } = useUploadImage();
  const uploadInputRef = useRef<HTMLInputElement>(null);
  const { sendMessageToReceiver } = useRealTime();
  const idUserLoggedIn = useAppSelector(idUser);
  const userNameLoggedIn = useAppSelector(userName);
  const dispatch = useAppDispatch();
  const [messageText, setMessageText] = useState("");
  const [loading, setLoading] = useState(false);
  const handleGetUserSendToUserName = () => {
    return conversationDetail.userFrom.userName === userNameLoggedIn
      ? conversationDetail.userTo.userName
      : conversationDetail.userFrom.userName;
  };
  const [fileUpload, setFileUpload] = useState<File | null>(null);

  const sendMessage = (messText: string) => {
    if (!messText) return;
    dispatch(
      chatActions.sendMessageRequest({
        messageRequest: {
          conversation: {
            id: conversationDetail.id,
          },
          content: messText,
          user: {
            id: idUserLoggedIn as number,
            userName: userNameLoggedIn as string,
          },
        },
        sendMessageToReceiver: async () => {
          if (fileUpload) {
            uploadSingleImageToCloudinary(fileUpload)
              .then((response: string) => {
                sendMessageToReceiver({
                  conversationId: conversationDetail.id,
                  userSendToUserName: handleGetUserSendToUserName(),
                  action: "CHAT_PRIVATE_ACTION",
                });
              })
              .catch((error: any) => {
                toast.error(error.response.data.message);
              });
          }
          sendMessageToReceiver({
            conversationId: conversationDetail.id,
            userSendToUserName: handleGetUserSendToUserName(),
            action: "CHAT_PRIVATE_ACTION",
          });
          setMessageText("");
        },
      })
    );
  };

  const sendImageMessage = () => {
    if (!fileUpload) return;
    setLoading(true);
    uploadSingleImageToCloudinary(fileUpload)
      .then((response: string) => {
        sendMessage(response);
        setFileUpload(null);
      })
      .catch((error: any) => {
        toast.error(error.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleInputUploadFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      // Get file
      const file = e.target.files[0];
      // Storage file uploaded
      setFileUpload(file);
    }
  };

  const handleClearInputUploadWhenChangeTheSameFile = (e: any) => {
    e.target.value = "";
  };

  return (
    <>
      {fileUpload && (
        <p className="p-2 border">
          <span className="max-w-[50px] overflow-hidden">
            {fileUpload.name.length > 15
              ? fileUpload.name.slice(0, 15) + "..."
              : fileUpload.name}
          </span>
          {!loading && (
            <span
              onClick={() => setFileUpload(null)}
              className="mx-2 hover:opacity-60 cursor-pointer"
            >
              x
            </span>
          )}
        </p>
      )}

      <div className="p-2 border-t-[1px] flex items-center">
        <button
          onClick={() =>
            uploadInputRef.current && uploadInputRef.current.click()
          }
        >
          {!loading ? (
            <AttachFileIcon style={{ fontSize: "24px", color: "#9e9e9e" }} />
          ) : (
            <CircularProgress
              sx={{
                width: "20px !important",
                height: "20px !important",
              }}
            />
          )}
        </button>
        <input
          ref={uploadInputRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleInputUploadFileChange}
          onClick={handleClearInputUploadWhenChangeTheSameFile}
        />
        <input
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendImageMessage();
              sendMessage(messageText);
            }
          }}
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          className="outline-none flex items-center h-10 w-full rounded px-3 text-sm"
          type="text"
          placeholder={"Nhập tin nhắn"}
        />
        <button
          onClick={() => {
            sendImageMessage();
            sendMessage(messageText);
          }}
        >
          <SendIcon style={{ fontSize: "24px", color: "#3f51b5" }} />
        </button>
      </div>
    </>
  );
};

export default ChatScreenBottom;
