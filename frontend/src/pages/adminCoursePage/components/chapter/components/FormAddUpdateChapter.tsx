// Vendor
import { Button } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { Path } from "api/paths";
import { AxiosResponse } from "axios";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { baseService } from "common/services/baseService";
import {
  loading,
  loadingActions,
} from "common/services/loadingService/loadingSlice";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CourseType } from "types";
type Props = {
  initialValues?: {
    title: string;
    course: CourseType;
  };
  mode: "add" | "update";
  onSubmit: (chapter: {
    title: string;
    course: {
      id: string;
    };
  }) => Promise<void>;
};

const FormAddUpdateChapter = ({ initialValues, onSubmit, mode }: Props) => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(loading);
  const [formValues, setFormValues] = useState<{
    title: string;
    course: Pick<CourseType, "id">;
  }>({
    title: "",
    course: {
      id: "",
    },
  });
  const [optionsCourse, setOptionsCourse] = useState<
    Array<{ label: string; value: string }>
  >([]);

  useEffect(() => {
    if (initialValues)
      setFormValues({
        title: initialValues.title,
        course: { id: initialValues.course.id },
      });
  }, [initialValues]);

  useEffect(() => {
    fetchOptionsCourse();
  }, []);

  const fetchOptionsCourse = async () => {
    dispatch(loadingActions.startLoading());
    try {
      const response: AxiosResponse<Array<CourseType>> = await baseService.GET(
        Path.GetAllCoursesNotPagination
      );
      const options = response.data.map((item) => ({
        label: item.title,
        value: item.id,
      }));
      setOptionsCourse(options);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(loadingActions.endLoading());
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate data
    if (!formValues.title || !formValues.course.id)
      return alert("Vui lòng nhập đầy đủ thông tin");

    // Submit data
    await onSubmit(formValues);

    // Clear value
    if (mode === "add")
      setFormValues({
        title: "",
        course: {
          id: "",
        },
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="text-xl font-semibold mb-6">Cập nhật chương học</h1>
      <div className="my-4">
        <TextField
          name="title"
          className="w-full"
          size="small"
          required
          id="outlined-required"
          label="Tên chương"
          onChange={(e) =>
            setFormValues({ ...formValues, title: e.target.value })
          }
          value={formValues.title}
        />
      </div>
      <div className="col-span-2 mt-2">
        <Select
          size="small"
          name="course"
          fullWidth
          value={formValues.course.id}
          onChange={(e) =>
            setFormValues({
              ...formValues,
              course: { id: e.target.value },
            })
          }
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem value={""}>
            <em>------- Chọn khóa học muốn thêm chương -------</em>
          </MenuItem>
          {optionsCourse.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </div>

      <Button
        disabled={isLoading}
        sx={{ mt: 2 }}
        type="submit"
        variant="contained"
        size="small"
      >
        Lưu
      </Button>
    </form>
  );
};

export default FormAddUpdateChapter;
