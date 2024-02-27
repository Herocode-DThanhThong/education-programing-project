// Vendor
import { Path } from "api/paths";
import { useAppDispatch } from "common/hooks";
import { baseService } from "common/services/baseService";
import { loadingActions } from "common/services/loadingService/loadingSlice";
import { toast } from "react-toastify";
import FormAddUpdateLesson from "../components/FormAddUpdateLesson";
// Src
type Props = {};

const AddLessonPage = (props: Props) => {
  const dispatch = useAppDispatch();
  const addLesson = async (lesson: {
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
      await baseService.POST(`${Path.GetAllLessons}`, lesson);
      toast.success("Thêm bài học thành công");
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(loadingActions.endLoading());
    }
  };
  return <FormAddUpdateLesson mode="add" onSubmit={addLesson} />;
};

export default AddLessonPage;
