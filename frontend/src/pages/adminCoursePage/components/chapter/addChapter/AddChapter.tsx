// Vendor
import { Path } from "api/paths";
import { useAppDispatch } from "common/hooks";
import { baseService } from "common/services/baseService";
import { loadingActions } from "common/services/loadingService/loadingSlice";
import { toast } from "react-toastify";
import FormAddUpdateChapter from "../components/FormAddUpdateChapter";
// Src
type Props = {};

const AddChapterPage = (props: Props) => {
  const dispatch = useAppDispatch();
  const addChapter = async (chapter: {
    title: string;
    course: { id: string };
  }) => {
    dispatch(loadingActions.startLoading());
    try {
      await baseService.POST(`${Path.GetAllChapters}`, chapter);
      toast.success("Thêm chương học thành công");
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }
    dispatch(loadingActions.endLoading());
  };
  return <FormAddUpdateChapter mode="add" onSubmit={addChapter} />;
};

export default AddChapterPage;
