import { PaginationParams, QueryParams } from "./CommonType";

export type StudyPathType = {
  id: string;
  title: string;
  description: string;
  createdDate: string;
  updatedDate: string;
};

export type StudyPathStateTypes = {
  studyPaths: Array<StudyPathType> | null;
  filters: QueryParams;
  pagination: PaginationParams;
  messageError: string | null;
};
