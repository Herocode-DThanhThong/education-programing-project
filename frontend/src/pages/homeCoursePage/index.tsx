import { useAppDispatch, useAppSelector } from "common/hooks";
import {
  courseActions,
  courses,
} from "common/services/courseService/courseSlice";
import CourseCardList from "components/Courses/CourseCard/CourseCardList";
import { useEffect } from "react";
import Carousel from "./components/Carousel";
import { useRealTime } from "hooks";
interface Props {}

const HomeCourse = (props: Props) => {
  const dispatch = useAppDispatch();
  const courseData = useAppSelector(courses);
  const _ = useRealTime();

  useEffect(() => {
    dispatch(
      courseActions.setFilter({
        text: "",
        page: 0,
        size: 8,
      })
    );
    dispatch(courseActions.getAllCourseRequest());
  }, []);

  return (
    <div className="w-full p-4 pl-[120px]">
      <Carousel />

      <div className="mt-6 px-12">
        <h1 className="text-left font-bold text-xl capitalize">
          Các khóa học lập trình mới nhất
        </h1>
        {courseData && <CourseCardList courses={courseData} />}
      </div>
    </div>
  );
};

export default HomeCourse;
