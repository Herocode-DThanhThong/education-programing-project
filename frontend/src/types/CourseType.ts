import { PaginationParams, QueryParams } from "./CommonType";
import { UserType } from "./UserType";

export type CourseType = {
  id: string;
  title: string;
  description: string;
  image: string;
  createdDate: string;
  updatedDate: string;
  registeredUser: Array<UserType>;
};

export type TotalCourseByUserType = {
  idCourse: string;
  courseName: string;
  totalUser: number;
  imgeUrl: string;
};

export type StatisticCourse = {
  idCourse: string;
  courseName: string;
  totalChapter: number;
  totalLesson: number;
  createdDate: string;
  updatedDate: string;
};

export type CourseStateTypes = {
  courses: Array<CourseType> | null;
  filters: QueryParams;
  pagination: PaginationParams;
  messageError: string | null;
};
