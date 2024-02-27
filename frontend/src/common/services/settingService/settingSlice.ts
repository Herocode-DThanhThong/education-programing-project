import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IRootReducer } from "redux/rootReducer";
import {
  SettingStateType,
  UpdatePasswordRequestType,
  UpdateUserRequestType,
} from "types";
import { UserType } from "types";

const initialState: SettingStateType = {
  user: null,
  messageError: null,
};
const settingSlice = createSlice({
  name: "setting",
  initialState: initialState,
  reducers: {
    // Get detail user
    getUserDetailRequest: (state, _: PayloadAction<string | number>): void => {
      Object.assign(state, {});
    },

    getUserDetailSuccess: (state, action: PayloadAction<UserType>): void => {
      Object.assign(state, {
        user: action.payload,
        messageError: null,
      });
    },
    getUserDetailFailure: (state, action: PayloadAction<string>): void => {
      Object.assign(state, {
        ...state,
        user: null,
        messageError: action.payload,
      });
    },

    //update profile: first name, last name, email
    updateUserRequest: (
      state,
      _: PayloadAction<UpdateUserRequestType>
    ): void => {
      Object.assign(state, {});
    },

    updateUserSuccess: (state, action: PayloadAction<UserType>): void => {
      Object.assign(state, {
        user: action.payload,
        messageError: null,
      });
    },
    updateUserFailure: (state, action: PayloadAction<string>): void => {
      Object.assign(state, {
        ...state,
        messageError: action.payload,
      });
    },

    // Update password
    updatePasswordRequest: (
      state,
      _: PayloadAction<UpdatePasswordRequestType>
    ): void => {
      Object.assign(state, {});
    },

    updatePasswordSuccess: (state, action: PayloadAction<UserType>): void => {
      Object.assign(state, {
        user: action.payload,
        messageError: null,
      });
    },
    updatePasswordFailure: (state, action: PayloadAction<string>): void => {
      Object.assign(state, {
        ...state,
        messageError: action.payload,
      });
    },
  },
});

export const settingActions = settingSlice.actions;
export const user = (state: IRootReducer): UserType | null =>
  state.settingReducer.user;
export const settingMessageError = (state: IRootReducer): string | null =>
  state.settingReducer.messageError;

export default settingSlice.reducer;
