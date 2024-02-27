import { useAppSelector } from "common/hooks";
import { isAdmin, isLoggedIn } from "common/services/authService/authSlice";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const PublicRoute = (): React.ReactElement => {
  const isAuth = useAppSelector(isLoggedIn);
  const isAdminAuth = useAppSelector(isAdmin);

  return isAuth && !isAdminAuth ? (
    <Navigate to="/" />
  ) : isAuth && isAdminAuth ? (
    <Navigate to="/admin" />
  ) : (
    <Outlet />
  );
};
