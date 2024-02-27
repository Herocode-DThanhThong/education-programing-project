import { Path } from "api/paths";
import { AxiosResponse } from "axios";
import { useAppDispatch } from "common/hooks";
import { baseService } from "common/services/baseService";
import { loadingActions } from "common/services/loadingService/loadingSlice";
import CourseCardList from "components/Courses/CourseCard/CourseCardList";
import { useRealTime } from "hooks";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CourseType } from "types";
type Props = {};

const MyCoursePage = (props: Props) => {
  const dispatch = useAppDispatch();
  const [myCourses, setMyCourses] = useState<CourseType[] | null>(null);
  const _ = useRealTime();
  useEffect(() => {
    fetchMyCourses();
  }, []);

  const fetchMyCourses = async () => {
    dispatch(loadingActions.startLoading());
    try {
      const response: AxiosResponse<CourseType[]> = await baseService.GET(
        `${Path.GetAllCourses}/my-course`
      );
      setMyCourses(response.data);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(loadingActions.endLoading());
    }
  };

  return (
    <div className="w-full h-full pl-[120px]">
      <div className="p-4">
        <h1 className="text-left font-bold text-2xl tracking-wide">
          Khóa học của bạn đã đăng ký
        </h1>
        {myCourses && <CourseCardList courses={myCourses} />}
      </div>
    </div>
  );
};

export default MyCoursePage;
