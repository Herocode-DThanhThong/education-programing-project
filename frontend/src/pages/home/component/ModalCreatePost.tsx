import CloseIcon from "@mui/icons-material/Close";
import { IconButton, Modal } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useAppDispatch } from "common/hooks";
import { loadingActions } from "common/services/loadingService/loadingSlice";
import { useUploadImage } from "hooks/useUploadImage";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useQuill } from "react-quilljs";

type Props = {
  onClose: () => void;
  onSubmit: (params: { content: string; imageUrls: Array<String> }) => void;
};

export const ModalCreatePost = ({ onClose, onSubmit }: Props) => {
  // Hooks
  const { quill, quillRef } = useQuill();
  const [formValues, setFormValues] = useState({
    text: "",
  });
  const { uploadMultipleImageToCloudinary } = useUploadImage();
  const dispatch = useAppDispatch();
  const uploadImageRef = useRef<HTMLInputElement>(null);
  const [fileUpload, setFileUpload] = useState<FileList | null>(null);
  const [isDisabledSubmit, setIsDisabledSubmit] = useState(true);

  useEffect(() => {
    if (quill) {
      quill.on("text-change", (delta, oldDelta, source) => {
        if (quill.getText().trim().length === 0) {
          if (fileUpload) setIsDisabledSubmit(false);
          else setIsDisabledSubmit(true);
        } else {
          setIsDisabledSubmit(false);
        }

        setFormValues((prev) => ({
          ...prev,
          text: quill.root.innerHTML,
        }));
      });
    }
  }, [quill, fileUpload]);

  useEffect(() => {
    if (quill) {
      setIsDisabledSubmit(!fileUpload && quill.getText().trim().length === 0);
    }
  }, [quill, fileUpload]);

  const handleClearInputUploadWhenChangeTheSameFile = (e: any) => {
    e.target.value = "";
  };

  const handleInputUploadFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      // Storage file uploaded
      setFileUpload(e.target.files);
    }
  };

  const handleSubmit = async () => {
    // Create final data
    const finalData = {
      content: formValues.text,
      imageUrls: [] as Array<String>,
    };

    // Handle set image url
    if (fileUpload) {
      dispatch(loadingActions.startLoading());
      const urls = await uploadMultipleImageToCloudinary(fileUpload);
      if (urls) finalData.imageUrls = urls;
      dispatch(loadingActions.endLoading());
    }

    // Submit data
    onSubmit(finalData);

    // Reset form values
    setFileUpload(null);
    setFormValues({
      text: "",
    });
    onClose();
  };

  const handleRenderFileList = () => {
    if (!fileUpload) return;
    let jsx = [];
    for (let i = 0; i < fileUpload.length; i++) {
      jsx.push(
        <p className="mb-2" key={i}>
          {fileUpload[i].name}
        </p>
      );
    }
    return jsx;
  };

  return (
    <Modal
      onClose={onClose}
      open={true}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 532,
          bgcolor: "white",
          boxShadow: "rgb(149 157 165 / 4%) 4px 6px 0px 2px",
          borderRadius: "10px",
          marginLeft: "-10px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          py: 2,
          px: 2,
        }}
      >
        <Box>
          <Typography
            sx={{
              textAlign: "center",
            }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            Thêm bài viết
          </Typography>

          <Box>
            <div className="my-4" style={{ maxWidth: 500, height: 220 }}>
              <div ref={quillRef} />
            </div>
          </Box>
          <Box sx={{ mt: 9 }}>
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <Typography
                sx={{
                  fontWeight: 300,
                  display: "block",
                }}
              >
                Thêm hình ảnh
              </Typography>
              <Button
                size="small"
                onClick={() => {
                  if (uploadImageRef.current) {
                    uploadImageRef.current.click();
                  }
                }}
                sx={{
                  cursor: "pointer",
                  fontWeight: "bold",
                  display: "block",
                  textDecoration: "underline",
                  color: "#1769aa",
                  fontSize: "14px",
                }}
              >
                Upload
              </Button>
            </Box>

            <input
              ref={uploadImageRef}
              multiple
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleInputUploadFileChange}
              onClick={handleClearInputUploadWhenChangeTheSameFile}
            />

            {fileUpload && (
              <>
                <Button
                  size="small"
                  onClick={() => setFileUpload(null)}
                  color="error"
                  variant="outlined"
                  sx={{
                    textTransform: "initial",
                    mb: 1,
                  }}
                >
                  Xóa hình ảnh
                </Button>
                {handleRenderFileList()}
              </>
            )}
          </Box>
          <Button
            disabled={isDisabledSubmit}
            onClick={() => handleSubmit()}
            size="small"
            fullWidth
            variant="contained"
            sx={{
              mt: 1,
            }}
          >
            Đăng bài viết
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
