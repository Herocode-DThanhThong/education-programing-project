import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { vi } from "constants/localeTime";
import { useState } from "react";
import ReactTimeAgo from "react-time-ago";
import Viewer from "react-viewer";
import { Message } from "types/ChatType";
import { Avatar } from "@mui/material";
interface Props {
  mess: Message;
}

const MessageReceive = ({ mess }: Props) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="flex w-full mt-2 space-x-3 max-w-xs">
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

      <div
        className={`${
          !mess.content.includes(
            process.env.REACT_APP_CLOUDINARY_DOMAIN as string
          )
            ? "bg-gray-300"
            : "shadow-lg border"
        } p-3 rounded-r-lg rounded-bl-lg`}
      >
        <p className="text-sm text-left">
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
                images={[{ src: mess.content, alt: "image-message" }]}
              />
            </>
          ) : (
            mess.content
          )}
        </p>
        <p className="text-xs text-left mt-2 text-gray-500 leading-none">
          <ReactTimeAgo
            date={Date.parse(mess.createdDate)}
            locale={vi}
            timeStyle="round-minute"
          />
        </p>
      </div>
    </div>
  );
};

export default MessageReceive;
