// Vendor
import { Button } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { Path } from "api/paths";
import { AxiosResponse } from "axios";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { baseService } from "common/services/baseService";
import {
  loading,
  loadingActions,
} from "common/services/loadingService/loadingSlice";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ChapterType } from "types";
import FormItemLessonExercise from "./FormItemLessonExercise";
import FormItemLessonText from "./FormItemLessonText";
import FormItemLessonVideo from "./FormItemLessonVideo";
type Props = {
  initialValues?: {
    title: string;
    videoId: string;
    content: string;
    chapter: ChapterType;
    type: "LESSON_VIDEO" | "LESSON_TEXT" | "LESSON_EXERCISE";
    totalQuestion: number;
    answerKeys: string;
  };
  mode: "add" | "update";
  onSubmit: (lesson: {
    title: string;
    videoId: string;
    content: string;
    chapter: {
      id: string;
    };
    type: "LESSON_VIDEO" | "LESSON_TEXT" | "LESSON_EXERCISE";
    totalQuestion: number;
    answerKeys: string;
  }) => Promise<void>;
};

const FormAddUpdateLesson = ({ initialValues, onSubmit, mode }: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(loading);
  const [formValues, setFormValues] = useState<{
    title: string;
    videoId: string;
    content: string;
    chapter: Pick<ChapterType, "id">;
    type: "LESSON_VIDEO" | "LESSON_TEXT" | "LESSON_EXERCISE";
    totalQuestion: number;
    answerKeys: string;
  }>({
    title: "",
    videoId: "",
    content: "",
    chapter: {
      id: "",
    },
    type: "LESSON_VIDEO",
    totalQuestion: 0,
    answerKeys: "",
  });
  const [optionsChapter, setOptionsChapter] = useState<
    Array<{ label: string; value: string }>
  >([]);

  useEffect(() => {
    if (initialValues)
      setFormValues({
        title: initialValues.title,
        content: initialValues.content,
        videoId: initialValues.videoId,
        chapter: { id: initialValues.chapter.id },
        type: initialValues.type,
        totalQuestion: initialValues.totalQuestion,
        answerKeys: initialValues.answerKeys,
      });
  }, [initialValues]);

  useEffect(() => {
    fetchOptionsChapter();
  }, []);

  const fetchOptionsChapter = async () => {
    dispatch(loadingActions.startLoading());
    try {
      const response: AxiosResponse<Array<ChapterType>> = await baseService.GET(
        Path.GetAllChaptersNotPagination
      );
      const options = response.data.map((item) => ({
        label: item.title,
        value: item.id,
      }));
      setOptionsChapter(options);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(loadingActions.endLoading());
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Submit data
    await onSubmit(formValues);

    navigate("/admin/lesson");
  };

  const onLessonTypeChange = (e: any) => {
    if (initialValues && e.target.value === initialValues.type) {
      setFormValues({
        title: initialValues.title,
        content: initialValues.content,
        videoId: initialValues.videoId,
        chapter: { id: initialValues.chapter.id },
        type: initialValues.type,
        totalQuestion: initialValues.totalQuestion,
        answerKeys: initialValues.answerKeys,
      });
    } else {
      setFormValues({
        title: "",
        videoId: "",
        content: "",
        chapter: { id: initialValues ? initialValues.chapter.id : "" }, // Mục đích là để giữ nguyên cái giá trị chapter khi thay đổi type bài học
        type: e.target.value,
        totalQuestion: 0,
        answerKeys: "",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="text-xl font-semibold mb-6">
        {mode === "add" ? "Thêm bài học" : "Cập nhật bài học"}
      </h1>
      <div className="mb-2">
        <p>Loại bài học</p>
        <RadioGroup
          value={formValues.type}
          onChange={onLessonTypeChange}
          defaultValue={"LESSON_VIDEO"}
          name="type"
        >
          <FormControlLabel
            value="LESSON_VIDEO"
            control={<Radio size="small" />}
            label="Bài giảng"
          />
          <FormControlLabel
            value="LESSON_TEXT"
            control={<Radio size="small" />}
            label="Lý thuyết"
          />
          <FormControlLabel
            value="LESSON_EXERCISE"
            control={<Radio size="small" />}
            label="Bài tập"
          />
        </RadioGroup>
      </div>
      {formValues.type === "LESSON_VIDEO" && (
        <FormItemLessonVideo
          formValues={formValues}
          setFormValues={setFormValues}
          optionsChapter={optionsChapter}
        />
      )}

      {formValues.type === "LESSON_TEXT" && (
        <FormItemLessonText
          formValues={formValues}
          setFormValues={setFormValues}
          optionsChapter={optionsChapter}
        />
      )}

      {formValues.type === "LESSON_EXERCISE" && (
        <FormItemLessonExercise
          formValues={formValues}
          setFormValues={setFormValues}
          optionsChapter={optionsChapter}
        />
      )}

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

export default FormAddUpdateLesson;
