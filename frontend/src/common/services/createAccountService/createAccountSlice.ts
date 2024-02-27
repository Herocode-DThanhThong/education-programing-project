// Vendor
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// Src
import { NavigateFunction } from "react-router-dom";
import { IRootReducer } from "redux/rootReducer";
import {
  CreateUserAccountRequestType,
  CreateUserAccountStateType,
  CreateUserAccountSucessType,
} from "types";
import { UserType } from "types";

const initialState: CreateUserAccountStateType = {
  create: null,
  messageError: null,
};

export type CreateUserAccountRequestPayloadType = {
  createData: CreateUserAccountRequestType;
  navigate: NavigateFunction;
};

const authSlice = createSlice({
  name: "createAccount",
  initialState: initialState,
  reducers: {
    // login
    createRequest: (
      state,
      _: PayloadAction<CreateUserAccountRequestPayloadType>
    ): void => {
      Object.assign(state, {});
    },
    createSuccess: (
      state,
      action: PayloadAction<CreateUserAccountSucessType>
    ): void => {
      Object.assign(state, {
        create: action.payload,
        messageError: null,
      });
    },
    refreshDataCreateAccount: (state) => {
      Object.assign(state, {
        create: null,
        messageError: null,
      });
    },
    createFailure: (state, action: PayloadAction<string>): void => {
      Object.assign(state, {
        create: null,
        messageError: action.payload,
      });
    },
  },
});

export const createAccountActions = authSlice.actions;
export const create = (state: IRootReducer): UserType | null =>
  state.createAccountReducer.create;
export const messageError = (state: IRootReducer): string | null =>
  state.createAccountReducer.messageError;

export default authSlice.reducer;
