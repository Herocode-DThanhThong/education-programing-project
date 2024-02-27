import { UserType } from ".";

export type PostStateTypes = {
  allPosts: Array<PostDetailsType> | null;
  allPostsReadyDeleted: Array<PostDetailsType>;
  allPostsInTrash: Array<PostDetailsType> | null;
  postDetails: PostDetailsType | null;
  loadMorePost: boolean;
  messageError: string | null;
};

export type PostDetailsType = {
  id: number;
  content: string;
  created: string;
  postImageUrl: string | null;
  likedUsers: Array<UserType>;
  sharedUsers: Array<UserType>;
  user: UserType;
  comments: Array<{
    id: string;
    user: UserType;
    content: string;
    commentImageUrl: string | null;
    parent: {
      id: string;
      user: UserType;
      content: string;
    } | null;
  }>;
  galleryImage: Array<{
    id: string;
    url: string;
  }>;
  isPostShared: boolean;
  idPostShared: number | null;
  createdDate: string;
  updatedDate: string;
};

export type LikePostRequest = {
  post: {
    id: number;
  };
  user: {
    id: number;
    userName: string;
  };
};

export type SharePostRequest = {
  post: {
    id: number;
  };
  user: {
    id: number;
    userName: string;
  };
};

export type CreatePostRequest = {
  content: string;
  postImageUrl?: string;
  imageUrls?: Array<String>;
  user: {
    id: number;
    userName: string;
  };
};

export type CreateNewCommentRequest = {
  post: {
    id: number;
  };
  comment: {
    content: string;
    commentImageUrl: string | null;
    user: {
      id: number;
      userName: string;
    };
  };
};

export type UpdateCommentRequest = {
  id: string;
  post: {
    id: number;
  };
  comment: {
    commentImageUrl: string | null;
    user: UserType;
    content: string;
  };
};

export type DeleteCommentPostRequest = {
  post: {
    id: number;
  };
  comment: {
    id: string;
    content: string;
    commentImageUrl: string | null;
    user: {
      id: number;
      userName: string;
    };
  };
};

export type UpdatePostRequest = {
  id: number;
  content: string;
  imageUrl: string | null;
};

export type IComment = {
  id: string;
  user: UserType;
  content: string;
  parent: {
    id: string;
    user: UserType;
    content: string;
  } | null;
  commentImageUrl: string | null;
};

export type ReplyComment = {
  post: Pick<PostDetailsType, "id">;
  parent: Pick<IComment, "id">;
  replyCommentValue: {
    content: string;
    commentImageUrl: string | null;
    user: Pick<UserType, "id" | "userName">;
  };
};

export type ReplyCommentRequest = {
  post: Pick<PostDetailsType, "id">;
  parent: Pick<IComment, "id">;
  replyComment: {
    content: string;
    commentImageUrl: string | null;
    user: Pick<UserType, "id" | "userName">;
  };
};
