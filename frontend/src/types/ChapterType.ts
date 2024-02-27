import { PaginationParams, QueryParams } from "./CommonType";
import { CourseType } from "./CourseType";
import { LessonType } from "./LessonType";

export type ChapterType = {
  id: string;
  title: string;
  course: {
    id: string;
  };
  lessons: LessonType[];
  createdDate: string;
  updatedDate: string;
};

export type ChapterStateTypes = {
  chapters: Array<ChapterType> | null;
  filters: QueryParams;
  pagination: PaginationParams;
  messageError: string | null;
};

export interface ChapterTypeWithLessons {
  id: string;
  title: string;
  course: CourseType;
  createdDate: string;
  updatedDate: string;
  lessons: LessonType[];
}
