import { useAppSelector } from "common/hooks";
import { isAdmin, isLoggedIn } from "common/services/authService/authSlice";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const AdminRoute = (): React.ReactElement => {
  // Hooks
  const isAuth = useAppSelector(isLoggedIn);
  const isAdminAuth = useAppSelector(isAdmin);

  return isAuth && isAdminAuth ? (
    <>
      <Outlet />
    </>
  ) : isAuth && !isAdminAuth ? (
    <Navigate to="/" />
  ) : (
    <Navigate to="/login" />
  );
};
