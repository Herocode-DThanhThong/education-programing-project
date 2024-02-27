// Vendor
import { Path } from "api/paths";
import { useAppDispatch } from "common/hooks";
import { baseService } from "common/services/baseService";
import { loadingActions } from "common/services/loadingService/loadingSlice";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { CourseType } from "types";
import FormAddUpdateCourse from "../components/FormAddUpdateCourse";
type Props = {};
const EditCourse = (props: Props) => {
  const [initialValues, setInitialValues] = useState<{
    title: string;
    description: string;
    image: string;
    hashTag: string;
  } | null>(null);
  const { id } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchCourseDetail();
  }, []);

  const fetchCourseDetail = async () => {
    dispatch(loadingActions.startLoading());
    try {
      const response = await baseService.GET(`${Path.GetAllCourses}/${id}`);
      setInitialValues(response.data);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(loadingActions.endLoading());
    }
  };

  const updateCourse = async (
    course: Pick<CourseType, "title" | "description" | "image">
  ) => {
    dispatch(loadingActions.startLoading());
    try {
      const response = await baseService.PUT(
        `${Path.GetAllCourses}/${id}`,
        course
      );
      setInitialValues(response.data);
      toast.success("Cập nhật khóa học thành công");
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(loadingActions.endLoading());
    }
  };

  return initialValues ? (
    <FormAddUpdateCourse
      initialValues={initialValues}
      onSubmit={updateCourse}
      mode="update"
    />
  ) : (
    <></>
  );
};

export default EditCourse;
