import { Path } from "api/paths";
import { AxiosResponse } from "axios";
import { useAppDispatch } from "common/hooks";
import { baseService } from "common/services/baseService";
import { loadingActions } from "common/services/loadingService/loadingSlice";
import CourseCardList from "components/Courses/CourseCard/CourseCardList";
import { useQueryParams, useRealTime } from "hooks";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CourseType } from "types";
interface Props {}

const SearchCoursePagee = (props: Props) => {
  const [allCourse, setAllCourse] = useState<Array<CourseType> | null>(null);
  const dispatch = useAppDispatch();
  const { text } = useQueryParams();
  const _ = useRealTime();
  useEffect(() => {
    fetchAllCourse();
  }, [text]);

  const fetchAllCourse = async () => {
    dispatch(loadingActions.startLoading());
    try {
      const response: AxiosResponse<Array<CourseType>> = await baseService.GET(
        `${Path.GetAllCoursesNotPagination}?text=${text}`
      );
      setAllCourse(response.data);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(loadingActions.endLoading());
    }
  };

  return (
    <div className="w-full p-4 pl-[120px]">
      <div className="px-12">
        <h1 className="text-left font-bold text-xl">
          Kết quả tìm kiếm: {allCourse?.length || 0}
        </h1>
      </div>

      <div className="px-12">
        {allCourse && <CourseCardList courses={allCourse} />}
      </div>
    </div>
  );
};

export default SearchCoursePagee;
