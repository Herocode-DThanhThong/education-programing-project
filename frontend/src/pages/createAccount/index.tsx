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
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import BackgroundImage from "assests/images/login2.png";
import React, { useEffect, useState } from "react";

// Src
import { useAppDispatch, useAppSelector } from "common/hooks";
import {
  createAccountActions,
  messageError,
} from "common/services/createAccountService/createAccountSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CreateUserAccountRequestType } from "types";
import { expressionCheckEmail } from "utils";

const theme = createTheme();

const CreateAccount: React.FC = () => {
  // Hooks
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const errorMessages = useAppSelector(messageError);
  const [isSubmittedForm, setIsSubmittedForm] = useState(false);
  const { pathname } = useLocation();

  // State
  const [createData, setCreateData] = useState<CreateUserAccountRequestType>({
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    imageUrl: "",
    createdDate: "",
    authorities: [{ name: "ROLE_USER" }],
  });
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  useEffect(() => {
    dispatch(createAccountActions.refreshDataCreateAccount());
  }, [pathname]);

  // Func
  const handleClickShowPassword = (
    password: boolean,
    confirmPassword: boolean
  ) => {
    setShowPassword({
      password: password,
      confirmPassword: confirmPassword,
    });
  };

  const checkPassword = () => {
    return createData.password === createData.confirmPassword;
  };
  const checkEmail = () => {
    return expressionCheckEmail.test(String(createData.email).toLowerCase());
  };

  const handleInputChange = (
    events: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = events.target;
    setCreateData({
      ...createData,
      [name]: value,
      authorities: [{ name: "ROLE_USER" }],
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setIsSubmittedForm(true);
    const checkPasswordValue = checkPassword();
    const checkEmailValue = checkEmail();

    if (checkPasswordValue === true && checkEmailValue === true) {
      dispatch(
        createAccountActions.createRequest({
          createData,
          navigate,
        })
      );
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ minHeight: "100vh" }}>
        <Grid
          item
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
              my: 2,
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
              Đăng ký
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
                autoFocus
                value={createData.userName}
                onChange={handleInputChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="firstName"
                label={"Họ"}
                name="firstName"
                autoFocus
                value={createData.firstName}
                onChange={handleInputChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="lastName"
                label={"Tên"}
                name="lastName"
                autoFocus
                value={createData.lastName}
                onChange={handleInputChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label={"Email"}
                name="email"
                autoFocus
                value={createData.email}
                onChange={handleInputChange}
                helperText={
                  isSubmittedForm && !checkEmail() ? "Email không hợp lệ" : ""
                }
                error={isSubmittedForm && !checkEmail()}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label={"Mật khẩu"}
                type={showPassword.password ? "text" : "password"}
                id="oldpassword"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() =>
                          handleClickShowPassword(
                            !showPassword.password,
                            showPassword.confirmPassword
                          )
                        }
                        edge="end"
                      >
                        {showPassword.password ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                value={createData.password}
                onChange={handleInputChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label={"Xác nhận mật khẩu"}
                type={showPassword.confirmPassword ? "text" : "password"}
                id="confirmPassword"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() =>
                          handleClickShowPassword(
                            showPassword.password,
                            !showPassword.confirmPassword
                          )
                        }
                        edge="end"
                      >
                        {showPassword.confirmPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                value={createData.confirmPassword}
                onChange={handleInputChange}
                helperText={
                  isSubmittedForm && !checkPassword()
                    ? "Mật khẩu nhập lại không đúng"
                    : ""
                }
                error={isSubmittedForm && !checkPassword()}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 1, mb: 2 }}
              >
                Đăng ký
              </Button>
              <Grid container>
                <Grid item xs={12} sx={{ textAlign: "center" }}>
                  <Link to="/login">Bạn đã có tài khoản? Đăng nhập ngay</Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default CreateAccount;
