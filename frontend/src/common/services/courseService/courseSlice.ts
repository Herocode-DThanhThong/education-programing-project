// Vendor
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Src
import { IRootReducer } from "redux/rootReducer";
import {
  CourseStateTypes,
  CourseType,
  PaginationParams,
  QueryParams,
} from "types";

const initialState: CourseStateTypes = {
  courses: null,
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

const courseSlice = createSlice({
  name: "course",
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
    getAllCourseRequest: (state): void => {
      Object.assign(state, {});
    },
    getAllCourseSuccess: (state, action: PayloadAction<CourseType[]>): void => {
      Object.assign(state, {
        courses: action.payload,
        messageError: null,
      });
    },
    getAllCourseFailure: (state, action: PayloadAction<string>): void => {
      Object.assign(state, {
        courses: null,
        messageError: action.payload,
      });
    },
  },
});

export const courseActions = courseSlice.actions;
export const courses = (state: IRootReducer): Array<CourseType> | null =>
  state.courseReducer.courses;
export const filters = (state: IRootReducer): QueryParams =>
  state.courseReducer.filters;
export const pagination = (state: IRootReducer): PaginationParams =>
  state.courseReducer.pagination;
export const messageError = (state: IRootReducer): string | null =>
  state.courseReducer.messageError;

export default courseSlice.reducer;
