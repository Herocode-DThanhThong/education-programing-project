import { useState } from "react";
import ModalAddComment from "../Modal/ModalAddComment";

type Props = {};

const AddComment = (props: Props) => {
  const [openModal, setOpenModal] = useState(false);
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  return (
    <div className="mt-6 flex gap-2 items-center">
      <h2 className="text-left font-semibold text-xl">Bình luận</h2>
      <button
        onClick={() => {
          handleOpenModal();
        }}
        type="button"
        className="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 focus:outline-none "
      >
        Thêm bình luận
      </button>

      <ModalAddComment open={openModal} handleCloseModal={handleCloseModal} />
    </div>
  );
};

export default AddComment;
