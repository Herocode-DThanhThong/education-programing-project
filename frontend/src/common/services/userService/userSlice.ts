// Vendor
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Src
import { IRootReducer } from "redux/rootReducer";
import { UserStateTypes, PaginationParams, QueryParams, UserType } from "types";

const initialState: UserStateTypes = {
  users: null,
  filters: {
    page: 0,
    size: 10,
    text: "",
  },
  pagination: {
    pageNumber: 0,
    pageSize: 10,
    totalElements: 15,
  },
  messageError: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setPagination: (state, action: PayloadAction<PaginationParams>): void => {
      Object.assign(state, {
        pagination: action.payload,
      });
    },
    setFilter: (state, action: PayloadAction<QueryParams>): void => {
      Object.assign(state, {
        filters: action.payload,
      });
    },
    resetFilter: (state): void => {
      Object.assign(state, {
        filters: {
          page: 0,
          size: 10,
          text: "",
        },
      });
    },
    getAllUserRequest: (state): void => {
      Object.assign(state, {});
    },
    getAllUserSuccess: (state, action: PayloadAction<UserType[]>): void => {
      Object.assign(state, {
        users: action.payload,
        messageError: null,
      });
    },
    getAllUserFailure: (state, action: PayloadAction<string>): void => {
      Object.assign(state, {
        users: null,
        messageError: action.payload,
      });
    },
  },
});

export const userActions = userSlice.actions;
export const users = (state: IRootReducer): Array<UserType> | null =>
  state.userReducer.users;
export const filters = (state: IRootReducer): QueryParams =>
  state.userReducer.filters;
export const pagination = (state: IRootReducer): PaginationParams =>
  state.userReducer.pagination;
export const messageError = (state: IRootReducer): string | null =>
  state.userReducer.messageError;

export default userSlice.reducer;
