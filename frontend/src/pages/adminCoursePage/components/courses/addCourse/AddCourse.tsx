// Vendor
import { Path } from "api/paths";
import { baseService } from "common/services/baseService";
import { toast } from "react-toastify";
import { CourseType } from "types";
import FormAddUpdateCourse from "../components/FormAddUpdateCourse";
import { useAppDispatch } from "common/hooks";
import { loadingActions } from "common/services/loadingService/loadingSlice";
// Src
type Props = {};

const AddCoursePage = (props: Props) => {
  const dispatch = useAppDispatch();
  const addCourse = async (
    course: Pick<CourseType, "title" | "description" | "image">
  ) => {
    dispatch(loadingActions.startLoading());
    try {
      await baseService.POST(`${Path.GetAllCourses}`, course);
      toast.success("Thêm khóa học thành công");
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(loadingActions.endLoading());
    }
  };
  return <FormAddUpdateCourse mode="add" onSubmit={addCourse} />;
};

export default AddCoursePage;
