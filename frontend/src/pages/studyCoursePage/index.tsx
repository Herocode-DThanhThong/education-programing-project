import { Path } from "api/paths";
import { AxiosResponse } from "axios";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { userName } from "common/services/authService/authSlice";
import { baseService } from "common/services/baseService";
import { loadingActions } from "common/services/loadingService/loadingSlice";
import { useQueryParams, useRealTime } from "hooks";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ChapterType, CourseType, LessonType, ProgressType } from "types";
import ChapterBar from "./components/Chapter/ChapterBar";
import LessonVideo from "./components/LessonVideo/LessonVideo";
import LessonText from "./components/LessonText/LessonText";
import LessonExercise from "./components/LessonExercise/LessonExercise";
type Props = {};

const StudyCoursePage = (props: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userNameLoggedIn = useAppSelector(userName);
  const { courseId } = useParams();
  const { lessonId, chapterId } = useQueryParams();
  const [chapterInCourse, setChapterInCourse] = useState<
    ChapterType[] | null
  >();
  const [lessonDetail, setLessonDetail] = useState<LessonType | null>();
  const [isRegisterCourse, setIsRegisterCourse] = useState(false);
  const [currentProgress, setCurrentProgress] = useState<number | null>(null);
  const [currentLessonLearn, setCurrentLessonLearn] = useState<number | null>(
    null
  );
  const [isDoneCourse, setIsDoneCourse] = useState<boolean | null>(null);
  const _ = useRealTime();
  useEffect(() => {
    /**
     * Logic chỗ này là dùng để xử lý cái case: khi mà khóa học hoàn thành nhưng người dùng đã học tới bài kết thúc
     * logic xử lý: khi người dùng đã học xong thì sẽ lưu 1 cái biến là done: true ở backend
     * khi mà người dùng lần đầu vào bài học thì sẽ check status nó là done trong total lesson lại lớn hơn cái current progress -> đồng nghĩa là admin đã thêm bài học mới mà người dùng chưa học
     * nên sẽ tăng cái progress và update lại status done là false
     * */
    (async () => {
      if (
        chapterInCourse &&
        lessonDetail &&
        currentProgress &&
        isDoneCourse &&
        courseId
      ) {
        const totalNumberLesson = getTotalLesson();
        if (totalNumberLesson > currentProgress) {
          fetchUpdateProgressLearn({
            courseId,
            currentNumberLesson: currentProgress + 1,
            done: false,
          });
        }
      }
    })();
  }, [chapterInCourse, lessonDetail, currentProgress, isDoneCourse, courseId]);

  const fetchChapterByCourse = async () => {
    dispatch(loadingActions.startLoading());
    try {
      const response = await baseService.GET(
        `${Path.GetAllChaptersByCourse}?courseId=${courseId}`
      );
      setChapterInCourse(response.data);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(loadingActions.endLoading());
    }
  };

  const getNumberLesson = (chapters: ChapterType[], lessonId: string) => {
    let number = 1;
    let result = 1;
    chapters.forEach((chap) => {
      chap.lessons.forEach((less) => {
        if (less.id === lessonId) result = number;
        number++;
      });
    });
    return result;
  };
  const getTotalLesson = () => {
    let result = 0;
    chapterInCourse?.forEach((chap) => {
      chap.lessons.forEach((less) => {
        result++;
      });
    });
    return result;
  };

  const fetchLearningCourseDetail = async () => {
    dispatch(loadingActions.startLoading());
    try {
      const responseCourse: AxiosResponse<CourseType> = await baseService.GET(
        `${Path.GetAllCourses}/${courseId}`
      );
      const responseChapter: AxiosResponse<ChapterType[]> =
        await baseService.GET(
          `${Path.GetAllChaptersByCourse}?courseId=${courseId}`
        );
      const responseLesson: AxiosResponse<LessonType> = await baseService.GET(
        `${Path.GetAllLessons}/${lessonId}`
      );
      const num = getNumberLesson(
        responseChapter.data as ChapterType[],
        lessonId
      );

      const isRegister = !!responseCourse.data.registeredUser.find(
        (user) => user.userName === userNameLoggedIn
      );

      if (isRegister) {
        const data = await fetchProgressDetailByCourse();
        if (data?.currentNumberLesson) {
          setCurrentProgress(data.currentNumberLesson as number);
          setIsDoneCourse(data.done);
          if (num > data.currentNumberLesson) navigate("/");
        }
      } else {
        navigate("/");
      }

      setIsRegisterCourse(true);
      setLessonDetail(responseLesson.data);
      setChapterInCourse(responseChapter.data);
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
        `${Path.GetProgressLearn}/${courseId}`
      );
      return {
        currentNumberLesson: response.data.currentNumberLesson,
        done: response.data.done,
      };
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(loadingActions.endLoading());
    }
  };

  const fetchUpdateProgressLearn = async (params: {
    courseId: string;
    currentNumberLesson: number;
    done: boolean;
  }) => {
    if (currentProgress) {
      // End course
      /**
       * chỗ if này dùng để check đã hoàn thành xong bài học đó chưa
       */
      if (params.currentNumberLesson > getTotalLesson()) {
        await baseService.PUT(`${Path.GetProgressLearn}/${courseId}`, {
          courseId,
          currentNumberLesson: currentProgress,
          done: true,
        });
        return;
      }
      try {
        await baseService.PUT(`${Path.GetProgressLearn}/${courseId}`, {
          ...params,
          done: params.done,
        });

        setCurrentProgress(currentProgress + 1);
        setCurrentLessonLearn(currentProgress + 1);
      } catch (error: any) {
        console.log(error);
        toast.error(error.response.data.message);
      }
    }
  };

  const handleChangeLesson = (lesson: LessonType) => {
    setLessonDetail(lesson);
  };

  useEffect(() => {
    fetchChapterByCourse();
    fetchLearningCourseDetail();
  }, []);

  return (
    <>
      {/* Start Container */}
      <div className="w-full h-full pl-[120px] pr-[400px]">
        {lessonDetail &&
          chapterInCourse &&
          currentProgress &&
          courseId &&
          currentLessonLearn && (
            <>
              {lessonDetail.type === "LESSON_VIDEO" && (
                <LessonVideo
                  chapters={chapterInCourse}
                  courseId={courseId}
                  currentProgress={currentProgress}
                  currentLessonLearn={currentLessonLearn}
                  lessonDetail={lessonDetail}
                  fetchUpdateProgressLearn={fetchUpdateProgressLearn}
                />
              )}
              {lessonDetail.type === "LESSON_TEXT" && (
                <LessonText
                  chapters={chapterInCourse}
                  courseId={courseId}
                  currentProgress={currentProgress}
                  currentLessonLearn={currentLessonLearn}
                  lessonDetail={lessonDetail}
                  fetchUpdateProgressLearn={fetchUpdateProgressLearn}
                />
              )}
              {lessonDetail.type === "LESSON_EXERCISE" && (
                <LessonExercise
                  chapters={chapterInCourse}
                  courseId={courseId}
                  currentProgress={currentProgress}
                  currentLessonLearn={currentLessonLearn}
                  lessonDetail={lessonDetail}
                  fetchUpdateProgressLearn={fetchUpdateProgressLearn}
                />
              )}
            </>
          )}
      </div>

      {chapterInCourse && isRegisterCourse && courseId && lessonId && (
        <ChapterBar
          currentProgress={currentProgress}
          courseId={courseId}
          lessonId={lessonId}
          chapters={chapterInCourse}
          changeLesson={handleChangeLesson}
          setCurrentLessonLearning={(num: number) => setCurrentLessonLearn(num)}
        />
      )}
      {/* End Container */}
    </>
  );
};

export default StudyCoursePage;
