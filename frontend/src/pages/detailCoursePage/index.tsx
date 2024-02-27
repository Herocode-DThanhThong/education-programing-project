import { Path } from "api/paths";
import { AxiosResponse } from "axios";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { userName } from "common/services/authService/authSlice";
import { baseService } from "common/services/baseService";
import { loadingActions } from "common/services/loadingService/loadingSlice";
import ProgressLearn from "components/Progress";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ChapterType, CourseType, ProgressType } from "types";
import CardReviewCourse from "./components/CardReviewCourse";
import ContentCourse from "./components/ContentCourse";
import InformationCourse from "./components/InformationCourse";
import InformationCourseSummary from "./components/InformationCourseSummary";
import { useRealTime } from "hooks";
interface Props {}

const DetailCoursePage = (props: Props) => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const userNameLoggedIn = useAppSelector(userName);
  const [courseDetail, setCourseDetail] = useState<CourseType | null>(null);
  const [chapterInCourse, setChapterInCourse] = useState<ChapterType[] | null>(
    null
  );
  const [isRegisterCourse, setIsRegisterCourse] = useState(false);
  const [currentProgress, setCurrentProgress] = useState<number | null>(null);
  const _ = useRealTime();
  useEffect(() => {
    fetchCourseDetail();
    fetchChapterByCourse();
  }, []);

  const fetchCourseDetail = async () => {
    dispatch(loadingActions.startLoading());
    try {
      const response: AxiosResponse<CourseType> = await baseService.GET(
        `${Path.GetAllCourses}/${id}`
      );
      const isRegister = !!response.data.registeredUser.find(
        (user) => user.userName === userNameLoggedIn
      );
      if (isRegister) {
        await fetchProgressDetailByCourse();
      }
      setCourseDetail(response.data);
      setIsRegisterCourse(isRegister);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(loadingActions.endLoading());
    }
  };

  const fetchChapterByCourse = async () => {
    dispatch(loadingActions.startLoading());
    try {
      const response = await baseService.GET(
        `${Path.GetAllChaptersByCourse}?courseId=${id}`
      );
      setChapterInCourse(response.data);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(loadingActions.endLoading());
    }
  };

  const fetchRegisterCourse = async () => {
    dispatch(loadingActions.startLoading());
    try {
      await baseService.POST(`${Path.RegisterCourse}`, {
        course: { id },
        user: { userName: userNameLoggedIn },
      });
      await fetchCreateProgressLearn({
        courseId: id as string,
        currentNumberLesson: 1,
      });
      await fetchCourseDetail();
      toast.success("Đăng ký khóa học thành công");
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(loadingActions.endLoading());
    }
  };

  const fetchCreateProgressLearn = async (params: {
    courseId: string;
    currentNumberLesson: number;
  }) => {
    dispatch(loadingActions.startLoading());
    try {
      await baseService.POST(`${Path.GetProgressLearn}`, params);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(loadingActions.endLoading());
    }
  };

  const fetchProgressDetailByCourse = async () => {
    dispatch(loadingActions.startLoading());
    try {
      const response: AxiosResponse<ProgressType> = await baseService.GET(
        `${Path.GetProgressLearn}/${id}`
      );
      setCurrentProgress(response.data.currentNumberLesson as number);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(loadingActions.endLoading());
    }
  };

  const getTotalLessonInCourse = () => {
    let total = 0;
    chapterInCourse?.forEach((chap) => {
      chap.lessons.forEach((_) => total++);
    });
    return total;
  };

  return (
    <div className="w-full p-4 pl-[120px]">
      <div className="flex justify-between">
        {/* Describe for the course */}
        <div className="px-12 w-2/3">
          {courseDetail && <InformationCourse courseDetail={courseDetail} />}
          {chapterInCourse && (
            <ContentCourse
              chapterInCourse={chapterInCourse}
              currentProgress={currentProgress}
            />
          )}
          {/* Content course */}
        </div>

        {/* Register course */}
        <div className="flex-1 flex flex-col items-center">
          {/* Card course */}
          {courseDetail && <CardReviewCourse courseDetail={courseDetail} />}
          {/* Summary infomation of course */}
          {chapterInCourse && courseDetail && (
            <InformationCourseSummary
              isRegisterCourse={isRegisterCourse}
              chapterInCourse={chapterInCourse}
              fetchRegisterCourse={fetchRegisterCourse}
            />
          )}
          {/* Summary infomation of course */}
          {/* Progress bar */}
          {isRegisterCourse && currentProgress && (
            <ProgressLearn
              totalLesson={getTotalLessonInCourse()}
              currentProgress={currentProgress}
            />
          )}
          {/* Progress bar */}
        </div>
      </div>
    </div>
  );
};

export default DetailCoursePage;
