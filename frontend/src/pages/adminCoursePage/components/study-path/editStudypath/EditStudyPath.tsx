// Vendor
import { Path } from "api/paths";
import { useAppDispatch } from "common/hooks";
import { baseService } from "common/services/baseService";
import { loadingActions } from "common/services/loadingService/loadingSlice";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { StudyPathType } from "types";
import FormAddUpdateStudyPath from "../components/FormAddUpdateStudyPath";
type Props = {};
const EditStudyPathPage = (props: Props) => {
  const [initialValues, setInitialValues] = useState<{
    title: string;
    description: string;
  } | null>(null);
  const { id } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchStudyPathDetail();
  }, []);

  const fetchStudyPathDetail = async () => {
    dispatch(loadingActions.startLoading());
    try {
      const response = await baseService.GET(`${Path.GetAllStudyPaths}/${id}`);
      setInitialValues(response.data);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(loadingActions.endLoading());
    }
  };

  const updateStudyPath = async (
    studyPath: Pick<StudyPathType, "title" | "description">
  ) => {
    dispatch(loadingActions.startLoading());
    try {
      const response = await baseService.PUT(
        `${Path.GetAllStudyPaths}/${id}`,
        studyPath
      );
      setInitialValues(response.data);
      toast.success("Cập nhật lộ trình thành công");
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
        <FormAddUpdateStudyPath
          initialValues={initialValues}
          onSubmit={updateStudyPath}
          mode="update"
        />
      )}
    </>
  );
};

export default EditStudyPathPage;
