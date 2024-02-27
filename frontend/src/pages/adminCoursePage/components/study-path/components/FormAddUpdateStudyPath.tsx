// Vendor
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useAppSelector } from "common/hooks";
import { loading } from "common/services/loadingService/loadingSlice";
import { FormEvent, useEffect, useState } from "react";
import { useQuill } from "react-quilljs";
import { StudyPathType } from "types";

type Props = {
  initialValues?: {
    title: string;
    description: string;
  };
  onSubmit: (
    course: Pick<StudyPathType, "title" | "description">
  ) => Promise<void>;
  mode: "add" | "update";
};

const FormAddUpdateStudyPath = ({ initialValues, mode, onSubmit }: Props) => {
  // Hooks
  const { quill, quillRef } = useQuill();
  const isLoading = useAppSelector(loading);

  // States
  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
  });
  useEffect(() => {
    if (quill) {
      quill.on("text-change", (delta, oldDelta, source) => {
        setFormValues((prev) => ({
          ...prev,
          description: quill.root.innerHTML,
        }));
      });
    }
  }, [quill]);

  useEffect(() => {
    // Use it to set default value when component is form update
    if (quill) {
      quill.clipboard.dangerouslyPasteHTML(formValues.description);
    }
  }, [quill, initialValues]);

  useEffect(() => {
    if (initialValues) setFormValues(initialValues);
  }, [initialValues]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate data
    if (!formValues.title || !formValues.description)
      return alert("Vui lòng nhập đầy đủ thông tin");

    // Submit data
    await onSubmit(formValues);

    // clear form value
    if (mode === "add") {
      setFormValues({
        title: "",
        description: "",
      });
      // Clear value text editor
      if (quill) quill.clipboard.dangerouslyPasteHTML("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="text-xl font-semibold mb-6">
        {mode === "add" ? "Thêm lộ trình" : "Cập nhật lộ trình"}
      </h1>
      <div className="my-4">
        <TextField
          className="w-full"
          size="small"
          required
          id="outlined-required"
          label="Tiêu đề lộ trình"
          name="title"
          onChange={(e) =>
            setFormValues({ ...formValues, title: e.target.value })
          }
          value={formValues.title}
        />
      </div>
      <div className="my-4 h-[200px]">
        <p className="">Mô tả</p>
        <div className="my-4" style={{ width: "100%", height: "100%" }}>
          <div ref={quillRef} />
        </div>
      </div>

      <Button
        disabled={isLoading}
        sx={{ mt: 10 }}
        type="submit"
        variant="contained"
        size="small"
      >
        Lưu
      </Button>
    </form>
  );
};

export default FormAddUpdateStudyPath;
