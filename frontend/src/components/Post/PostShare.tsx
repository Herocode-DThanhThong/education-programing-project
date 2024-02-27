import { Divider } from "@mui/material";
import axiosClient from "api/axiosClient";
import { Path } from "api/paths";
import { LoadingPostShared } from "components/Loading";
import { useEffect, useState } from "react";
import { store } from "redux/configureStore";
import { NotificationToReceiver, PostDetailsType } from "types";
import PostBottom from "./PostBottom";
import PostNotFound from "./PostNotFound";
import PostTop from "./PostTop";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Snackbar from "@mui/material/Snackbar";
import { useAppDispatch, useAppSelector } from "common/hooks";
import {
  allPostsReadyDeleted,
  postActions,
} from "common/services/postService/postSlice";
import Viewer from "react-viewer";

type Props = {
  post: PostDetailsType;
  postDetailsData: PostDetailsType;
  sendNotificationToReceiver: (data: NotificationToReceiver) => void;
};

export const PostShare = ({
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
  const [postShared, setPostShared] = useState<PostDetailsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);

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

  const handleGetGalleryImage = () => {
    if (!postShared) return [];
    return postShared.galleryImage.map((source, idx) => ({
      src: source.url,
      alt: source.id,
    }));
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

  // Effects
  useEffect(() => {
    if (post.idPostShared) {
      (async () => {
        const accessToken = store.getState().authReducer.accessToken;
        try {
          const { data } = await axiosClient.get(
            `${Path.GetPostDetails}/${post.idPostShared}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          setPostShared(data);
        } catch (error) {
          console.log(error);
          setPostShared(null);
        }
        setLoading(false);
      })();
    }
  }, []);

  return (
    <>
      <div className={`post-wrapper  ${checkShowPost() ? "" : "hidden"}`}>
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

        {/* Post is shared */}
        <div className="border border-gray-300 rounded-md p-4 mt-3">
          {loading && !postShared ? (
            <LoadingPostShared />
          ) : !loading && !postShared ? (
            <PostNotFound />
          ) : (
            <>
              <PostTop
                // Data post
                post={postShared as PostDetailsType}
                postDetailsData={postShared as PostDetailsType}
                // Handler
                handleShowSnackbarDeletePost={handleShowSnackbarDeletePost}
                handleCloseSnackbarDeletePost={handleCloseSnackbarDeletePost}
                // Variable
                showActionList={false}
              />
              {/* Start Post Content */}
              <div className="post-content">
                <div
                  dangerouslySetInnerHTML={{ __html: post.content }}
                  className="leading-6"
                />
                {postShared?.galleryImage &&
                  postShared.galleryImage.length > 0 && (
                    <div className="relative">
                      {postShared.galleryImage.length > 1 && (
                        <div
                          onClick={() => setVisible(true)}
                          className="cursor-pointer absolute flex flex-col justify-center bg-black top-0 left-0 right-0 rounded-md bottom-0 z-[1] bg-opacity-40"
                        >
                          <p className="text-gray-300 text-2xl mx-auto text-center">
                            +{postShared.galleryImage.length}
                          </p>
                        </div>
                      )}
                      <img
                        onClick={() => setVisible(true)}
                        style={{
                          padding: 0,
                        }}
                        className="border rounded-md mt-2"
                        src={postShared.galleryImage[0].url}
                        alt=""
                      />
                      <Viewer
                        visible={visible}
                        onClose={() => {
                          setVisible(false);
                        }}
                        images={handleGetGalleryImage()}
                      />
                    </div>
                  )}
              </div>
            </>
          )}
        </div>
        {/* End Post is shared */}
        <div className="post-content">
          <div className="post-count-interactive">
            <span>{post.likedUsers.length} Thích</span>
            <div className="flex gap-2">
              <span>{post.comments.length} Bình luận</span>
            </div>
          </div>
          <Divider variant="fullWidth" style={{ margin: "10px 0 0 0" }} />
        </div>

        {/* Start Post Bottom */}
        <div className="mt-2">
          <PostBottom
            // Data
            post={post}
            // Send notify
            sendNotificationToReceiver={sendNotificationToReceiver}
          />
        </div>
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
