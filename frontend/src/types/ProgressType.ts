import { UserType } from "./UserType";

export type ProgressType = {
  id: string;
  courseId: string;
  currentNumberLesson: number;
  user: UserType;
  done: boolean;
};
