// Vendor
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Src
import { IRootReducer } from "redux/rootReducer";
import {
  LessonStateTypes,
  LessonType,
  PaginationParams,
  QueryParams,
} from "types";

const initialState: LessonStateTypes = {
  lessons: null,
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

const lessonSlice = createSlice({
  name: "lesson",
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
    getAllLessonRequest: (state): void => {
      Object.assign(state, {});
    },
    getAllLessonSuccess: (state, action: PayloadAction<LessonType[]>): void => {
      Object.assign(state, {
        lessons: action.payload,
        messageError: null,
      });
    },
    getAllLessonFailure: (state, action: PayloadAction<string>): void => {
      Object.assign(state, {
        lessons: null,
        messageError: action.payload,
      });
    },
  },
});

export const lessonActions = lessonSlice.actions;
export const lessons = (state: IRootReducer): Array<LessonType> | null =>
  state.lessonReducer.lessons;
export const filters = (state: IRootReducer): QueryParams =>
  state.lessonReducer.filters;
export const pagination = (state: IRootReducer): PaginationParams =>
  state.lessonReducer.pagination;
export const messageError = (state: IRootReducer): string | null =>
  state.lessonReducer.messageError;

export default lessonSlice.reducer;
