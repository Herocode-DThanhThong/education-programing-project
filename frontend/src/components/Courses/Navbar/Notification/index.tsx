import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import Popover from "@mui/material/Popover";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { idUser, userName } from "common/services/authService/authSlice";
import {
  notificationActions,
  notifications,
  totalNotificationNotRead,
} from "common/services/notificationService/notificationSlice";
import Notification from "components/Notification";
import { useEffect, useState } from "react";
import { NotificationType } from "types";
type Props = {};

const NotificationWrapper = (props: Props) => {
  // Hooks
  const dispatch = useAppDispatch();
  const userNameLoggedIn = useAppSelector(userName);
  const idUserLoggedIn = useAppSelector(idUser);
  const notificationsData = useAppSelector(notifications);
  const totalNotificationNotReadData = useAppSelector(totalNotificationNotRead);

  // States
  const [openNotification, setOpenNotification] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  // Handler
  const handleCountNotificationNotRead = (): number => {
    let count = 0;
    notificationsData?.forEach((notify, _) => {
      if (notify.delivered && !notify.read) count++;
    });

    return count;
  };

  const handleGetNotificationNotRead = (): NotificationType[] => {
    return notificationsData
      ? notificationsData.filter((notify, _) => !notify.read)
      : [];
  };

  const readAllNotification = () => {
    const notificationsNotRead = handleGetNotificationNotRead();
    dispatch(
      notificationActions.readAllNotificationRequest({
        userId: idUserLoggedIn as number,
        notifications: notificationsNotRead,
      })
    );
  };

  const handleClickNotification = (event: any) => {
    setOpenNotification(!openNotification);
    setAnchorEl(event.currentTarget);

    const notificationNotReadNumber = handleCountNotificationNotRead();
    if (notificationNotReadNumber > 0) {
      readAllNotification();
    }
  };

  // Effects
  useEffect(() => {
    if (userNameLoggedIn && idUserLoggedIn) {
      dispatch(notificationActions.getAllNotificationsRequest(idUserLoggedIn));
    }
  }, [userNameLoggedIn, idUserLoggedIn]);

  return (
    <>
      <IconButton
        onClick={handleClickNotification}
        size="large"
        aria-label="show 4 new mails"
        color="inherit"
      >
        <Badge badgeContent={totalNotificationNotReadData} color="error">
          <NotificationsNoneIcon />
        </Badge>
      </IconButton>

      <Popover
        onClose={() => {
          setOpenNotification(false);
        }}
        anchorEl={anchorEl}
        open={
          openNotification &&
          (notificationsData ? notificationsData.length > 0 : false)
        }
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Notification data={notificationsData} />
      </Popover>
    </>
  );
};

export default NotificationWrapper;
