import { PaginationParams, QueryParams } from "./CommonType";

export type LessonType = {
  id: string;
  title: string;
  chapter: {
    id: string;
  };
  content: string;
  videoId: string;
  type: "LESSON_VIDEO" | "LESSON_TEXT" | "LESSON_EXERCISE";
  totalQuestion: number;
  answerKeys: string;
  createdDate: string;
  updatedDate: string;
};

export type LessonStateTypes = {
  lessons: Array<LessonType> | null;
  filters: QueryParams;
  pagination: PaginationParams;
  messageError: string | null;
};
