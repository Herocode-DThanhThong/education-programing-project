import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import Alert from "@mui/material/Alert";
import { Box } from "@mui/system";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { idUser } from "common/services/authService/authSlice";
import { settingActions } from "common/services/settingService/settingSlice";
import { useState } from "react";
export interface IPass {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}
export interface IShowPass {
  oldPassword: boolean;
  newPassword: boolean;
  confirmPassword: boolean;
}

const ChangePersonalPassword = () => {
  // Hooks
  const dispatch = useAppDispatch();
  const idUserLoggedIn = useAppSelector(idUser);

  // State
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [showPassword, setShowPassword] = useState<IShowPass>({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  const [passwordHolder, setPasswordHolder] = useState<IPass>({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Handler
  const handleClickShowPassword = (
    oldPassword: boolean,
    newPassword: boolean,
    confirmPassword: boolean
  ) => {
    setShowPassword({
      oldPassword: oldPassword,
      newPassword: newPassword,
      confirmPassword: confirmPassword,
    });
  };

  const handleChangePassword = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name !== "oldPassword" && error && errorText) {
      setError(false);
      setErrorText("");
    }

    setPasswordHolder({
      ...passwordHolder,
      [name]: value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const checkValue = checkValueBeforSubmit();

    if (checkValue === true) {
      dispatch(
        settingActions.updatePasswordRequest({
          userId: idUserLoggedIn as number,
          oldPassword: passwordHolder.oldPassword,
          newPassword: passwordHolder.newPassword,
        })
      );
    }
  };
  const checkValueBeforSubmit = () => {
    if (passwordHolder.newPassword !== passwordHolder.confirmPassword) {
      setErrorText("Mật khẩu nhập lại không chính xác");
      setError(true);
    } else {
      setErrorText("");
      setError(false);
    }
    return passwordHolder.newPassword === passwordHolder.confirmPassword;
  };

  return (
    <>
      <h1 className="mt-2 mb-2 font-semibold">Thay đổi mật khẩu</h1>

      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          size="small"
          margin="normal"
          required
          fullWidth
          name="oldPassword"
          label={"Mật khẩu cũ"}
          type={showPassword.oldPassword ? "text" : "password"}
          id="oldpassword"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() =>
                    handleClickShowPassword(
                      !showPassword.oldPassword,
                      showPassword.newPassword,
                      showPassword.confirmPassword
                    )
                  }
                  edge="end"
                >
                  {showPassword.oldPassword ? (
                    <Visibility />
                  ) : (
                    <VisibilityOff />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
          value={passwordHolder?.oldPassword}
          onChange={handleChangePassword}
        />
        <TextField
          size="small"
          margin="normal"
          required
          fullWidth
          name="newPassword"
          label={"Mật khẩu mới"}
          type={showPassword.newPassword ? "text" : "password"}
          id="newPassword"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() =>
                    handleClickShowPassword(
                      showPassword.oldPassword,
                      !showPassword.newPassword,
                      showPassword.confirmPassword
                    )
                  }
                  edge="end"
                >
                  {showPassword.newPassword ? (
                    <Visibility />
                  ) : (
                    <VisibilityOff />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
          value={passwordHolder?.newPassword}
          onChange={handleChangePassword}
        />
        <TextField
          size="small"
          margin="normal"
          required
          fullWidth
          name="confirmPassword"
          label={"Nhập lại mật khẩu mới"}
          type={showPassword.confirmPassword ? "text" : "password"}
          id="confirmPassword"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() =>
                    handleClickShowPassword(
                      showPassword.oldPassword,
                      showPassword.newPassword,
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
          value={passwordHolder?.confirmPassword}
          onChange={handleChangePassword}
        />
        {error && <Alert severity="error">{errorText}</Alert>}
        <Box
          sx={{
            textAlign: "center",
          }}
        >
          <Button
            size="small"
            type="submit"
            fullWidth
            variant="contained"
            sx={{ margin: "15px auto", width: "fit-content" }}
          >
            Thay đổi
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default ChangePersonalPassword;
