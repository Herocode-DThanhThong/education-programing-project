// Vendor
import { Path } from "api/paths";
import { useAppDispatch } from "common/hooks";
import { baseService } from "common/services/baseService";
import { loadingActions } from "common/services/loadingService/loadingSlice";
import { toast } from "react-toastify";
import { StudyPathType } from "types";
import FormAddUpdateStudyPath from "../components/FormAddUpdateStudyPath";
// Src
type Props = {};

const AddStudyPathPage = (props: Props) => {
  const dispatch = useAppDispatch();

  const addStudyPath = async (
    studyPath: Pick<StudyPathType, "title" | "description">
  ) => {
    dispatch(loadingActions.startLoading());
    try {
      await baseService.POST(`${Path.GetAllStudyPaths}`, studyPath);
      toast.success("Thêm lộ trình học thành công");
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(loadingActions.endLoading());
    }
  };
  return <FormAddUpdateStudyPath mode="add" onSubmit={addStudyPath} />;
};

export default AddStudyPathPage;
