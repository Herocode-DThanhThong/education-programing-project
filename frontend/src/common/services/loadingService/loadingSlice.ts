import { createSlice } from "@reduxjs/toolkit";
import { IRootReducer } from "redux/rootReducer";

export type LoadingStateTypes = {
  loading: boolean;
};

const initialState: LoadingStateTypes = {
  loading: false,
};

const loadingSlice = createSlice({
  name: "loading",
  initialState: initialState,
  reducers: {
    startLoading: (state): void => {
      Object.assign(state, {
        loading: true,
      });
    },
    endLoading: (state): void => {
      Object.assign(state, {
        loading: false,
      });
    },
  },
});

export const loadingActions = loadingSlice.actions;
export const loading = (state: IRootReducer): boolean =>
  state.loadingReducer.loading;
export default loadingSlice.reducer;
