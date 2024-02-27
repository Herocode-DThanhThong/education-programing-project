import { Modal } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Dispatch, SetStateAction, useState } from "react";
import { IComment, ReplyComment } from "types";
type Props = {
  replyComment: ReplyComment;
  comment: IComment;
  setReplyComment: Dispatch<SetStateAction<ReplyComment | null>>;
  handleReplyComment: (dataReplyComment: {
    contentReply: string;
    commentImageUrl: string | null;
  }) => void;
};

export const ModalReplyComment = ({
  replyComment,
  setReplyComment,
  comment,
  handleReplyComment,
}: Props) => {
  // States
  const [relyText, setReplyText] = useState("");

  return (
    <Modal
      onClose={() => {
        setReplyComment(null);
      }}
      open={replyComment.parent.id === comment.id}
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
          {/* Add text */}
          <Box>
            <Typography
              sx={{
                textAlign: "center",
              }}
              id="modal-modal-title"
              variant="h6"
              component="h2"
            >
              Phản hồi bình luận
            </Typography>
            <TextField
              autoFocus
              onChange={(e) => setReplyText(e.target.value)}
              sx={{
                my: 2,
              }}
              fullWidth
              label="Nội dung"
            />
          </Box>
          <Button
            size="small"
            onClick={() =>
              handleReplyComment({
                contentReply: relyText,
                commentImageUrl: null,
              })
            }
            sx={{ display: "block", width: "100%" }}
            variant="contained"
          >
            Lưu
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
