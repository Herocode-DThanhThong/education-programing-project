import { useState } from "react";
import { Modal, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
type Props = {
  showSearchPost: boolean;
  setShowSearchPost: Dispatch<SetStateAction<boolean>>;
};

export const ModalSearchPost = ({
  showSearchPost,
  setShowSearchPost,
}: Props) => {
  // Hooks
  const navigate = useNavigate();

  // States
  const [searchValue, setSearchValue] = useState("");

  // Handler
  const handleSubmitSearch = () => {
    if (searchValue) navigate(`/community/post/search?content=${searchValue}`);
  };

  return (
    <Modal
      open={showSearchPost}
      onClose={() => {
        setShowSearchPost(false);
      }}
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
        }}
      >
        <Box sx={{ width: "80%" }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Tìm kiếm bài viết
          </Typography>
          <TextField
            autoFocus
            className="input"
            value={searchValue}
            variant="standard"
            fullWidth
            onChange={(e) => setSearchValue(e.target.value)}
            style={{ marginBottom: 6 }}
          />

          <Button
            onClick={() => handleSubmitSearch()}
            sx={{ mt: 2 }}
            variant="contained"
          >
            Tìm kiếm
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
