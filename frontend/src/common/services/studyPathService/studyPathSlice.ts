import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IRootReducer } from "redux/rootReducer";
import {
  PaginationParams,
  QueryParams,
  StudyPathStateTypes,
  StudyPathType,
} from "types";

const initialState: StudyPathStateTypes = {
  studyPaths: null,
  filters: {
    page: 0,
    size: 6,
    text: "",
  },
  pagination: {
    pageNumber: 0,
    pageSize: 6,
    totalElements: 15,
  },
  messageError: null,
};

const studyPathSlice = createSlice({
  name: "studyPath",
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
          size: 6,
          text: "",
        },
      });
    },
    getAllStudyPathRequest: (state): void => {
      Object.assign(state, {});
    },
    getAllStudyPathSuccess: (
      state,
      action: PayloadAction<StudyPathType[]>
    ): void => {
      Object.assign(state, {
        studyPaths: action.payload,
        messageError: null,
      });
    },
    getAllStudyPathFailure: (state, action: PayloadAction<string>): void => {
      Object.assign(state, {
        studyPaths: null,
        messageError: action.payload,
      });
    },
  },
});

export const studyPathActions = studyPathSlice.actions;
export const studyPaths = (state: IRootReducer): Array<StudyPathType> | null =>
  state.studyPathReducer.studyPaths;
export const filters = (state: IRootReducer): QueryParams =>
  state.studyPathReducer.filters;
export const pagination = (state: IRootReducer): PaginationParams =>
  state.studyPathReducer.pagination;
export const messageError = (state: IRootReducer): string | null =>
  state.studyPathReducer.messageError;

export default studyPathSlice.reducer;
