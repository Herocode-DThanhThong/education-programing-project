// Vendor
import { Container, Grid } from "@mui/material";
import React, { useEffect } from "react";

// Src
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
import { useRealTime } from "hooks";
import InfiniteScroll from "react-infinite-scroll-component";
import { PostDetailsType } from "types";
import CreatePost from "./component/CreatePost";
import LeftWall from "components/Wall/LeftWall";

const Home: React.FC = () => {
  // Hooks
  const dispatch = useAppDispatch();
  const allPostsData = useAppSelector(allPosts) as Array<PostDetailsType>;
  const postDetailsData = useAppSelector(postDetails) as PostDetailsType;
  const idUserLoggedIn = useAppSelector(idUser);
  const loadMorePostData = useAppSelector(loadMorePost);

  // Custom hooks
  const { sendNotificationToReceiver, sendFriendActionToReceiver } =
    useRealTime();

  const handleScrollTop = (e: Event) => {
    const position = window.scrollY;
    if (position === 0) {
      // Refresh data when scroll top 0
      dispatch(postActions.getAllPostsRequest());
    }
  };

  // Effects
  useEffect(() => {
    window.scrollTo(0, 0);

    // Get all post
    dispatch(postActions.getAllPostsRequest());

    // Get user detail
    dispatch(settingActions.getUserDetailRequest(idUserLoggedIn as number));

    // Set path to call api
    dispatch(commonActions.setPath(Path.GetAllPosts));

    // Clear search post content
    dispatch(commonActions.setContentSearch(""));

    // Get detail user logged in
    dispatch(settingActions.getUserDetailRequest(idUserLoggedIn as number));

    // Listening when scroll top 0
    window.addEventListener("scroll", handleScrollTop, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScrollTop);
    };
  }, []);

  return (
    <div className="w-full p-4 pl-[120px]">
      <Grid container>
        <Grid item xs={3}>
          <LeftWall />
        </Grid>
        <Grid item xs={6} rowSpacing={1}>
          <Container>
            {/* Post-wrapper */}
            <CreatePost
              sendNotificationToReceiver={sendNotificationToReceiver}
            />
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
              </InfiniteScroll>
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
export default Home;
