import { Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Popover from "@mui/material/Popover";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { authActions, idUser } from "common/services/authService/authSlice";
import {
  settingActions,
  user,
} from "common/services/settingService/settingSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

type Props = {};

const Settings = (props: Props) => {
  // Hooks
  const userData = useAppSelector(user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const idUserLoggedIn = useAppSelector(idUser);
  const userDetailData = useAppSelector(user);
  // States
  const [openModalSetting, setOpenModalSetting] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    dispatch(settingActions.getUserDetailRequest(idUserLoggedIn as number));
  }, []);

  // Handler
  const handleClickSetting = (event: any) => {
    setOpenModalSetting(!openModalSetting);
    setAnchorEl(event.currentTarget);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    dispatch(authActions.logout());
    setOpenModalSetting(false);
    navigate("/login", { replace: true });
  };
  return (
    <div className="ml-2">
      <div className="flex gap-2 items-center">
        <IconButton
          sx={{
            p: 0,
          }}
          onClick={handleClickSetting}
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          {userData?.imageUrl ? (
            <Avatar
              sx={{
                width: 30,
                height: 30,
                m: 1,
                bgcolor: "orange",
                margin: "auto",
              }}
              alt="avatar"
              src={userData.imageUrl}
            />
          ) : (
            <AccountCircleOutlinedIcon style={{ fontSize: "30px" }} />
          )}
        </IconButton>
        <span>
          {userDetailData?.firstName + " " + userDetailData?.lastName}
        </span>
      </div>

      <Popover
        onClose={() => {
          setOpenModalSetting(false);
        }}
        anchorEl={anchorEl}
        open={openModalSetting}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <div className="py-4 px-8 text-center">
          <Button
            variant="text"
            size="small"
            sx={{ mt: 1, color: "black" }}
            onClick={() => {
              navigate(`/community/userPost/${idUserLoggedIn}`);
            }}
          >
            Trang cá nhân
          </Button>
          <br />
          <Button
            variant="text"
            size="small"
            onClick={() => {
              navigate("/userProfile");
            }}
            sx={{
              color: "black",
            }}
          >
            Thông tin cá nhân
          </Button>
          <br />
          <Button
            variant="text"
            size="small"
            sx={{ color: "black" }}
            onClick={logout}
          >
            Đăng xuất
          </Button>
        </div>
      </Popover>
    </div>
  );
};

export default Settings;
