// Vendor
import { Path } from "api/paths";
import { useAppDispatch } from "common/hooks";
import { baseService } from "common/services/baseService";
import { loadingActions } from "common/services/loadingService/loadingSlice";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { CourseType } from "types";
import FormAddUpdateChapter from "../components/FormAddUpdateChapter";
type Props = {};

const EditChapterPage = (props: Props) => {
  const dispatch = useAppDispatch();
  const [initialValues, setInitialValues] = useState<{
    title: string;
    course: CourseType;
  } | null>(null);
  const { id } = useParams();

  useEffect(() => {
    fetchChapterDetail();
  }, []);

  const fetchChapterDetail = async () => {
    dispatch(loadingActions.startLoading());
    try {
      const response = await baseService.GET(`${Path.GetAllChapters}/${id}`);
      setInitialValues(response.data);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(loadingActions.endLoading());
    }
  };

  const updateChapter = async (chapter: {
    title: string;
    course: { id: string };
  }) => {
    dispatch(loadingActions.startLoading());
    try {
      const response = await baseService.PUT(
        `${Path.GetAllChapters}/${id}`,
        chapter
      );
      setInitialValues(response.data);
      toast.success("Cập nhật chương học thành công");
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
        <FormAddUpdateChapter
          onSubmit={updateChapter}
          initialValues={initialValues}
          mode="update"
        />
      )}
    </>
  );
};

export default EditChapterPage;
