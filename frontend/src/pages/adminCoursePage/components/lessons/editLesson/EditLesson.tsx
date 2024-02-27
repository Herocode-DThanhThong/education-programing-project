// Vendor
import { Path } from "api/paths";
import { useAppDispatch } from "common/hooks";
import { baseService } from "common/services/baseService";
import { loadingActions } from "common/services/loadingService/loadingSlice";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ChapterType } from "types";
import FormAddUpdateLesson from "../components/FormAddUpdateLesson";

type Props = {};

const EditLessonPage = (props: Props) => {
  const dispatch = useAppDispatch();
  const [initialValues, setInitialValues] = useState<{
    title: string;
    videoId: string;
    content: string;
    chapter: ChapterType;
    type: "LESSON_VIDEO" | "LESSON_TEXT" | "LESSON_EXERCISE";
    totalQuestion: number;
    answerKeys: string;
  } | null>(null);
  const { id } = useParams();

  useEffect(() => {
    fetchLessonDetail();
  }, []);

  const fetchLessonDetail = async () => {
    dispatch(loadingActions.startLoading());
    try {
      const response = await baseService.GET(`${Path.GetAllLessons}/${id}`);
      setInitialValues(response.data);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(loadingActions.endLoading());
    }
  };

  const updateLesson = async (lesson: {
    title: string;
    videoId: string;
    content: string;
    chapter: { id: string };
    type: "LESSON_VIDEO" | "LESSON_TEXT" | "LESSON_EXERCISE";
    totalQuestion: number;
    answerKeys: string;
  }) => {
    if (lesson.totalQuestion !== lesson.answerKeys.length)
      return alert("Số lượng câu hỏi không trùng khớp với số lượng đáp án!");
    dispatch(loadingActions.startLoading());
    try {
      const response = await baseService.PUT(
        `${Path.GetAllLessons}/${id}`,
        lesson
      );
      setInitialValues(response.data);
      toast.success("Cập nhật bài học thành công");
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(loadingActions.endLoading());
    }
  };

  return (
    <>
      {initialValues && (
        <FormAddUpdateLesson
          onSubmit={updateLesson}
          initialValues={initialValues}
          mode="update"
        />
      )}
    </>
  );
};

export default EditLessonPage;
