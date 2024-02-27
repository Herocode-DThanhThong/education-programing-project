import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { Path } from "api/paths";
import { AxiosResponse } from "axios";
import { baseService } from "common/services/baseService";
import { loadingActions } from "common/services/loadingService/loadingSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #ccc",
  boxShadow: 24,
  p: 4,
  borderRadius: 4,
};

type Props = {
  onClose: () => void;
};

export default function ModalHastag({ onClose }: Props) {
  const [allHashtags, setAllHashtags] = useState<Array<string>>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchAllHashtag();
  }, []);

  const fetchAllHashtag = async () => {
    dispatch(loadingActions.startLoading());
    try {
      const response: AxiosResponse<Array<string>> = await baseService.GET(
        `${Path.GetAllHashTag}`
      );
      setAllHashtags(response.data as Array<string>);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(loadingActions.endLoading());
    }
  };
  return (
    <div>
      <Modal
        open={true}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            className="text-center"
            id="modal-modal-title"
            variant="body1"
            component="h2"
          >
            Những Hash tag giúp việc tiếp cận bài viết của bạn trở nên dễ dàng
            hơn
          </Typography>
          {allHashtags.map((ht, index) => (
            <p key={ht} className="leading-8">
              {index + 1}. {ht}
            </p>
          ))}
        </Box>
      </Modal>
    </div>
  );
}
