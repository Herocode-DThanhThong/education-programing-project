import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import ReactQuill from "react-quill";
type Props = {
  open: boolean;
  handleCloseModal: () => void;
};

const ModalAddComment = ({ open, handleCloseModal }: Props) => {
  return (
    <Modal
      open={open}
      onClose={() => {
        handleCloseModal();
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
          py: 2,
        }}
      >
        <ReactQuill
          className="w-[500px] bg-white border-transparent"
          theme="snow"
        />
      </Box>
    </Modal>
  );
};

export default ModalAddComment;
