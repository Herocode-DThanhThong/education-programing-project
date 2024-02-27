// Vendor
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Src
import { IRootReducer } from "redux/rootReducer";
import { PaginationParams, QueryParams } from "types";
import { ChapterStateTypes, ChapterType } from "types";

const initialState: ChapterStateTypes = {
  chapters: null,
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

const chapterSlice = createSlice({
  name: "chapter",
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
    getAllChapterRequest: (state): void => {
      Object.assign(state, {});
    },
    getAllChapterSuccess: (
      state,
      action: PayloadAction<ChapterType[]>
    ): void => {
      Object.assign(state, {
        chapters: action.payload,
        messageError: null,
      });
    },
    getAllChapterFailure: (state, action: PayloadAction<string>): void => {
      Object.assign(state, {
        chapters: null,
        messageError: action.payload,
      });
    },
  },
});

export const chapterActions = chapterSlice.actions;
export const chapters = (state: IRootReducer): Array<ChapterType> | null =>
  state.chapterReducer.chapters;
export const filters = (state: IRootReducer): QueryParams =>
  state.chapterReducer.filters;
export const pagination = (state: IRootReducer): PaginationParams =>
  state.chapterReducer.pagination;
export const messageError = (state: IRootReducer): string | null =>
  state.chapterReducer.messageError;

export default chapterSlice.reducer;
