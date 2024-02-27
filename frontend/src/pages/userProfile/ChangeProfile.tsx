import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import { Alert, Avatar, Button, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { idUser } from "common/services/authService/authSlice";
import { loadingActions } from "common/services/loadingService/loadingSlice";
import { settingActions } from "common/services/settingService/settingSlice";
import { useUploadImage } from "hooks/useUploadImage";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { UserType } from "types";
import Viewer from "react-viewer";

interface Props {
  userDetail: UserType | null;
}

const ChangePersonalInformation = ({ userDetail }: Props) => {
  // Hooks
  const dispatch = useAppDispatch();
  const idUserLoggedIn = useAppSelector(idUser);
  const uploadInputRef = useRef<HTMLInputElement>(null);
  const { uploadSingleImageToCloudinary } = useUploadImage();
  const [fileUpload, setFileUpload] = useState<File | null>(null);
  const [visible, setVisible] = useState(false);

  // States
  const [success, setSuccess] = useState(false);
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    imageUrl: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    dispatch(loadingActions.startLoading());
    try {
      let avtUrl = userInfo.imageUrl;
      if (fileUpload) {
        avtUrl = await uploadSingleImageToCloudinary(fileUpload);
        setFileUpload(null);
      }
      dispatch(
        settingActions.updateUserRequest({
          id: idUserLoggedIn as number,
          firstName: userInfo.firstName,
          lastName: userInfo.lastName,
          email: userInfo.email,
          imageUrl: avtUrl,
        })
      );
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      dispatch(loadingActions.endLoading());
    }
  };

  // Effects
  useEffect(() => {
    if (userDetail) {
      setUserInfo({
        ...userInfo,
        firstName: userDetail.firstName,
        lastName: userDetail.lastName,
        email: userDetail.email,
        imageUrl: userDetail.imageUrl,
      });
    }
  }, [userDetail]);

  const handleInputUploadFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      // Get file
      const file = e.target.files[0];
      // Storage file uploaded
      setFileUpload(file);
      convert2base64(file);
    }
  };

  const handleClearInputUploadWhenChangeTheSameFile = (e: any) => {
    e.target.value = "";
  };

  const convert2base64 = (fileConvert: File) => {
    if (!fileConvert) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      if (reader.result) {
        setUserInfo({
          ...userInfo,
          imageUrl: reader.result.toString(),
        });
      }
    };

    reader.readAsDataURL(fileConvert);
  };

  const handleDeleteAvatar = () => {
    setFileUpload(null);
    setUserInfo({
      ...userInfo,
      imageUrl: "",
    });
  };

  return (
    <>
      {!userInfo.imageUrl ? (
        <Avatar sx={{ m: 1, bgcolor: "orange", margin: "auto" }}>
          <SentimentSatisfiedAltIcon />
        </Avatar>
      ) : (
        <>
          <Avatar
            onClick={() => setVisible(true)}
            sx={{ m: 1, bgcolor: "orange", cursor: "pointer", margin: "auto" }}
            alt="avatar"
            src={userInfo.imageUrl}
          />
          <Viewer
            visible={visible}
            onClose={() => {
              setVisible(false);
            }}
            images={[{ src: userInfo.imageUrl, alt: "" }]}
          />
        </>
      )}
      <input
        ref={uploadInputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleInputUploadFileChange}
        onClick={handleClearInputUploadWhenChangeTheSameFile}
      />
      <Box sx={{ textAlign: "center" }}>
        <Button
          variant="outlined"
          sx={{
            fontSize: "10px",
            margin: "auto",
            marginTop: "8px",
            width: "fit-content",
          }}
          onClick={() =>
            uploadInputRef.current && uploadInputRef.current.click()
          }
        >
          Thay đổi avatar
        </Button>
        <Button
          variant="outlined"
          sx={{
            fontSize: "10px",
            margin: "auto",
            marginTop: "8px",
            marginLeft: "8px",
            width: "fit-content",
          }}
          onClick={() => handleDeleteAvatar()}
        >
          Xóa avatar
        </Button>
      </Box>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ m: 1, width: "auto" }}
      >
        <TextField
          size="small"
          margin="normal"
          required
          fullWidth
          id="firstName"
          label={"Họ"}
          name="firstName"
          autoFocus
          value={userInfo.firstName}
          onChange={handleInputChange}
        />
        <TextField
          size="small"
          margin="normal"
          required
          fullWidth
          id="lastName"
          label={"Tên"}
          name="lastName"
          autoFocus
          value={userInfo.lastName}
          onChange={handleInputChange}
        />
        <TextField
          size="small"
          margin="normal"
          required
          fullWidth
          id="email"
          label={"Email"}
          name="email"
          autoFocus
          value={userInfo.email}
          onChange={handleInputChange}
        />
        {success && (
          <Alert severity="success">Cập nhật avatar thành công</Alert>
        )}
        <Box sx={{ textAlign: "center" }}>
          <Button
            size="small"
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              margin: "15px auto",
              width: "fit-content",
            }}
          >
            Thay đổi
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default ChangePersonalInformation;
