// Vendor
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Src
import { IRootReducer } from 'redux/rootReducer';
import {
  CreateNewCommentRequest,
  CreatePostRequest,
  DeleteCommentPostRequest,
  LikePostRequest,
  PostDetailsType,
  PostStateTypes,
  ReplyCommentRequest,
  SharePostRequest,
  UpdateCommentRequest,
  UpdatePostRequest,
} from 'types';

const initialState: PostStateTypes = {
  allPosts: null,
  postDetails: null,
  allPostsInTrash: null,
  allPostsReadyDeleted: [],
  loadMorePost: true,
  messageError: null,
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    // get all posts
    getAllPostsRequest: (state): void => {
      Object.assign(state, {});
    },
    getAllPostsSuccess: (
      state,
      action: PayloadAction<Array<PostDetailsType>>
    ): void => {
      Object.assign(state, {
        ...state,
        allPosts: action.payload,
        messageError: null,
      });
    },
    getAllPostsFailure: (state, action: PayloadAction<string>): void => {
      Object.assign(state, {
        ...state,
        allPosts: null,
        messageError: action.payload,
      });
    },

    // search post by content
    searchPostsRequest: (state, _: PayloadAction<string>): void => {
      Object.assign(state, {});
    },
    searchPostsSuccess: (
      state,
      action: PayloadAction<Array<PostDetailsType>>
    ): void => {
      Object.assign(state, {
        ...state,
        allPosts: action.payload,
        messageError: null,
      });
    },
    searchPostsFailure: (state, action: PayloadAction<string>): void => {
      Object.assign(state, {
        ...state,
        allPosts: null,
        messageError: action.payload,
      });
    },

    // re-new data all posts when like,share,comment
    reNewDataAllPostsRequest: (state, _: PayloadAction<number>): void => {
      Object.assign(state, {});
    },
    reNewDataAllPostsSuccess: (
      state,
      action: PayloadAction<Array<PostDetailsType>>
    ): void => {
      Object.assign(state, {
        ...state,
        allPosts: action.payload,
        messageError: null,
      });
    },
    reNewDataFailure: (state, action: PayloadAction<string>): void => {
      Object.assign(state, {
        ...state,
        allPosts: null,
        messageError: action.payload,
      });
    },

    // hide a post in all posts
    addPostReadyDeletedRequest: (
      state,
      action: PayloadAction<PostDetailsType>
    ): void => {
      Object.assign(state, {
        ...state,
        allPostsReadyDeleted: [...state.allPostsReadyDeleted, action.payload],
        messageError: null,
      });
    },
    removePostReadyDeletedRequest: (
      state,
      action: PayloadAction<PostDetailsType>
    ): void => {
      Object.assign(state, {
        ...state,
        allPostsReadyDeleted: state.allPostsReadyDeleted.filter(
          (p) => p.id !== action.payload.id
        ),
        messageError: null,
      });
    },

    // re-new data post detail when like,share,comment of another
    reNewDataPostDetailRequest: (state, _: PayloadAction<number>): void => {
      Object.assign(state, {});
    },
    reNewDataPostDetailSuccess: (
      state,
      action: PayloadAction<PostDetailsType>
    ): void => {
      Object.assign(state, {
        ...state,
        postDetails: action.payload,
        messageError: null,
      });
    },
    reNewPostDetailFailure: (state, action: PayloadAction<string>): void => {
      Object.assign(state, {
        ...state,
        postDetails: null,
        messageError: action.payload,
      });
    },

    // Set load more true/false
    setLoadMorePost: (state, action: PayloadAction<boolean>) => {
      Object.assign(state, {
        ...state,
        loadMorePost: action.payload,
      });
    },

    // Load more post request
    loadMorePostsRequest: (state): void => {
      Object.assign(state, {});
    },
    loadMorePostsSuccess: (
      state,
      action: PayloadAction<Array<PostDetailsType>>
    ): void => {
      Object.assign(state, {
        ...state,
        allPosts: state.allPosts?.concat(action.payload),
        messageError: null,
      });
    },
    loadMorePostsFailure: (state, action: PayloadAction<string>): void => {
      Object.assign(state, {
        ...state,
        allPosts: null,
        messageError: action.payload,
      });
    },

    // get all posts by user id
    getAllPostsByUserIdRequest: (state, _: PayloadAction<number>): void => {
      Object.assign(state, {});
    },
    getAllPostsByUserIdSuccess: (
      state,
      action: PayloadAction<Array<PostDetailsType>>
    ): void => {
      Object.assign(state, {
        ...state,
        allPosts: action.payload,
        messageError: null,
      });
    },
    getAllPostsByUserIdFailure: (
      state,
      action: PayloadAction<string>
    ): void => {
      Object.assign(state, {
        ...state,
        allPosts: null,
        messageError: action.payload,
      });
    },

    // get post details
    getPostDetailsRequest: (state, _: PayloadAction<string | number>): void => {
      Object.assign(state, {
        postDetails: null,
      });
    },
    getPostDetailsSuccess: (
      state,
      action: PayloadAction<PostDetailsType>
    ): void => {
      Object.assign(state, {
        ...state,
        postDetails: action.payload,
        messageError: null,
      });
    },
    getPostDetailsFailure: (state, action: PayloadAction<string>): void => {
      Object.assign(state, {
        ...state,
        postDetails: null,
        messageError: action.payload,
      });
    },

    // like post
    likePostRequest: (
      state,
      _: PayloadAction<{
        likePostRequest: LikePostRequest;
        sendNotify: () => void;
      }>
    ): void => {
      Object.assign(state, {});
    },
    likePostSuccess: (state): void => {
      Object.assign(state, {
        ...state,
        messageError: null,
      });
    },
    likePostFailure: (state, action: PayloadAction<string>): void => {
      Object.assign(state, {
        ...state,
        messageError: action.payload,
      });
    },

    // unlike post
    unLikePostRequest: (
      state,
      _: PayloadAction<{
        unLikePostRequest: LikePostRequest;
        sendNotify: () => void;
      }>
    ): void => {
      Object.assign(state, {});
    },
    unLikePostSuccess: (state): void => {
      Object.assign(state, {
        ...state,
        messageError: null,
      });
    },
    unLikePostFailure: (state, action: PayloadAction<string>): void => {
      Object.assign(state, {
        ...state,
        messageError: action.payload,
      });
    },

    // create new post
    createPostRequest: (
      state,
      _: PayloadAction<{
        createPostRequest: CreatePostRequest;
        sendNotify: (post: PostDetailsType) => void;
      }>
    ): void => {
      Object.assign(state, {});
    },
    createPostSuccess: (state): void => {
      Object.assign(state, {
        ...state,
        messageError: null,
      });
    },
    createPostFailure: (state, action: PayloadAction<string>): void => {
      Object.assign(state, {
        ...state,
        messageError: action.payload,
      });
    },

    // delete post
    deletePostRequest: (state, _: PayloadAction<PostDetailsType>): void => {
      Object.assign(state, {});
    },
    deletePostSuccess: (state): void => {
      Object.assign(state, {
        ...state,
        messageError: null,
      });
    },
    deletePostFailure: (state, action: PayloadAction<string>): void => {
      Object.assign(state, {
        ...state,
        messageError: action.payload,
      });
    },

    // delete multiple post
    deleteMultiplePostRequest: (
      state,
      _: PayloadAction<Array<PostDetailsType>>
    ): void => {
      Object.assign(state, {});
    },
    deleteMultiplePostSuccess: (state): void => {
      Object.assign(state, {
        ...state,
        messageError: null,
      });
    },
    deleteMultiplePostFailure: (state, action: PayloadAction<string>): void => {
      Object.assign(state, {
        ...state,
        messageError: action.payload,
      });
    },

    // create new comment post
    createCommentPostRequest: (
      state,
      _: PayloadAction<{
        commentPostRequest: CreateNewCommentRequest;
        sendNotify: () => void;
      }>
    ): void => {
      Object.assign(state, {});
    },
    createCommentPostSuccess: (state): void => {
      Object.assign(state, {
        ...state,
        messageError: null,
      });
    },
    createCommentPostFailure: (state, action: PayloadAction<string>): void => {
      Object.assign(state, {
        ...state,
        messageError: action.payload,
      });
    },

    // reply comment
    replyCommentPostRequest: (
      state,
      _: PayloadAction<{
        replyCommentRequest: ReplyCommentRequest;
        sendNotify: () => void;
      }>
    ): void => {
      Object.assign(state, {});
    },
    replyCommentPostSuccess: (state): void => {
      Object.assign(state, {
        ...state,
        messageError: null,
      });
    },
    replyCommentPostFailure: (state, action: PayloadAction<string>): void => {
      Object.assign(state, {
        ...state,
        messageError: action.payload,
      });
    },

    // Update user comment post
    updateCommentPostRequest: (
      state,
      _: PayloadAction<{
        updateCommentPostRequest: UpdateCommentRequest;
        sendNotify: () => void;
      }>
    ): void => {
      Object.assign(state, {});
    },
    updateCommentPostSuccess: (state): void => {
      Object.assign(state, {
        ...state,
        messageError: null,
      });
    },
    updateCommnetPostFailure: (state, action: PayloadAction<string>): void => {
      Object.assign(state, {
        ...state,
        messageError: action.payload,
      });
    },

    // delete user comment post
    deleteCommentPostRequest: (
      state,
      _: PayloadAction<{
        deleteCommentRequest: DeleteCommentPostRequest;
        sendNotify: () => void;
      }>
    ): void => {
      Object.assign(state, {});
    },
    deleteCommentPostSuccess: (state): void => {
      Object.assign(state, {
        ...state,
        messageError: null,
      });
    },
    deleteCommentPostFailure: (state, action: PayloadAction<string>): void => {
      Object.assign(state, {
        ...state,
        messageError: action.payload,
      });
    },

    // update post
    updatePostRequest: (state, _: PayloadAction<UpdatePostRequest>): void => {
      Object.assign(state, {});
    },
    updatePostSuccess: (state): void => {
      Object.assign(state, {
        ...state,
        messageError: null,
      });
    },
    updatePostFailure: (state, action: PayloadAction<string>): void => {
      Object.assign(state, {
        ...state,
        messageError: action.payload,
      });
    },

    // Share post
    sharePostRequest: (
      state,
      _: PayloadAction<{
        sharePostRequest: SharePostRequest;
        sendNotify: () => void;
      }>
    ): void => {
      Object.assign(state, {});
    },
    sharePostSuccess: (state): void => {
      Object.assign(state, {
        ...state,
        messageError: null,
      });
    },
    sharePostFailure: (state, action: PayloadAction<string>): void => {
      Object.assign(state, {
        ...state,
        messageError: action.payload,
      });
    },
  },
});

export const postActions = postSlice.actions;

export const loadMorePost = (state: IRootReducer): boolean =>
  state.postReducer.loadMorePost;

export const allPosts = (state: IRootReducer): Array<PostDetailsType> | null =>
  state.postReducer.allPosts;

export const allPostsReadyDeleted = (
  state: IRootReducer
): Array<PostDetailsType> => state.postReducer.allPostsReadyDeleted;

export const allPostsInTrash = (
  state: IRootReducer
): Array<PostDetailsType> | null => state.postReducer.allPostsInTrash;
export const postDetails = (state: IRootReducer): PostDetailsType | null =>
  state.postReducer.postDetails;
export const messageError = (state: IRootReducer): string | null =>
  state.postReducer.messageError;

export default postSlice.reducer;
