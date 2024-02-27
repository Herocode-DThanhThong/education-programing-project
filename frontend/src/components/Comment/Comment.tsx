import { useState } from "react";
import { IComment, PostDetailsType, ReplyComment, UserType } from "types";
// Vendor
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Avatar } from "@mui/material";

// Src
import "assests/css/NewFeed.css";
import { useAppSelector } from "common/hooks";
import { idUser, userName } from "common/services/authService/authSlice";
import { ModalEditComment, ModalReplyComment } from "components/Modal";
import { Dispatch, SetStateAction } from "react";
import { getChildComment } from "utils";
import CommentList from "./CommentList";
import { Link } from "react-router-dom";

type Props = {
  post: PostDetailsType;
  comment: IComment;
  setEditComment: Dispatch<
    SetStateAction<{
      id?: string | undefined;
      post: PostDetailsType;
      user: UserType;
      content: string;
      commentImageUrl: string | null;
    } | null>
  >;
  editComment: {
    id?: string | undefined;
    post: PostDetailsType;
    user: UserType;
    content: string;
    commentImageUrl: string | null;
  } | null;

  setReplyComment: Dispatch<SetStateAction<ReplyComment | null>>;
  replyComment: ReplyComment | null;

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

const Comment = ({
  comment,
  post,
  editComment,
  replyComment,
  setEditComment,
  handleDeleteComment,
  setReplyComment,
  handleEditComment,
  handleReplyComment,
}: Props) => {
  const idUserLoggedIn = useAppSelector(idUser);
  const userNameLoggedIn = useAppSelector(userName);

  // States
  const [showReplyComment, setShowReplyComment] = useState(false);

  // Variables
  const childComments = getChildComment(comment.id, post.comments);

  return (
    <>
      {/* Root comment */}
      <div className="item-comment">
        <div className="py-2">
          <div className="user-img flex items-center">
            {comment.user.imageUrl ? (
              <Avatar
                sx={{
                  width: 30,
                  height: 30,
                }}
                alt="avatar"
                src={comment.user.imageUrl}
              />
            ) : (
              <AccountCircleOutlinedIcon style={{ fontSize: "30px" }} />
            )}
          </div>
        </div>

        <div className="user-comment relative my-2">
          <div className="w-fit">
            <Link to={`/community/userPost/${comment.user.id}`}>
              <div className="top">
                <p className="user-name">
                  {comment.user.firstName} {comment.user.lastName}
                </p>
                <div
                  className="comment max-w-sm list"
                  dangerouslySetInnerHTML={{ __html: comment.content }}
                />
              </div>
            </Link>

            <div className="image">
              {comment.commentImageUrl && (
                <img
                  src={comment.commentImageUrl}
                  className="max-w-sm max-h-[200px] rounded-md"
                  alt=""
                />
              )}
            </div>

            <div className="bottom">
              {comment.user.id === idUserLoggedIn && (
                <>
                  <span
                    className="mr-2 font-semibold text-gray-500 hover:text-gray-400"
                    onClick={() => {
                      setEditComment({
                        post,
                        ...comment,
                      });
                    }}
                  >
                    Chỉnh sửa
                  </span>
                  <span
                    className="mr-2 font-semibold text-gray-500 hover:text-gray-400"
                    onClick={() =>
                      handleDeleteComment(
                        post.id,
                        comment.id,
                        comment.content,
                        comment.commentImageUrl
                      )
                    }
                  >
                    Xóa
                  </span>
                </>
              )}

              <span
                className="mr-2 font-semibold text-gray-500 hover:text-gray-400"
                onClick={() => {
                  setReplyComment({
                    ...replyComment,
                    parent: {
                      id: comment.id,
                    },
                    post: {
                      id: post.id,
                    },
                    replyCommentValue: {
                      content: "",
                      commentImageUrl: null,
                      user: {
                        id: idUserLoggedIn as number,
                        userName: userNameLoggedIn as string,
                      },
                    },
                  });
                }}
              >
                Phản hồi
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Reply comment */}
      {childComments.length > 0 && (
        <div className="relative">
          <div className={`ml-8 ${showReplyComment ? "" : "hidden"}`}>
            <button
              onClick={() => {
                setShowReplyComment(false);
              }}
              className="font-semibold text-[12px] mb-2"
            >
              Ẩn phản hồi...
            </button>
            <div className="">
              <CommentList
                // Data
                comments={childComments}
                post={post}
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
          </div>
          <button
            onClick={() => {
              setShowReplyComment(true);
            }}
            className={`ml-10 font-semibold text-[12px] ${
              showReplyComment ? "hidden" : ""
            }`}
          >
            Hiển thị thêm...
          </button>
        </div>
      )}

      {/* Modal reply + edit comment */}
      {editComment && (
        <ModalEditComment
          // States
          editComment={editComment}
          setEditComment={setEditComment}
          // Data binding
          comment={comment}
          // Handler
          handleEditComment={handleEditComment}
        />
      )}
      {replyComment && (
        <ModalReplyComment
          // States
          replyComment={replyComment}
          setReplyComment={setReplyComment}
          // Data binding
          comment={comment}
          // Handler
          handleReplyComment={handleReplyComment}
        />
      )}
    </>
  );
};

export default Comment;
