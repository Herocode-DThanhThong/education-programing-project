import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";
import { useAppDispatch, useAppSelector } from "common/hooks";
import {
  allPostsReadyDeleted,
  postActions,
} from "common/services/postService/postSlice";
import { useState } from "react";
import { NotificationToReceiver, PostDetailsType } from "types";
import PostBottom from "./PostBottom";
import PostContent from "./PostContent";
import PostTop from "./PostTop";

type Props = {
  post: PostDetailsType;
  postDetailsData: PostDetailsType;
  sendNotificationToReceiver: (data: NotificationToReceiver) => void;
};

export const PostNew = ({
  post,
  postDetailsData,
  sendNotificationToReceiver,
}: Props) => {
  // Hooks
  const dispatch = useAppDispatch();
  const allPostReadyDeletedData = useAppSelector(allPostsReadyDeleted);

  // States
  const [openUndoSnackbarDeletePost, setOpenSnackbarDeletePost] =
    useState(false);

  // Handler
  const handleShowSnackbarDeletePost = () => {
    // Show snackbar
    setOpenSnackbarDeletePost(true);

    // Hide post but still not deleted
    dispatch(postActions.addPostReadyDeletedRequest(post));
  };

  const handleCloseSnackbarDeletePost = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      console.log("click away");
      return;
    }

    // Close snackbar
    setOpenSnackbarDeletePost(false);

    // Delete permanent post
    handleDeletePermanentPost();
  };

  const checkShowPost = (): Boolean => {
    for (let i = 0; i < allPostReadyDeletedData.length; i++) {
      const element = allPostReadyDeletedData[i];
      if (element.id === post.id) return false;
    }
    return true;
  };

  const handleRecoveryPost = () => {
    // Remove post from allPostReadyDeleted
    dispatch(postActions.removePostReadyDeletedRequest(post));

    // Hide snackbar
    setOpenSnackbarDeletePost(false);
  };

  const handleDeletePermanentPost = () => {
    dispatch(postActions.deletePostRequest(post));
  };

  // UI
  const action = (
    <>
      <Button color="primary" size="small" onClick={handleRecoveryPost}>
        Khôi phục
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleCloseSnackbarDeletePost}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <>
      <div className={`post-wrapper ${checkShowPost() ? "" : "hidden"}`}>
        {/* Start Post Top */}
        <PostTop
          // Data post
          post={post}
          postDetailsData={postDetailsData}
          // Handler
          handleShowSnackbarDeletePost={handleShowSnackbarDeletePost}
          handleCloseSnackbarDeletePost={handleCloseSnackbarDeletePost}
          // Variable
          showActionList={true}
        />

        {/* Start Post Content */}
        <PostContent post={post} />

        {/* Start Post Bottom */}
        <PostBottom
          post={post}
          sendNotificationToReceiver={sendNotificationToReceiver}
        />
      </div>
      {/* Snackbar delete post */}
      {openUndoSnackbarDeletePost && (
        <Snackbar
          open={true}
          autoHideDuration={5000}
          onClose={handleCloseSnackbarDeletePost}
          message={"Bài viết của bạn đã bị xóa"}
          action={action}
        />
      )}
    </>
  );
};
