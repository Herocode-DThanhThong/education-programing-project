import { AxiosResponse } from "axios";
import { call, fork, put, select, takeLatest } from "redux-saga/effects";

// Src
import { PayloadAction } from "@reduxjs/toolkit";
import axiosClient from "api/axiosClient";
import { Path } from "api/paths";
import { store } from "redux/configureStore";
import {
  CreateNewCommentRequest,
  CreatePostRequest,
  DeleteCommentPostRequest,
  LikePostRequest,
  ListResponse,
  PostDetailsType,
  ReplyCommentRequest,
  SharePostRequest,
  UpdateCommentRequest,
  UpdatePostRequest,
} from "types";
import { modifyCharacterContainsSpecialCharacter } from "utils";
import { contentSearchPost, pathGetPosts } from "../commonService/commonSlice";
import { allPosts, postActions, postDetails } from "./postSlice";

// get all posts
async function getAllPosts(): Promise<
  AxiosResponse<ListResponse<PostDetailsType>>
> {
  const accessToken = store.getState().authReducer.accessToken;
  return await axiosClient.get(`${Path.GetAllPosts}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

// get all posts by content
async function getAllPostsByContent(
  content: string
): Promise<AxiosResponse<ListResponse<PostDetailsType>>> {
  const accessToken = store.getState().authReducer.accessToken;
  return await axiosClient.get(
    `${Path.SearchPost}?content=${modifyCharacterContainsSpecialCharacter(
      content
    )}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
}

// load more posts
async function loadMorePosts(params: {
  path: string;
  createdTimestampLastPost: string;
  content?: string;
}): Promise<AxiosResponse<ListResponse<PostDetailsType>>> {
  const accessToken = store.getState().authReducer.accessToken;
  return await axiosClient.get(
    `${params.path}/load-more?${
      params.content
        ? `content=${modifyCharacterContainsSpecialCharacter(params.content)}&`
        : ""
    }createdDate=${params.createdTimestampLastPost}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
}

// get post details
async function getPostDetails(
  id: number
): Promise<AxiosResponse<PostDetailsType>> {
  const accessToken = store.getState().authReducer.accessToken;
  return await axiosClient.get(`${Path.GetPostDetails}/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

// create new post
async function createPost(body: CreatePostRequest): Promise<AxiosResponse> {
  const accessToken = store.getState().authReducer.accessToken;
  return await axiosClient.post(Path.CreatePost, body, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

// create gallery images for post
async function createGalleryImageForPost(body: {
  urls: Array<String>;
  post: { id: number };
}): Promise<AxiosResponse> {
  const accessToken = store.getState().authReducer.accessToken;
  return await axiosClient.post(Path.CreateGallery, body, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

// update post
async function updatePost(
  body: UpdatePostRequest
): Promise<AxiosResponse<PostDetailsType>> {
  const accessToken = store.getState().authReducer.accessToken;
  return await axiosClient.put(
    `${Path.UpdatePost}/${body.id}`,
    { content: body.content, postImageUrl: body.imageUrl },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
}

// delete post
async function deletePost(id: number): Promise<AxiosResponse<string>> {
  const accessToken = store.getState().authReducer.accessToken;
  return await axiosClient.delete(`${Path.DeletePost}/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

// get all posts by user id
async function getAllPostsByUserId(
  id: number
): Promise<AxiosResponse<ListResponse<PostDetailsType>>> {
  const accessToken = store.getState().authReducer.accessToken;
  return await axiosClient.get(`${Path.GetPostByUserId}/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

// like post
async function likePost(
  body: LikePostRequest
): Promise<AxiosResponse<PostDetailsType>> {
  const accessToken = store.getState().authReducer.accessToken;
  return await axiosClient.post(Path.LikePost, body, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

// unlike post
async function unLikePost(
  body: LikePostRequest
): Promise<AxiosResponse<PostDetailsType>> {
  const accessToken = store.getState().authReducer.accessToken;
  return await axiosClient.delete(Path.LikePost, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    data: body,
  });
}

// share post
async function sharePost(
  body: SharePostRequest
): Promise<AxiosResponse<PostDetailsType>> {
  const accessToken = store.getState().authReducer.accessToken;
  return await axiosClient.post(Path.SharePost, body, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    data: body,
  });
}

// create new comment post
async function createCommentPost(
  body: CreateNewCommentRequest
): Promise<AxiosResponse<PostDetailsType>> {
  const accessToken = store.getState().authReducer.accessToken;
  return await axiosClient.post(Path.CreateCommentPost, body, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

// reply comment post
async function replyCommentPost(
  body: ReplyCommentRequest
): Promise<AxiosResponse<PostDetailsType>> {
  const accessToken = store.getState().authReducer.accessToken;
  return await axiosClient.post(Path.ReplyCommentPost, body, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

// update comment
async function updateComment(
  body: UpdateCommentRequest
): Promise<AxiosResponse<PostDetailsType>> {
  const accessToken = store.getState().authReducer.accessToken;
  return await axiosClient.put(
    `${Path.UpdateCommentPost}/${body.id}`,
    {
      post: body.post,
      comment: body.comment,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
}

// delete comment post
async function deleteCommentPost(
  body: DeleteCommentPostRequest
): Promise<AxiosResponse> {
  const accessToken = store.getState().authReducer.accessToken;
  return await axiosClient.delete(Path.DeleteCommentPost, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    data: body,
  });
}

function* getAllPostsSaga() {
  try {
    const response: AxiosResponse<ListResponse<PostDetailsType>> = yield call(
      getAllPosts
    );
    if (response.status === 200) {
      // Set data all posts
      yield put(postActions.getAllPostsSuccess(response.data.content));

      /**
       * Check can still load more base on totalElements
       *  */
      yield put(
        postActions.setLoadMorePost(
          response.data.content.length < response.data.pageable.totalElements
        )
      );
    }
  } catch (error: any) {
    yield put(postActions.getAllPostsFailure(error.response.data.message));
  }
}

function* searchPostSaga(action: PayloadAction<string>) {
  try {
    const response: AxiosResponse<ListResponse<PostDetailsType>> = yield call(
      getAllPostsByContent,
      action.payload
    );
    if (response.status === 200) {
      // Set data search posts
      yield put(postActions.searchPostsSuccess(response.data.content));

      /**
       * Check can still load more base on totalElements
       *  */
      yield put(
        postActions.setLoadMorePost(
          response.data.content.length < response.data.pageable.totalElements
        )
      );
    }
  } catch (error: any) {
    yield put(postActions.searchPostsFailure(error.response.data.message));
  }
}

function* loadMorePostsSaga() {
  const posts: Array<PostDetailsType> = yield select(allPosts);
  /**
   * pathCallApi: '/post'
   * pathCallApi: '/post/user/123' (userId = 123)
   * pathCallApi: '/post/user/trash/123' (userId = 123)
   * pathCallApi: '/post/search'
   *  */
  const pathCallApi: string = yield select(pathGetPosts);
  const contentSearchPostData: string = yield select(contentSearchPost);
  /**
   * Load old post than last post loaded
   * posts.length !== 0 -> this mean can be loaded new data
   *  */
  const createdTimestampLastPost: string | null =
    posts.length !== 0 ? posts[posts.length - 1].createdDate : null;
  try {
    if (createdTimestampLastPost) {
      const response: AxiosResponse<ListResponse<PostDetailsType>> = yield call(
        loadMorePosts,
        {
          path: pathCallApi,
          createdTimestampLastPost: createdTimestampLastPost,
          content: contentSearchPostData,
        }
      );
      if (response.status === 200) {
        // Concat new data to old data
        yield put(postActions.loadMorePostsSuccess(response.data.content));

        // response data === 0 this mean no more posts
        if (response.data.content.length === 0)
          yield put(postActions.setLoadMorePost(false));
      }
    } else yield put(postActions.setLoadMorePost(false));
  } catch (error: any) {
    yield put(postActions.getAllPostsFailure(error.response.data.message));
  }
}

function* reNewDataAllPostSaga(action: PayloadAction<number>) {
  /**
   * Renew data when recived a actions (like,comment,share,...)
   *  */
  try {
    const response: AxiosResponse<PostDetailsType> = yield call(
      getPostDetails,
      action.payload
    );
    if (response.status === 200) {
      // Get old data
      const oldData: Array<PostDetailsType> = yield select(allPosts);

      // Update post liked,shared,commented,...
      const newData: Array<PostDetailsType> = oldData.map((p, _) =>
        p.id === action.payload ? response.data : p
      );

      yield put(postActions.getAllPostsSuccess(newData));

      // Update post detail if other user watching
      const postDetailData: PostDetailsType | null = yield select(postDetails);
      if (postDetailData && postDetailData.id === action.payload) {
        yield put(postActions.getPostDetailsSuccess(response.data));
      }
    }
  } catch (error: any) {
    yield put(postActions.getAllPostsFailure(error.response.data.message));
  }
}

function* reNewDataDetailPostSaga(action: PayloadAction<number>) {
  /**
   * Renew data when recived a actions (like,comment,share,...)
   *  */
  try {
    const response: AxiosResponse<PostDetailsType> = yield call(
      getPostDetails,
      action.payload
    );
    if (response.status === 200) {
      // re-update post detail
      const newData: PostDetailsType = response.data;

      yield put(postActions.getPostDetailsSuccess(newData));
    }
  } catch (error: any) {
    yield put(postActions.getPostDetailsFailure(error.response.data.message));
  }
}

function* getAllPostsByUserIdSaga(action: PayloadAction<number>) {
  try {
    const response: AxiosResponse<ListResponse<PostDetailsType>> = yield call(
      getAllPostsByUserId,
      action.payload
    );
    if (response.status === 200) {
      yield put(postActions.getAllPostsByUserIdSuccess(response.data.content));

      /**
       * Check can still load more base on totalElements
       *  */
      yield put(
        postActions.setLoadMorePost(
          response.data.content.length < response.data.pageable.totalElements
        )
      );
    }
  } catch (error: any) {
    yield put(
      postActions.getAllPostsByUserIdFailure(error.response.data.message)
    );
  }
}

function* getPostDetailsSaga(action: PayloadAction<number>) {
  try {
    const response: AxiosResponse<PostDetailsType> = yield call(
      getPostDetails,
      action.payload
    );
    if (response.status === 200) {
      yield put(postActions.getPostDetailsSuccess(response.data));
    }
  } catch (error: any) {
    yield put(postActions.getPostDetailsFailure(error.response.data.message));
  }
}

function* likePostSaga(
  action: PayloadAction<{
    likePostRequest: LikePostRequest;
    sendNotify: () => void;
  }>
) {
  try {
    const response: AxiosResponse<PostDetailsType> = yield call(
      likePost,
      action.payload.likePostRequest
    );
    if (response.status === 200) {
      yield put(postActions.likePostSuccess());

      // Send notify to receiver
      action.payload.sendNotify();
    }
  } catch (error: any) {
    yield put(postActions.likePostFailure(error.response.data.message));
  }
}

function* unLikePostSaga(
  action: PayloadAction<{
    unLikePostRequest: LikePostRequest;
    sendNotify: () => void;
  }>
) {
  try {
    const response: AxiosResponse<PostDetailsType> = yield call(
      unLikePost,
      action.payload.unLikePostRequest
    );
    if (response.status === 200) {
      yield put(postActions.unLikePostSuccess());

      // Send  notify to receiver
      action.payload.sendNotify();
    }
  } catch (error: any) {
    yield put(postActions.unLikePostFailure(error.response.data.message));
  }
}

function* sharePostSaga(
  action: PayloadAction<{
    sharePostRequest: SharePostRequest;
    sendNotify: () => void;
  }>
) {
  try {
    const response: AxiosResponse<PostDetailsType> = yield call(
      sharePost,
      action.payload.sharePostRequest
    );
    if (response.status === 200) {
      yield put(postActions.sharePostSuccess());

      // Send notify to receiver
      action.payload.sendNotify();
    }
  } catch (error: any) {
    yield put(postActions.sharePostFailure(error.response.data.message));
  }
}

function* createPostSaga(
  action: PayloadAction<{
    createPostRequest: CreatePostRequest;
    sendNotify: (post: PostDetailsType) => void;
  }>
) {
  try {
    const response: AxiosResponse<PostDetailsType> = yield call(
      createPost,
      action.payload.createPostRequest
    );
    if (response.status === 200) {
      if (action.payload.createPostRequest.imageUrls) {
        const body: { urls: Array<String>; post: { id: number } } = {
          urls: action.payload.createPostRequest.imageUrls,
          post: {
            id: response.data.id,
          },
        };
        yield call(createGalleryImageForPost, body);
      }
      yield put(postActions.createPostSuccess());

      // Get new data load to top
      yield put(postActions.getAllPostsRequest());

      // Send notification to friend
      action.payload.sendNotify(response.data);
    }
  } catch (error: any) {
    yield put(postActions.createPostFailure(error.response.data.message));
  }
}

function* deletePostSaga(action: PayloadAction<PostDetailsType>) {
  try {
    // Delte post
    const response: AxiosResponse<string> = yield call(
      deletePost,
      action.payload.id
    );

    if (response.status === 200) {
      yield put(postActions.deletePostSuccess());

      /**
       * Loop current posts and update
       * remove this post from current all posts
       */
      // Get old data
      const oldData: Array<PostDetailsType> = yield select(allPosts);

      // Filter to update data
      const newData: Array<PostDetailsType> = oldData.filter(
        (p, _) => p.id !== action.payload.id
      );
      yield put(postActions.getAllPostsSuccess(newData));

      // Load more post when delete
      yield put(postActions.loadMorePostsRequest());
    }
  } catch (error: any) {
    yield put(postActions.deletePostFailure(error.response.data.message));
  }
}

function* createCommentPostSaga(
  action: PayloadAction<{
    commentPostRequest: CreateNewCommentRequest;
    sendNotify: () => void;
  }>
) {
  try {
    const response: AxiosResponse<PostDetailsType> = yield call(
      createCommentPost,
      action.payload.commentPostRequest
    );
    if (response.status === 200) {
      yield put(postActions.createCommentPostSuccess());

      // Send notify to receiver
      action.payload.sendNotify();
    }
  } catch (error: any) {
    yield put(
      postActions.createCommentPostFailure(error.response.data.message)
    );
  }
}

function* replyCommentPostSaga(
  action: PayloadAction<{
    replyCommentRequest: ReplyCommentRequest;
    sendNotify: () => void;
  }>
) {
  try {
    const response: AxiosResponse<PostDetailsType> = yield call(
      replyCommentPost,
      action.payload.replyCommentRequest
    );
    if (response.status === 200) {
      yield put(postActions.replyCommentPostSuccess());

      // Send notify to receiver
      action.payload.sendNotify();
    }
  } catch (error: any) {
    yield put(
      postActions.createCommentPostFailure(error.response.data.message)
    );
  }
}

function* deleteCommentPostSaga(
  action: PayloadAction<{
    deleteCommentRequest: DeleteCommentPostRequest;
    sendNotify: () => void;
  }>
) {
  try {
    // Delete comment
    const response: AxiosResponse<PostDetailsType> = yield call(
      deleteCommentPost,
      action.payload.deleteCommentRequest
    );

    if (response.status === 200) {
      yield put(postActions.deleteCommentPostSuccess());

      // Send notify
      action.payload.sendNotify();
    }
  } catch (error: any) {
    yield put(
      postActions.deleteCommentPostFailure(error.response.data.message)
    );
  }
}

function* updateCommentSaga(
  action: PayloadAction<{
    updateCommentPostRequest: UpdateCommentRequest;
    sendNotify: () => void;
  }>
) {
  try {
    const response: AxiosResponse<PostDetailsType> = yield call(
      updateComment,
      action.payload.updateCommentPostRequest
    );
    if (response.status === 200) {
      yield put(postActions.updatePostSuccess());

      // Send notify to receiver
      action.payload.sendNotify();
    }
  } catch (error: any) {
    yield put(postActions.updatePostFailure(error.response.data.message));
  }
}

function* updatePostSaga(action: PayloadAction<UpdatePostRequest>) {
  try {
    const response: AxiosResponse<PostDetailsType> = yield call(
      updatePost,
      action.payload
    );
    if (response.status === 200) {
      yield put(postActions.updatePostSuccess());

      /**
       * Loop current posts and update
       */
      // Get old data
      const oldData: Array<PostDetailsType> = yield select(allPosts);

      // Update data
      const newData: Array<PostDetailsType> = oldData.map((p, _) =>
        p.id === action.payload.id ? response.data : p
      );
      yield put(postActions.getAllPostsSuccess(newData));
    }
  } catch (error: any) {
    yield put(postActions.updatePostFailure(error.response.data.message));
  }
}

function* watchPostSaga(): Generator {
  yield takeLatest(postActions.getAllPostsRequest.type, getAllPostsSaga);

  yield takeLatest(postActions.getPostDetailsRequest.type, getPostDetailsSaga);

  yield takeLatest(
    postActions.getAllPostsByUserIdRequest.type,
    getAllPostsByUserIdSaga
  );

  yield takeLatest(postActions.searchPostsRequest.type, searchPostSaga);

  yield takeLatest(postActions.likePostRequest.type, likePostSaga);

  yield takeLatest(postActions.unLikePostRequest.type, unLikePostSaga);

  yield takeLatest(postActions.createPostRequest.type, createPostSaga);

  yield takeLatest(postActions.deletePostRequest.type, deletePostSaga);

  yield takeLatest(
    postActions.createCommentPostRequest.type,
    createCommentPostSaga
  );

  yield takeLatest(
    postActions.replyCommentPostRequest.type,
    replyCommentPostSaga
  );

  yield takeLatest(
    postActions.deleteCommentPostRequest.type,
    deleteCommentPostSaga
  );

  yield takeLatest(postActions.updatePostRequest.type, updatePostSaga);

  yield takeLatest(
    postActions.updateCommentPostRequest.type,
    updateCommentSaga
  );

  yield takeLatest(postActions.sharePostRequest.type, sharePostSaga);

  yield takeLatest(
    postActions.reNewDataAllPostsRequest.type,
    reNewDataAllPostSaga
  );

  yield takeLatest(
    postActions.reNewDataPostDetailRequest.type,
    reNewDataDetailPostSaga
  );

  yield takeLatest(postActions.loadMorePostsRequest.type, loadMorePostsSaga);
}

const postSaga = [fork(watchPostSaga)];
export default postSaga;
