// Vendor
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useAppDispatch, useAppSelector } from "common/hooks";
import {
  loading,
  loadingActions,
} from "common/services/loadingService/loadingSlice";
import { useUploadImage } from "hooks/useUploadImage";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { useQuill } from "react-quilljs";
import { CourseType } from "types";
// Src
type Props = {
  initialValues?: {
    title: string;
    description: string;
    image: string;
    hashTag: string;
  };
  onSubmit: (
    course: Pick<CourseType, "title" | "description" | "image">
  ) => Promise<void>;
  mode: "add" | "update";
};

const FormAddUpdateCourse = ({ initialValues, mode, onSubmit }: Props) => {
  // Hooks
  const { quill, quillRef } = useQuill();
  const { uploadSingleImageToCloudinary } = useUploadImage();
  const isLoading = useAppSelector(loading);
  const dispatch = useAppDispatch();

  // States
  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    image: "",
    hashTag: "",
  });

  const [fileUpload, setFileUpload] = useState<File | null>(null);
  const uploadInputRef = useRef<HTMLInputElement>(null);
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

  const handleInputUploadFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      // Get file
      const file = e.target.files[0];
      // Storage file uploaded
      setFileUpload(file);
    }
  };

  const handleClearInputUploadWhenChangeTheSameFile = (e: any) => {
    e.target.value = "";
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Create final data
    const finalData = {
      title: formValues.title,
      description: formValues.description,
      image: formValues.image,
      hashTag: formValues.hashTag,
    };

    // Handle set image url
    if (!fileUpload && mode === "add")
      return alert("Hình ảnh không được để trống");
    else if (!fileUpload && mode === "update" && initialValues?.image)
      finalData.image = initialValues.image;
    else if (fileUpload) {
      dispatch(loadingActions.startLoading());
      const courseImageUrl = await uploadSingleImageToCloudinary(fileUpload);
      finalData.image = courseImageUrl;
      dispatch(loadingActions.endLoading());
    }

    // Submit data
    await onSubmit(finalData);

    // Reset form values
    setFileUpload(null);
    if (mode === "add") {
      setFormValues({
        title: "",
        description: "",
        image: "",
        hashTag: "",
      });
      // Clear value text editor
      if (quill) quill.clipboard.dangerouslyPasteHTML("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="text-xl font-semibold mb-6">
        {mode === "add" ? "Thêm khóa học" : "Cập nhật khóa học"}
      </h1>
      <div className="my-4">
        <TextField
          value={formValues.title}
          onChange={(e) =>
            setFormValues((prev) => ({ ...prev, title: e.target.value }))
          }
          name="title"
          className="w-full"
          size="small"
          required
          label="Tiêu đề"
        />
      </div>
      <div className="my-4">
        <TextField
          value={formValues.hashTag}
          onChange={(e) =>
            setFormValues((prev) => ({ ...prev, hashTag: e.target.value }))
          }
          name="hashTag"
          className="w-full"
          size="small"
          required
          label="Hashtag"
        />
      </div>
      <div className="my-4 h-[200px]">
        <p>Mô tả</p>
        <div className="my-4" style={{ width: "100%", height: "100%" }}>
          <div ref={quillRef} />
        </div>
      </div>
      <div className="mt-24">
        <p>Hỉnh ảnh</p>
        <Button
          sx={{ mt: 1 }}
          variant="text"
          startIcon={<AddPhotoAlternateIcon style={{ color: "green" }} />}
          style={{
            textTransform: "none",
          }}
          onClick={() =>
            uploadInputRef.current && uploadInputRef.current.click()
          }
        >
          Upload
        </Button>
        <input
          ref={uploadInputRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleInputUploadFileChange}
          onClick={handleClearInputUploadWhenChangeTheSameFile}
        />

        {fileUpload && (
          <div className="flex items-center gap-4">
            <span>{fileUpload?.name}</span>
            <IconButton
              onClick={() => setFileUpload(null)}
              sx={{ mt: 1 }}
              aria-label="delete"
              size="small"
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          </div>
        )}
      </div>

      {initialValues?.image && !fileUpload && (
        <img
          src={initialValues.image}
          className="rounded-sm"
          alt="defaultImage"
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

export default FormAddUpdateCourse;
