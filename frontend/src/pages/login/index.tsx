// Vendor
import AvatarLogin from "@mui/icons-material/PsychologyAlt";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { InputAdornment } from "@mui/material";
import Alert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import BackgroundImage from "assests/images/login2.png";
import React, { useState, useEffect } from "react";

// Src
import { useAppDispatch, useAppSelector } from "common/hooks";
import {
  authActions,
  messageError,
} from "common/services/authService/authSlice";
import { Link, useLocation } from "react-router-dom";

const theme = createTheme();

const Login: React.FC = () => {
  // Hooks
  const dispatch = useAppDispatch();
  const errorMessages = useAppSelector(messageError);
  const { pathname } = useLocation();
  // States
  const [loginData, setLoginData] = useState({
    userName: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // Handlers
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(authActions.loginRequest(loginData));
  };

  const handleInputChange = (
    events: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = events.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  useEffect(() => {
    dispatch(authActions.refreshData());
  }, [pathname]);
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <Grid
          item
          // xs={false}
          sm={4}
          md={6}
          sx={{
            backgroundImage: `url(${BackgroundImage})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            backgroundPosition: "center",
          }}
        />

        <Grid item xs={12} sm={8} md={6} component={Paper}>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
              <AvatarLogin />
            </Avatar>
            <Typography component="h1" variant="h5">
              Đăng nhập
            </Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              {errorMessages && <Alert severity="error">{errorMessages}</Alert>}
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label={"Tên đăng nhập"}
                name="userName"
                autoComplete="userName"
                autoFocus
                value={loginData.userName}
                onChange={handleInputChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label={"Mật khẩu"}
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                value={loginData.password}
                onChange={handleInputChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Đăng nhập
              </Button>
              <Grid container>
                <Grid
                  item
                  xs={9}
                  sx={{
                    textAlign: "right",
                  }}
                >
                  <Link to="/signUp">Bạn chưa có tài khoản? Đăng ký ngay</Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Login;
