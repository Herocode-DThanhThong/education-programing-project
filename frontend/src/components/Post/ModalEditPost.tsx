import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { Avatar, Modal, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { Path } from "api/paths";
import { useAppDispatch } from "common/hooks";
import { baseService } from "common/services/baseService";
import { loadingActions } from "common/services/loadingService/loadingSlice";
import { vi } from "constants/localeTime";
import { useUploadImage } from "hooks/useUploadImage";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useQuill } from "react-quilljs";
import ReactTimeAgo from "react-time-ago";
import { toast } from "react-toastify";
import Viewer from "react-viewer";
import { PostDetailsType } from "types";

type Props = {
  onClose: () => void;
  onSubmit: (
    idPost: number,
    data: {
      content: string;
      imageUrl: string | null;
    }
  ) => void;
  post: PostDetailsType;
};

const ModalEditPost = ({ post, onClose, onSubmit }: Props) => {
  const [visible, setVisible] = useState(false);
  const { quill, quillRef } = useQuill();
  const { uploadMultipleImageToCloudinary } = useUploadImage();
  const dispatch = useAppDispatch();
  const uploadInputRef = useRef<HTMLInputElement>(null);
  const [fileUpload, setFileUpload] = useState<FileList | null>(null);
  const [inputEditPost, setInputEditPost] = useState<{
    content: string;
    galleryImage: Array<{ id: string; url: String }>;
  }>({
    content: "",
    galleryImage: [],
  });
  const [galleryDeleted, setgalleryDeleted] = useState<
    Array<{
      id: string;
      url: string;
    }>
  >([]);
  const [isDisabledSubmit, setIsDisabledSubmit] = useState(false);

  useEffect(() => {
    if (quill) {
      quill.clipboard.dangerouslyPasteHTML(inputEditPost.content);
    }
  }, [quill]);
  // Lưu ý trường hợp khi mà quill.on("text-change") thì nó sẽ không truy cập được các state ở bên ngoài (trừ khi nó render lại)
  // VD: lúc đầu inputEditPost.galleryImage: [{...}] mà khi set lại state (set về []) của inputEditPost thì nó cũng không thay đổi
  // Lúc này trong hàm text-change vẫn là inputEditPost.galleryImage: [{...}]
  // Cách duy nhất là force nó render lại cái hàm text-change bằng cách cho thêm mấy cái dependency mà nó phụ thuộc
  useEffect(() => {
    if (quill) {
      quill.on("text-change", (delta, oldDelta, source) => {
        if (quill.getText().trim().length === 0) {
          if (inputEditPost.galleryImage.length === 0 && !fileUpload)
            setIsDisabledSubmit(true);
          else setIsDisabledSubmit(false);
        } else {
          setIsDisabledSubmit(false);
        }

        setInputEditPost((prev) => ({
          ...prev,
          content: quill.root.innerHTML,
        }));
      });
    }
  }, [quill, inputEditPost.galleryImage.length, fileUpload]);

  useEffect(() => {
    if (quill) {
      setIsDisabledSubmit(
        !fileUpload &&
          quill.getText().trim().length === 0 &&
          inputEditPost.galleryImage.length === 0
      );
    }
  }, [quill, fileUpload, inputEditPost.galleryImage]);

  useEffect(() => {
    setInputEditPost({
      content: post.content,
      galleryImage: post.galleryImage,
    });
  }, []);

  const handleGetGalleryImage = () => {
    return post.galleryImage.map((source, idx) => ({
      src: source.url,
      alt: source.id,
    }));
  };

  const handleInputUploadFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFileUpload(e.target.files);
      setgalleryDeleted(post.galleryImage);
      setInputEditPost({
        ...inputEditPost,
        galleryImage: [],
      });
    }
  };

  const handleClearInputUploadWhenChangeTheSameFile = (e: any) => {
    e.target.value = "";
  };

  const fetchDeleteOldGalleryImage = async (ids: Array<string>) => {
    try {
      await baseService.DELETE(`${Path.DeleteGallery}`, ids);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  const fetchCreateNewGalleryImage = async (body: {
    urls: Array<string>;
    post: {
      id: number;
    };
  }) => {
    try {
      await baseService.POST(`${Path.CreateGallery}`, body);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  const handleSubmit = async () => {
    let urls: Array<string> | undefined = [];
    if (inputEditPost.galleryImage.length === 0) {
      dispatch(loadingActions.startLoading());
      const ids = galleryDeleted.map((item) => item.id);
      if (ids.length > 0) {
        await fetchDeleteOldGalleryImage(ids);
      }
      if (fileUpload) {
        urls = await uploadMultipleImageToCloudinary(fileUpload);
        if (urls) {
          await fetchCreateNewGalleryImage({
            urls,
            post: {
              id: post.id,
            },
          });
        }
      }
      dispatch(loadingActions.endLoading());
    }

    // Create final data
    const finalData = {
      content: inputEditPost.content,
      imageUrl: "",
    };

    // Submit data
    onSubmit(post.id, finalData);

    // Reset form values
    setFileUpload(null);
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
      className="modal-edit-post"
      open={true}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 620,
          bgcolor: "white",
          boxShadow: "rgb(149 157 165 / 4%) 4px 6px 0px 2px",
          borderRadius: "10px",
          minHeight: "205px",
          marginLeft: "-10px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ minWidth: "100%" }}>
          {/*Popup form edit*/}
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            style={{
              textAlign: "center",
              padding: "10px 0",
            }}
          >
            Cập nhật bài viết
          </Typography>
          <Divider variant="fullWidth" style={{ margin: 0 }} />
          <div className="post-wrapper" style={{ margin: 0 }}>
            <div className="post-top" style={{ marginBottom: "4px" }}>
              <div className="user-img">
                {post && (
                  <Box sx={{ display: "flex" }}>
                    <div className="">
                      {post.user.imageUrl ? (
                        <Avatar
                          sx={{
                            width: 35,
                            height: 35,
                          }}
                          alt="avatar"
                          src={post.user.imageUrl}
                        />
                      ) : (
                        <AccountCircleOutlinedIcon
                          style={{ fontSize: "35px" }}
                        />
                      )}
                    </div>
                    <div className="user-info" style={{ width: "100%" }}>
                      <p className="name">
                        {post && post.user.firstName}
                        {post && post.user.lastName}
                      </p>
                      <p className="time" style={{ marginTop: "4px" }}>
                        <ReactTimeAgo
                          date={Date.parse(post.createdDate)}
                          locale={vi}
                          timeStyle="round-minute"
                        />
                      </p>
                    </div>
                  </Box>
                )}
              </div>
            </div>
            <div className="post-content" style={{ padding: "0 10px" }}>
              <Typography
                sx={{
                  fontWeight: "bold",
                  display: "block",
                  my: 2,
                }}
              >
                Nhập nội dung:
              </Typography>
              <div className="my-2 w-full h-[150px]">
                <div ref={quillRef} />
              </div>
            </div>
          </div>

          <div className="mt-14 px-5">
            <p>Hỉnh ảnh</p>
            <Button
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
              multiple
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleInputUploadFileChange}
              onClick={handleClearInputUploadWhenChangeTheSameFile}
            />

            {fileUpload && (
              <>
                <Button
                  size="small"
                  onClick={() => {
                    setFileUpload(null);
                    setInputEditPost({
                      ...inputEditPost,
                      galleryImage: [],
                    });
                  }}
                  color="error"
                  variant="outlined"
                  sx={{
                    textTransform: "initial",
                  }}
                >
                  Xóa hình ảnh
                </Button>
                {handleRenderFileList()}
              </>
            )}
          </div>

          {inputEditPost.galleryImage.length > 0 && !fileUpload && (
            <>
              <Button
                size="small"
                onClick={() => {
                  setgalleryDeleted(post.galleryImage);
                  setInputEditPost({
                    ...inputEditPost,
                    galleryImage: [],
                  });
                }}
                color="error"
                variant="outlined"
                sx={{
                  textTransform: "initial",
                  mb: 1,
                  ml: 2,
                }}
              >
                Xóa hình ảnh
              </Button>
              <div className="px-5">
                <div className="grid grid-cols-5 gap-2">
                  {inputEditPost.galleryImage.map((img) => (
                    <img
                      key={img.id}
                      onClick={() => setVisible(true)}
                      src={img.url as string}
                      className="w-full mr-2 h-[100px] object-cover rounded-md border cursor-pointer"
                      alt="defaultImage"
                    />
                  ))}
                </div>
                <Viewer
                  zIndex={10000}
                  visible={visible}
                  onClose={() => {
                    setVisible(false);
                  }}
                  images={handleGetGalleryImage()}
                />
              </div>
            </>
          )}

          <Stack
            direction="row"
            spacing={2}
            style={{
              justifyContent: "center",
              margin: "10px 0",
            }}
          >
            <Button size="small" variant="outlined" onClick={onClose}>
              Hủy
            </Button>
            <Button
              disabled={isDisabledSubmit}
              size="small"
              variant="contained"
              onClick={handleSubmit}
            >
              Lưu
            </Button>
          </Stack>
        </div>
      </Box>
    </Modal>
  );
};

export default ModalEditPost;
