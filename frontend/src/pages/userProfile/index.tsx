import { Container, Grid, Paper } from "@mui/material";
import Button from "@mui/material/Button";
import { idUser } from "common/services/authService/authSlice";
import {
  settingActions,
  user,
} from "common/services/settingService/settingSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChangePersonalPassword from "./ChangePassword";
import ChangePersonalInformation from "./ChangeProfile";
import { useRealTime } from "hooks";

const UserProfile = () => {
  // Hooks
  const dispatch = useDispatch();
  const userDetail = useSelector(user);
  const idUserLoggedIn = useSelector(idUser);
  const _ = useRealTime();
  // States
  const [openProfile, setOpenProfile] = useState(true);
  const [openPassword, setOpenPassword] = useState(false);

  // Handler
  const handleOpenProfile = () => {
    setOpenProfile(true);
    setOpenPassword(false);
  };
  const handleOpenPassword = () => {
    setOpenProfile(false);
    setOpenPassword(true);
  };

  useEffect(() => {
    if (idUserLoggedIn) {
      dispatch(settingActions.getUserDetailRequest(idUserLoggedIn));
    }
  }, [idUserLoggedIn]);

  return (
    <Container
      maxWidth="lg"
      style={{ margin: "auto", height: "500px", marginTop: "32px" }}
    >
      <Grid
        container
        sx={{ padding: "0 30px 30px 30px", boxSizing: "border-box" }}
      >
        <Grid item xs={3}>
          <Paper
            style={{
              marginTop: "30%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Button
              color={openProfile ? "primary" : "secondary"}
              onClick={handleOpenProfile}
              sx={{
                textTransform: "capitalize",
              }}
            >
              Thay đổi thông tin
            </Button>
            <Button
              color={openPassword ? "primary" : "secondary"}
              onClick={handleOpenPassword}
              sx={{
                textTransform: "capitalize",
              }}
            >
              Thay đổi mật khẩu
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={1} />
        <Grid item xs={8} style={{ backgroundColor: "white" }}>
          <div
            style={{ padding: "2%", display: "flex", flexDirection: "column" }}
          >
            {openPassword && <ChangePersonalPassword />}
            {openProfile && (
              <ChangePersonalInformation userDetail={userDetail} />
            )}
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserProfile;
