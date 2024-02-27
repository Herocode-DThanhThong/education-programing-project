import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { en, vi } from "constants/localeTime";
import i18n from "i18n/i18n";
import ReactTimeAgo from "react-time-ago";
import { Message } from "types/ChatType";
import Viewer from "react-viewer";
import { useState } from "react";
import { Avatar } from "@mui/material";
interface Props {
  mess: Message;
}

const MessageSend = ({ mess }: Props) => {
  const currentLanguage = i18n.language as "vi" | "en";
  const [visible, setVisible] = useState(false);
  return (
    <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
      <div
        className={`${
          !mess.content.includes(
            process.env.REACT_APP_CLOUDINARY_DOMAIN as string
          )
            ? "bg-blue-600"
            : "shadow-lg border"
        }  text-white p-3 rounded-l-lg rounded-br-lg`}
      >
        <div className="text-sm text-left">
          {mess.content.includes(
            process.env.REACT_APP_CLOUDINARY_DOMAIN as string
          ) ? (
            <>
              <img
                onClick={() => setVisible(true)}
                className="max-w-[200px] max-h-[200px]"
                src={mess.content}
                alt=""
              />
              <Viewer
                visible={visible}
                onClose={() => {
                  setVisible(false);
                }}
                images={[{ src: mess.content, alt: "" }]}
              />
            </>
          ) : (
            mess.content
          )}
        </div>
        <p
          className={`${
            !mess.content.includes(
              process.env.REACT_APP_CLOUDINARY_DOMAIN as string
            )
              ? "text-white"
              : "text-black"
          } text-xs text-right mt-2 leading-none`}
        >
          <ReactTimeAgo
            date={Date.parse(mess.createdDate)}
            locale={vi}
            timeStyle="round-minute"
          />
        </p>
      </div>

      <div className="user-img">
        {mess.user.imageUrl ? (
          <Avatar
            sx={{
              width: 30,
              height: 30,
            }}
            alt="avatar"
            src={mess.user.imageUrl}
          />
        ) : (
          <AccountCircleOutlinedIcon style={{ fontSize: "30px" }} />
        )}
      </div>
    </div>
  );
};

export default MessageSend;
