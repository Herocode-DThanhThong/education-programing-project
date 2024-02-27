import { Modal } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Dispatch, SetStateAction } from "react";
import { PostDetailsType, UserType } from "types";

type Props = {
  editComment: {
    id?: string | undefined;
    post: PostDetailsType;
    user: UserType;
    content: string;
    commentImageUrl: string | null;
  };
  comment: {
    id: string;
    user: UserType;
    content: string;
    commentImageUrl: string | null;
  };
  setEditComment: Dispatch<
    SetStateAction<{
      id?: string | undefined;
      post: PostDetailsType;
      user: UserType;
      content: string;
      commentImageUrl: string | null;
    } | null>
  >;
  handleEditComment: (
    idComment: string,
    dataEdit: {
      id?: string | undefined;
      post: PostDetailsType;
      user: UserType;
      content: string;
      commentImageUrl: string | null;
    }
  ) => void;
};

export const ModalEditComment = ({
  editComment,
  setEditComment,
  comment,
  handleEditComment,
}: Props) => {
  return (
    <Modal
      open={editComment.id === comment.id}
      onClose={() => setEditComment(null)}
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
          minHeight: "205px",
          marginLeft: "-10px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          py: 2,
        }}
      >
        <Box sx={{ width: "80%" }}>
          {/* Edit text */}
          <Box>
            <Typography
              sx={{
                textAlign: "center",
              }}
              id="modal-modal-title"
              variant="h6"
              component="h2"
            >
              Chỉnh sửa bình luận
            </Typography>
            <TextField
              autoFocus
              value={editComment.content}
              onChange={(e) =>
                setEditComment({
                  ...editComment,
                  content: e.target.value,
                })
              }
              sx={{
                my: 2,
              }}
              fullWidth
              label="Nội dung"
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyItems: "center",
              alignItems: "center",
            }}
          >
            <Button
              onClick={() =>
                handleEditComment(comment.id, {
                  ...editComment,
                })
              }
              sx={{ mt: 2, width: "100%" }}
              variant="contained"
            >
              Cập nhật
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
