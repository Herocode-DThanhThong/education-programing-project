import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ChatIcon from "@mui/icons-material/Chat";
import DataObjectIcon from "@mui/icons-material/DataObject";
import DeleteIcon from "@mui/icons-material/Delete";
import ShareIcon from "@mui/icons-material/Share";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import { Button } from "@mui/material";
import { useAppSelector } from "common/hooks";
import { idUser } from "common/services/authService/authSlice";
import {
  loadMoreNotify,
  notificationActions,
} from "common/services/notificationService/notificationSlice";
import { vi } from "constants/localeTime";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";
import { NotificationType } from "types";
import { Avatar } from "@mui/material";
export interface Props {
  data: NotificationType[] | null;
}

const Notification = ({ data }: Props) => {
  // Hooks
  const idUserLoggedIn = useAppSelector(idUser);
  const loadMoreNotifyData = useAppSelector(loadMoreNotify);
  const dispatch = useDispatch();

  // Handlers
  const handleDeleteAllNotication = () => {
    if (idUserLoggedIn)
      dispatch(
        notificationActions.deleteAllNotificationRequest(idUserLoggedIn)
      );
  };

  const handleLoadMoreNotification = () => {
    if (idUserLoggedIn)
      dispatch(
        notificationActions.loadMoreNotificationsRequest(idUserLoggedIn)
      );
  };
  return (
    <div className="min-w-[300px] max-h-[384px]">
      {data?.map((notify, _) => (
        <Link key={notify.id} to={`/community/post/${notify.post.id}`}>
          <div className="flex gap-3 items-center border-b-2 p-4 hover:bg-gray-200 transition-all ease-in-out duration-300">
            <div className="user-img relative">
              {notify.userFrom.imageUrl ? (
                <Avatar
                  sx={{ width: 28, height: 28 }}
                  alt="avatar"
                  src={notify.userFrom.imageUrl}
                />
              ) : (
                <AccountCircleOutlinedIcon style={{ fontSize: "28px" }} />
              )}
              <div className="absolute -bottom-1/2 left-1/2">
                {notify.notificationType === "LIKE" ? (
                  <ThumbUpAltIcon style={{ color: "#1976d2" }} />
                ) : notify.notificationType === "SHARE" ? (
                  <ShareIcon style={{ color: "#2c387e" }} />
                ) : notify.notificationType === "NEW_POST" ? (
                  <DataObjectIcon style={{ color: "#14a37f" }} />
                ) : (
                  <ChatIcon style={{ color: "#ff7961" }} />
                )}
              </div>
            </div>
            <div className="">
              <p className="text-sm">
                <span className="font-semibold">
                  {notify.userFrom.firstName} {notify.userFrom.lastName}
                </span>{" "}
                {notify.notificationType === "LIKE"
                  ? "đã thích một bài viết của bạn"
                  : notify.notificationType === "SHARE"
                  ? "đã chia sẻ một bài viết của bạn"
                  : notify.notificationType === "NEW_POST"
                  ? "vừa đăng một bài viết mới"
                  : "đã bình luận về bài viết của bạn"}
              </p>
              <p className="text-sm">
                <ReactTimeAgo
                  date={Date.parse(notify.time)}
                  locale={vi}
                  timeStyle="round-minute"
                />
              </p>
            </div>
          </div>
        </Link>
      ))}
      <div className="flex gap-2 sticky bottom-0 items-center justify-center bg-white shadow-md py-2">
        <Button
          disabled={!loadMoreNotifyData}
          onClick={() => {
            handleLoadMoreNotification();
          }}
          size="small"
          variant="contained"
          color="primary"
        >
          <span className="text-[11px]">Xem thêm</span>
        </Button>
        <Button
          onClick={() => {
            handleDeleteAllNotication();
          }}
          size="small"
          variant="contained"
          color="error"
        >
          <DeleteIcon fontSize="small" />{" "}
          <span className="text-[11px]">Xóa tất cả</span>
        </Button>
      </div>
    </div>
  );
};

export default Notification;
