import { Dispatch, SetStateAction } from "react";
import { IComment, PostDetailsType, ReplyComment, UserType } from "types";
import Comment from "./Comment";

type Props = {
  comments: Array<IComment>;
  post: PostDetailsType;
  setEditComment: Dispatch<
    SetStateAction<{
      id?: string | undefined;
      post: PostDetailsType;
      user: UserType;
      content: string;
      commentImageUrl: string | null;
    } | null>
  >;
  setReplyComment: Dispatch<SetStateAction<ReplyComment | null>>;
  editComment: {
    id?: string | undefined;
    post: PostDetailsType;
    user: UserType;
    content: string;
    commentImageUrl: string | null;
  } | null;
  handleEditComment: (
    idComment: string,
    dataEdit: {
      id?: string | undefined;
      post: PostDetailsType;
      user: UserType;
      content: string;
      commentImageUrl: string | null;
    }
  ) => void;
  replyComment: ReplyComment | null;
  handleDeleteComment: (
    idPost: number,
    idComment: string,
    contentCommnet: string,
    commentImageUrl: string | null
  ) => void;
  handleReplyComment: (dataReplyComment: {
    contentReply: string;
    commentImageUrl: string | null;
  }) => void;
};

const CommentList = ({
  comments,
  post,
  editComment,
  replyComment,
  setEditComment,
  setReplyComment,
  handleDeleteComment,
  handleEditComment,
  handleReplyComment,
}: Props) => {
  return (
    <>
      {comments.map((comment) => (
        <div key={comment.id} className="border-l-2 px-2">
          <Comment
            // Data
            post={post}
            comment={comment}
            // States
            setEditComment={setEditComment}
            setReplyComment={setReplyComment}
            editComment={editComment}
            replyComment={replyComment}
            // Handler
            handleDeleteComment={handleDeleteComment}
            handleEditComment={handleEditComment}
            handleReplyComment={handleReplyComment}
          />
        </div>
      ))}
    </>
  );
};

export default CommentList;
