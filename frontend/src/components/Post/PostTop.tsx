import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {
  Avatar,
  Dialog,
  DialogActions,
  DialogTitle,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { idUser } from "common/services/authService/authSlice";
import { postActions } from "common/services/postService/postSlice";
import { vi } from "constants/localeTime";
import { useState } from "react";
import { Link } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";
import { PostDetailsType } from "types";
import ModalEditPost from "./ModalEditPost";

type Props = {
  post: PostDetailsType;
  postDetailsData: PostDetailsType;
  handleShowSnackbarDeletePost: () => void;
  handleCloseSnackbarDeletePost: (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => void;
  showActionList: Boolean;
};

const PostTop = ({
  post,
  handleShowSnackbarDeletePost,
  showActionList,
}: Props) => {
  // Hooks
  const dispatch = useAppDispatch();
  const idUserLoggedIn = useAppSelector(idUser);

  // States
  const [toggleActionPost, setToggleActionPost] = useState<number | null>(null);
  const [openDialogDeletePost, setOpenDialogDeletePost] = useState<
    number | null
  >(null);
  const [editPost, setEditPost] = useState<number | null>(null);

  // Handler
  const handleCloseDialogDeletePost = (): void => {
    setOpenDialogDeletePost(null);
  };

  const handleShowDialogDeletePost = (idPost: number): void => {
    setOpenDialogDeletePost(idPost);

    setToggleActionPost(idPost);
  };

  const handleDeleteUserPost = (post: PostDetailsType): void => {
    // Show snackbar delete post and forward this feature for snackbar handle
    handleShowSnackbarDeletePost();

    // Close Dialog
    setOpenDialogDeletePost(null);
  };

  const handleEditPost = (
    idPost: number,
    data: { content: string; imageUrl: string | null }
  ): void => {
    editPostSubmit(idPost, data);
    setEditPost(null);
  };

  const editPostSubmit = (
    idPost: number,
    dataUpdated: {
      content: string;
      imageUrl: string | null;
    }
  ): void => {
    dispatch(
      postActions.updatePostRequest({
        id: idPost,
        ...dataUpdated,
      })
    );
  };

  return (
    <div className="post-top">
      <div className="user-img">
        {post.user.imageUrl ? (
          <Avatar
            sx={{
              m: 1,
              width: 35,
              height: 35,
              bgcolor: "orange",
              margin: "auto",
            }}
            alt="avatar"
            src={post.user.imageUrl}
          />
        ) : (
          <AccountCircleOutlinedIcon style={{ fontSize: "35px" }} />
        )}
      </div>
      <div className="user-info">
        <Link to={`/community/userPost/${post.user.id}`}>
          <p className="name">
            {post.user.firstName} {post.user.lastName}
          </p>
          <p className="time" style={{ marginTop: "4px" }}>
            <ReactTimeAgo
              date={Date.parse(post.createdDate)}
              locale={vi}
              timeStyle="round-minute"
            />
          </p>
        </Link>
      </div>

      <div className="action-button-wrapper">
        {showActionList && (
          <IconButton
            id="action-button"
            onClick={() => {
              setToggleActionPost(post.id);

              // Click again => hide
              if (toggleActionPost === post.id) setToggleActionPost(null);
            }}
          >
            <MoreHorizIcon style={{ fontSize: "20px", cursor: "pointer" }} />
          </IconButton>
        )}

        {/* Start Popup for edit and delete */}
        {toggleActionPost === post.id && (
          <div
            className="list-actions-post z-10"
            onBlur={() => setToggleActionPost(null)}
          >
            <Box
              sx={{
                width: "100%",
                maxWidth: 100,
                bgcolor: "background.paper",
              }}
            >
              <List>
                <ListItem disablePadding>
                  {!post.isPostShared && (
                    <ListItemButton
                      disabled={post.user.id !== idUserLoggedIn}
                      onClick={() => setEditPost(post.id)}
                    >
                      <ListItemIcon style={{ minWidth: "32px" }}>
                        <EditIcon style={{ fontSize: "16px" }} />
                      </ListItemIcon>
                      <ListItemText
                        sx={{ textAlign: "center" }}
                        primary={"Chỉnh sửa"}
                      />
                    </ListItemButton>
                  )}
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton
                    disabled={post.user.id !== idUserLoggedIn}
                    onClick={() => handleShowDialogDeletePost(post.id)}
                  >
                    <ListItemIcon style={{ minWidth: "32px" }}>
                      <DeleteIcon style={{ fontSize: "16px" }} />
                    </ListItemIcon>
                    <ListItemText primary={"Xóa"} />
                  </ListItemButton>
                </ListItem>
              </List>
            </Box>
          </div>
        )}

        {/* End Popup for edit and delete */}
        {Boolean(editPost) && editPost === post.id && (
          <ModalEditPost
            onClose={() => setEditPost(null)}
            onSubmit={handleEditPost}
            post={post}
          />
        )}
      </div>

      {/*Popup form delete*/}
      <Dialog
        open={openDialogDeletePost ? true : false}
        onClose={handleCloseDialogDeletePost}
        className="dialog-delete-post"
      >
        <DialogTitle id="alert-dialog-title" sx={{ fontSize: "16px" }}>
          Bạn có chắc chắn muốn xóa bài viết này?
        </DialogTitle>
        <DialogActions>
          <Button
            sx={{ fontSize: "14px" }}
            onClick={handleCloseDialogDeletePost}
          >
            Hủy
          </Button>
          <Button
            sx={{ fontSize: "14px" }}
            onClick={() => {
              handleDeleteUserPost(post);
            }}
            color="error"
          >
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PostTop;
