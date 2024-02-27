// Vendor
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Src
import { IRootReducer } from "redux/rootReducer";
import { AuthStateTypes, LoginRequestType, LoginSuccessType } from "types";

const initialState: AuthStateTypes = {
  idUser: null,
  isLoggedIn: null,
  isAdmin: null,
  userName: null,
  accessToken: null,
  authorities: [],
  messageError: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    // login
    loginRequest: (state, _: PayloadAction<LoginRequestType>): void => {
      Object.assign(state, {});
    },
    loginSuccess: (state, action: PayloadAction<LoginSuccessType>): void => {
      Object.assign(state, {
        isLoggedIn: true,
        isAdmin:
          action.payload.authorities.findIndex(
            (auth) => auth.name === "ROLE_ADMIN"
          ) !== -1,
        idUser: action.payload.id,
        userName: action.payload.userName,
        accessToken: action.payload.accessToken,
        authorities: action.payload.authorities,
        messageError: null,
      });
    },
    loginFailure: (state, action: PayloadAction<string>): void => {
      Object.assign(state, {
        isLoggedIn: false,
        idUser: null,
        userName: null,
        accessToken: null,
        messageError: action.payload,
      });
    },
    refreshData: (state) => {
      Object.assign(state, {
        isLoggedIn: false,
        idUser: null,
        userName: null,
        accessToken: null,
        messageError: null,
      });
    },

    // logout
    logout: (state): void => {
      Object.assign(state, {
        isLoggedIn: false,
        isAdmin: null,
        idUser: null,
        userName: null,
        accessToken: null,
        authorities: [],
        messageError: null,
      });
    },
  },
});

export const authActions = authSlice.actions;
export const isLoggedIn = (state: IRootReducer): boolean | null =>
  state.authReducer.isLoggedIn;
export const isAdmin = (state: IRootReducer): boolean | null =>
  state.authReducer.isAdmin;
export const idUser = (state: IRootReducer): number | null =>
  state.authReducer.idUser;
export const userName = (state: IRootReducer): string | null =>
  state.authReducer.userName;
export const messageError = (state: IRootReducer): string | null =>
  state.authReducer.messageError;

export default authSlice.reducer;
