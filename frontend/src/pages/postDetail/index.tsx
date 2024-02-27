// Vendor
import { Container, Grid } from "@mui/material";
import React, { useEffect } from "react";

// Src
import { useAppDispatch, useAppSelector } from "common/hooks";
import {
  messageError,
  postActions,
  postDetails,
} from "common/services/postService/postSlice";
import { LoadingAllPosts } from "components/Loading";
import { PostNew, PostShare } from "components/Post";
import PostNotFound from "components/Post/PostNotFound";
import { RightWall } from "components/Wall";
import LeftWall from "components/Wall/LeftWall";
import { useRealTime } from "hooks";
import { useParams } from "react-router-dom";
import { PostDetailsType } from "types";

const PostDetail: React.FC = () => {
  // Hooks
  const dispatch = useAppDispatch();
  const postDetailsData = useAppSelector(postDetails) as PostDetailsType;
  const { postId } = useParams();
  const messError = useAppSelector(messageError);

  // Custom hooks
  const { sendNotificationToReceiver, sendFriendActionToReceiver } =
    useRealTime();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (postId) {
      dispatch(postActions.getPostDetailsRequest(postId));
    }
  }, [postId]);

  return (
    <div className="w-full p-4 pl-[120px]">
      <Grid container>
        <Grid item xs={3}>
          <LeftWall />
        </Grid>
        <Grid item xs={6} rowSpacing={1}>
          <Container>
            {/* Post-wrapper */}
            {postDetailsData ? (
              !postDetailsData.isPostShared ? (
                <PostNew
                  key={postDetailsData.id}
                  post={postDetailsData}
                  postDetailsData={postDetailsData}
                  sendNotificationToReceiver={sendNotificationToReceiver}
                />
              ) : (
                <PostShare
                  key={postDetailsData.id}
                  post={postDetailsData}
                  postDetailsData={postDetailsData}
                  sendNotificationToReceiver={sendNotificationToReceiver}
                />
              )
            ) : messError ? (
              <div className="mt-4 bg-white p-4 rounded-md">
                <PostNotFound />
              </div>
            ) : (
              <LoadingAllPosts />
            )}
          </Container>
        </Grid>
        <Grid item xs={3}>
          <RightWall sendFriendActionToReceiver={sendFriendActionToReceiver} />
        </Grid>
      </Grid>
    </div>
  );
};
export default PostDetail;
