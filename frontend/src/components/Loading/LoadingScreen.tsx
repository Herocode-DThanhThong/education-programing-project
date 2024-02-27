import { Backdrop } from "@mui/material";
import LoadingImg from "assests/images/loading.gif";
import { useAppSelector } from "common/hooks";
import { loading } from "common/services/loadingService/loadingSlice";
import React from "react";
export const LoadingScreen = () => {
  const isLoading = useAppSelector(loading);
  return (
    <React.Fragment>
      <Backdrop
        sx={{
          height: "100%",
          color: "#fff",
          opacity: "0.5 !important",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          zIndex: 10000,
        }}
        open={isLoading}
      >
        <img src={LoadingImg} alt="" />
      </Backdrop>
    </React.Fragment>
  );
};
