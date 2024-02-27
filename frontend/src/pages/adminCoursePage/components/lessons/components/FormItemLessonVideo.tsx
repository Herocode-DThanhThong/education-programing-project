// Vendor
import { MenuItem } from "@mui/material";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useQuill } from "react-quilljs";
import { ChapterType } from "types";

type Props = {
  formValues: {
    title: string;
    videoId: string;
    content: string;
    chapter: Pick<ChapterType, "id">;
    type: "LESSON_VIDEO" | "LESSON_TEXT" | "LESSON_EXERCISE";
    totalQuestion: number;
    answerKeys: string;
  };
  setFormValues: Dispatch<
    SetStateAction<{
      title: string;
      videoId: string;
      content: string;
      chapter: Pick<ChapterType, "id">;
      type: "LESSON_VIDEO" | "LESSON_TEXT" | "LESSON_EXERCISE";
      totalQuestion: number;
      answerKeys: string;
    }>
  >;
  optionsChapter: {
    label: string;
    value: string;
  }[];
};

const FormItemLessonVideo = ({
  formValues,
  setFormValues,
  optionsChapter,
}: Props) => {
  const { quill, quillRef } = useQuill();

  useEffect(() => {
    if (quill) {
      quill.on("text-change", (delta, oldDelta, source) => {
        setFormValues((prev) => ({
          ...prev,
          content: quill.root.innerHTML,
        }));
      });
    }
  }, [quill]);

  useEffect(() => {
    // Use it to set default value when component is form update
    if (quill) {
      quill.clipboard.dangerouslyPasteHTML(formValues.content);
    }
  }, [quill]);
  return (
    <div className="grid grid-cols-2 gap-2">
      <TextField
        name="title"
        className="w-full"
        size="small"
        required
        id="outlined-required"
        label="Tên bài học"
        onChange={(e) =>
          setFormValues({ ...formValues, title: e.target.value })
        }
        value={formValues.title}
      />

      <TextField
        name="videoId"
        className="w-full"
        size="small"
        id="outlined-required"
        label="Video ID"
        onChange={(e) =>
          setFormValues({ ...formValues, videoId: e.target.value })
        }
        value={formValues.videoId}
      />

      <div className="my-4 h-[200px] col-span-2">
        <p>Lý thuyết</p>
        <div className="my-4" style={{ width: "100%", height: "100%" }}>
          <div ref={quillRef} />
        </div>
      </div>

      <div className="col-span-2 mt-20">
        <Select
          required
          size="small"
          name="chapter"
          fullWidth
          value={formValues.chapter.id}
          onChange={(e) =>
            setFormValues({
              ...formValues,
              chapter: { id: e.target.value },
            })
          }
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem value={""}>
            <em>------- Chọn chương muốn thêm bài học -------</em>
          </MenuItem>
          {optionsChapter.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </div>
    </div>
  );
};

export default FormItemLessonVideo;
