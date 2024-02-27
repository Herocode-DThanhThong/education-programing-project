// Vendor
import { Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";

// Src
import { useParams } from "react-router-dom";

import axiosClient from "api/axiosClient";
import { Path } from "api/paths";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { idUser } from "common/services/authService/authSlice";
import { commonActions } from "common/services/commonService/commonSlice";
import {
  allPosts,
  loadMorePost,
  postActions,
  postDetails,
} from "common/services/postService/postSlice";
import { settingActions } from "common/services/settingService/settingSlice";
import { LoadingAllPosts } from "components/Loading";
import { PostNew, PostShare } from "components/Post";
import { RightWall } from "components/Wall";
import LeftWall from "components/Wall/LeftWall";
import { useRealTime } from "hooks";
import InfiniteScroll from "react-infinite-scroll-component";
import { toast } from "react-toastify";
import { store } from "redux/configureStore";
import { PostDetailsType, UserType } from "types";
import Info from "./component/Info";

const UserPost: React.FC = () => {
  // Hooks
  const { userId } = useParams();
  const dispatch = useAppDispatch();
  const allPostsData = useAppSelector(allPosts) as Array<PostDetailsType>;
  const postDetailsData = useAppSelector(postDetails) as PostDetailsType;
  const loadMorePostData = useAppSelector(loadMorePost);
  const idUserLoggedIn = useAppSelector(idUser);

  // Custom hooks
  const { sendNotificationToReceiver, sendFriendActionToReceiver } =
    useRealTime();

  // States
  const [userWatching, setUserWatching] = useState<UserType | null>(null);

  const handleScrollTop = () => {
    const position = window.scrollY;
    if (position === 0) {
      // Refresh data when scroll top 0
      dispatch(postActions.getAllPostsByUserIdRequest(Number(userId)));
    }
  };

  // Effects
  useEffect(() => {
    window.scrollTo(0, 0);

    // Get data
    dispatch(postActions.getAllPostsByUserIdRequest(Number(userId)));

    // Set path to call api
    dispatch(commonActions.setPath(`${Path.GetPostByUserId}/${userId}`));

    // Clear search post content
    dispatch(commonActions.setContentSearch(""));

    // Get detail user logged in
    dispatch(settingActions.getUserDetailRequest(idUserLoggedIn as number));

    // Listening when scroll top 0
    window.addEventListener("scroll", handleScrollTop, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScrollTop);
    };
  }, [userId]);

  useEffect(() => {
    (async () => {
      const accessToken = store.getState().authReducer.accessToken;
      try {
        const { data } = await axiosClient.get(
          `${Path.GetDetailUser}/${userId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setUserWatching(data);
      } catch (error) {
        console.log(error);
        toast.error("Some thing went wrong's! Please reload this page");
      }
    })();
  }, [userId]);

  return (
    <div className="w-full p-4 pl-[120px]">
      <Grid container>
        <Grid item xs={3}>
          <LeftWall />
        </Grid>
        <Grid item xs={6} rowSpacing={1}>
          <Container>
            {/* Post-wrapper */}
            {userWatching && (
              <Info
                user={userWatching}
                sendFriendActionToReceiver={sendFriendActionToReceiver}
              />
            )}

            {/* Start All Post */}
            {allPostsData ? (
              <InfiniteScroll
                style={{
                  overflow: "visible",
                }}
                dataLength={allPostsData.length}
                next={() => {
                  dispatch(postActions.loadMorePostsRequest());
                }}
                hasMore={loadMorePostData}
                loader={<LoadingAllPosts />}
              >
                {/* Start All Post */}
                {allPostsData.map((post) =>
                  !post.isPostShared ? (
                    <PostNew
                      key={post.id}
                      post={post}
                      postDetailsData={postDetailsData}
                      sendNotificationToReceiver={sendNotificationToReceiver}
                    />
                  ) : (
                    <PostShare
                      key={post.id}
                      post={post}
                      postDetailsData={postDetailsData}
                      sendNotificationToReceiver={sendNotificationToReceiver}
                    />
                  )
                )}
                {/* End All Post */}
              </InfiniteScroll>
            ) : (
              <LoadingAllPosts />
            )}
            {/* End All Post */}
          </Container>
        </Grid>
        <Grid item xs={3}>
          <RightWall sendFriendActionToReceiver={sendFriendActionToReceiver} />
        </Grid>
      </Grid>
    </div>
  );
};
export default UserPost;
