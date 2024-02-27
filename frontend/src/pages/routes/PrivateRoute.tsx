import { useAppSelector } from "common/hooks";
import { isLoggedIn } from "common/services/authService/authSlice";
import Chat from "components/Chat/Chat";
import ChatGPT from "components/ChatGPT";
import Navbar from "components/Courses/Navbar";
import Sidebar from "components/Courses/Sidebar";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = (): React.ReactElement => {
  // Hooks
  const isAuth = useAppSelector(isLoggedIn);

  return isAuth ? (
    <>
      <Navbar />
      <Sidebar />
      <Chat />
      <Outlet />
      <ChatGPT />
    </>
  ) : (
    <Navigate to="/login" />
  );
};
