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
import { useQueryParams, useRealTime } from "hooks";
import InfiniteScroll from "react-infinite-scroll-component";
import { PostDetailsType } from "types";
import LeftWall from "components/Wall/LeftWall";

const SearchPost: React.FC = () => {
  // Hooks
  const dispatch = useAppDispatch();
  const allPostsData = useAppSelector(allPosts) as Array<PostDetailsType>;
  const postDetailsData = useAppSelector(postDetails) as PostDetailsType;
  const loadMorePostData = useAppSelector(loadMorePost);
  const idUserLoggedIn = useAppSelector(idUser);

  // Custom hooks
  const { sendNotificationToReceiver, sendFriendActionToReceiver } =
    useRealTime();
  const { content } = useQueryParams();

  const handleScrollTop = () => {
    const position = window.scrollY;
    if (position === 0) {
      // Refresh data when scroll top 0
      dispatch(postActions.searchPostsRequest(content));
    }
  };

  // Effects
  useEffect(() => {
    window.scrollTo(0, 0);

    // Get data
    dispatch(postActions.searchPostsRequest(content));

    // Set path to call api
    dispatch(commonActions.setPath(`${Path.SearchPost}`));

    // Store search content, purpose for load more post search
    dispatch(commonActions.setContentSearch(content));

    // Get detail user logged in
    dispatch(settingActions.getUserDetailRequest(idUserLoggedIn as number));

    // Listening when scroll top 0
    window.addEventListener("scroll", handleScrollTop, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScrollTop);
    };
  }, [content]);

  return (
    <div className="w-full p-4 pl-[120px]">
      <Grid container>
        <Grid item xs={3}>
          <LeftWall />
        </Grid>
        <Grid item xs={6} rowSpacing={1}>
          <Container>
            {allPostsData && allPostsData.length === 0 && (
              <p className="mt-4 text-center font-semibold text-2xl">
                Không tìm thấy bài viết nào!
              </p>
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
export default SearchPost;
