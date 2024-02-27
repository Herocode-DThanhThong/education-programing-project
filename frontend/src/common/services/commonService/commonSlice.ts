import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IRootReducer } from 'redux/rootReducer';

export type CommonStateTypes = {
  path: string;
  search: {
    content: string;
  };
};

const initialState: CommonStateTypes = {
  path: '/',
  search: {
    content: '',
  },
};
const commonSlice = createSlice({
  name: 'common',
  initialState: initialState,
  reducers: {
    setPath: (state, action: PayloadAction<string>): void => {
      Object.assign(state, {
        ...state,
        path: action.payload,
      });
    },
    setContentSearch: (state, action: PayloadAction<string>): void => {
      Object.assign(state, {
        ...state,
        search: {
          ...state.search,
          content: action.payload,
        },
      });
    },
  },
});

export const commonActions = commonSlice.actions;
export const pathGetPosts = (state: IRootReducer): string =>
  state.commonReducer.path;

export const contentSearchPost = (state: IRootReducer): string =>
  state.commonReducer.search.content;
export default commonSlice.reducer;
