import { CourseType } from "types";
import CourseCardItem from "./CourseCardItem";

interface Props {
  courses: Array<CourseType>;
}

const CourseCardList = ({ courses }: Props) => {
  return (
    <div className="grid grid-cols-4 gap-2 mt-4">
      {courses.map((course, _) => (
        <CourseCardItem key={course.id} course={course} />
      ))}
    </div>
  );
};

export default CourseCardList;
