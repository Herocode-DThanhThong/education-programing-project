import { KeyboardEvent, useState } from "react";
// Vendor
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Input from "@mui/material/Input";
import { useAppDispatch, useAppSelector } from "common/hooks";
// Src
import "assests/css/NewFeed.css";
import { idUser, userName } from "common/services/authService/authSlice";
import { postActions } from "common/services/postService/postSlice";
import CommentList from "components/Comment/CommentList";
import {
  NotificationToReceiver,
  PostDetailsType,
  ReplyComment,
  UserType,
} from "types";
import { getRootComments } from "utils";
import { Avatar } from "@mui/material";
import { user } from "common/services/settingService/settingSlice";
type Props = {
  post: PostDetailsType;
  sendNotificationToReceiver: (data: NotificationToReceiver) => void;
};

const PostBottom = ({ post, sendNotificationToReceiver }: Props) => {
  // Hooks
  const dispatch = useAppDispatch();
  const idUserLoggedIn = useAppSelector(idUser);
  const userNameLoggedIn = useAppSelector(userName);
  const userData = useAppSelector(user);

  // States
  const [openCommentsPost, setOpenCommentsPost] = useState<number | null>(null);
  const [replyComment, setReplyComment] = useState<ReplyComment | null>(null);
  const [inputNewComment, setInputNewComment] = useState<string>("");
  const [editComment, setEditComment] = useState<{
    id?: string;
    post: PostDetailsType;
    user: UserType;
    content: string;
    commentImageUrl: string | null;
  } | null>(null);

  const handleAddComment = (
    event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
    post: PostDetailsType
  ) => {
    if (event.key === "Enter") {
      // Add comment action
      addCommentSubmit(post, inputNewComment, "");

      // Clear content comment
      setInputNewComment("");
    }
  };

  const handleDeleteComment = (
    idPost: number,
    idComment: string,
    contentCommnet: string,
    commentImageUrl: string | null
  ) => {
    // Delete comment
    deleteUserCommentSubmit(idPost, idComment, contentCommnet, commentImageUrl);
  };

  const handleEditComment = (
    idComment: string,
    dataEdit: {
      id?: string;
      post: PostDetailsType;
      user: UserType;
      content: string;
      commentImageUrl: string | null;
    }
  ) => {
    if (editComment) {
      // Edit comment
      editCommentSubmit(idComment, dataEdit);

      // Clear data edit comment
      setEditComment(null);
    }
  };

  const createComment = (post: PostDetailsType) => {
    return (
      <div className="create-comment items-center">
        <div className="user-img">
          {userData?.imageUrl ? (
            <Avatar
              sx={{
                width: 30,
                height: 30,
              }}
              alt="avatar"
              src={userData?.imageUrl}
            />
          ) : (
            <AccountCircleOutlinedIcon style={{ fontSize: "30px" }} />
          )}
        </div>
        <Input
          placeholder="Nhập nội dung bình luận..."
          className="input-comment"
          disableUnderline
          value={inputNewComment}
          onChange={(e) => setInputNewComment(e.target.value)}
          onKeyDown={(event) => {
            handleAddComment(event, post);
          }}
        />
      </div>
    );
  };

  const handleReplyComment = (dataReplyComment: {
    contentReply: string;
    commentImageUrl: string | null;
  }) => {
    if (replyComment) {
      // Edit comment
      replyCommentSubmit(dataReplyComment);

      // Clear data reply comment
      setReplyComment(null);
    }
  };

  // UI
  const likePost = (post: PostDetailsType) => {
    const likedUser = post.likedUsers.find((u) => u.id === idUserLoggedIn);

    return (
      <Button
        variant="text"
        startIcon={
          likedUser ? (
            <ThumbUpAltIcon style={{ color: "#1976d2" }} />
          ) : (
            <ThumbUpOffAltIcon style={{ color: "black" }} />
          )
        }
        style={{
          textTransform: "none",
          color: likedUser ? "#1976d2" : "black",
          fontWeight: likedUser ? "600" : "500",
        }}
        onClick={() => likePostSubmit(post, likedUser)}
      >
        Thích
      </Button>
    );
  };

  const commentPost = (post: PostDetailsType) => {
    return (
      <Button
        variant="text"
        startIcon={<ChatOutlinedIcon style={{ color: "black" }} />}
        onClick={() => setOpenCommentsPost(openCommentsPost ? null : post.id)}
        style={{
          textTransform: "none",
          color: "black",
          backgroundColor: openCommentsPost === post.id ? "#eee" : "",
        }}
      >
        Bình luận
      </Button>
    );
  };

  const sharePost = () => {
    return (
      <Button
        variant="text"
        startIcon={<SendOutlinedIcon style={{ color: "black" }} />}
        onClick={() => {
          sharePostSubmit(post);
        }}
        style={{
          textTransform: "none",
          color: "black",
        }}
      >
        Chia sẻ
      </Button>
    );
  };

  // Submit
  const likePostSubmit = (
    post: PostDetailsType,
    likedUser?: UserType
  ): void => {
    if (likedUser) {
      dispatch(
        postActions.unLikePostRequest({
          unLikePostRequest: {
            post: {
              id: post.id,
            },
            user: {
              id: idUserLoggedIn as number,
              userName: userNameLoggedIn as string,
            },
          },
          sendNotify: () => {
            sendNotificationToReceiver({
              post,
              userFrom: {
                id: idUserLoggedIn as number,
                userName: userNameLoggedIn as string,
              },
              userTo: {
                id: post.user.id as number,
                userName: post.user.userName as string,
              },
              storeInDB: false,

              typeNotify: "LIKE",
              action: "LIKE_POST_ACTION",
            });
          },
        })
      );
    } else {
      // Create like post
      dispatch(
        postActions.likePostRequest({
          likePostRequest: {
            post: {
              id: post.id,
            },
            user: {
              id: idUserLoggedIn as number,
              userName: userNameLoggedIn as string,
            },
          },
          sendNotify: () => {
            // Send notify to receiver
            sendNotificationToReceiver({
              post,
              userFrom: {
                id: idUserLoggedIn as number,
                userName: userNameLoggedIn as string,
              },
              userTo: {
                id: post.user.id as number,
                userName: post.user.userName as string,
              },
              storeInDB: true,

              typeNotify: "LIKE",
              action: "LIKE_POST_ACTION",
            });
          },
        })
      );
    }
  };

  const addCommentSubmit = (
    post: PostDetailsType,
    contentComment: string,
    imgComment: string | null
  ): void => {
    if (!contentComment && !imgComment) return;

    const body = {
      post: {
        id: post.id,
      },
      comment: {
        content: contentComment,
        commentImageUrl: imgComment,
        user: {
          id: idUserLoggedIn as number,
          userName: userNameLoggedIn as string,
        },
      },
    };
    dispatch(
      postActions.createCommentPostRequest({
        commentPostRequest: body,
        sendNotify: () => {
          sendNotificationToReceiver({
            post,
            userFrom: {
              id: idUserLoggedIn as number,
              userName: userNameLoggedIn as string,
            },
            userTo: {
              id: post.user.id as number,
              userName: post.user.userName as string,
            },
            storeInDB: true,

            typeNotify: "COMMENT",
            action: "COMMENT_POST_ACTION",
          });
        },
      })
    );
  };

  const deleteUserCommentSubmit = (
    idPost: number,
    idComment: string,
    contentCommnet: string,
    commentImageUrl: string | null
  ): void => {
    const body = {
      post: {
        id: idPost,
      },
      comment: {
        id: idComment,
        content: contentCommnet,
        commentImageUrl: commentImageUrl,
        user: {
          id: idUserLoggedIn as number,
          userName: userNameLoggedIn as string,
        },
      },
    };
    dispatch(
      postActions.deleteCommentPostRequest({
        deleteCommentRequest: body,
        sendNotify: () => {
          sendNotificationToReceiver({
            post,
            userFrom: {
              id: idUserLoggedIn as number,
              userName: userNameLoggedIn as string,
            },
            userTo: {
              id: post.user.id as number,
              userName: post.user.userName as string,
            },
            storeInDB: false,

            typeNotify: "COMMENT",
            action: "COMMENT_POST_ACTION",
          });
        },
      })
    );
  };

  const editCommentSubmit = (
    idComment: string,
    dataCommentEdit: {
      id?: string;
      post: PostDetailsType;
      user: UserType;
      content: string;
      commentImageUrl: string | null;
    }
  ): void => {
    dispatch(
      postActions.updateCommentPostRequest({
        updateCommentPostRequest: {
          id: idComment,
          post: dataCommentEdit.post,
          comment: {
            user: dataCommentEdit.user,
            commentImageUrl: dataCommentEdit.commentImageUrl,
            content: dataCommentEdit.content,
          },
        },
        sendNotify: () => {
          sendNotificationToReceiver({
            post,
            userFrom: {
              id: idUserLoggedIn as number,
              userName: userNameLoggedIn as string,
            },
            userTo: {
              id: post.user.id as number,
              userName: post.user.userName as string,
            },
            storeInDB: false,

            typeNotify: "COMMENT",
            action: "COMMENT_POST_ACTION",
          });
        },
      })
    );
  };

  const sharePostSubmit = (post: PostDetailsType): void => {
    // Share post
    dispatch(
      postActions.sharePostRequest({
        sharePostRequest: {
          post: {
            id: post.id,
          },
          user: {
            id: idUserLoggedIn as number,
            userName: userNameLoggedIn as string,
          },
        },
        sendNotify: () => {
          // Send notify to receiver
          sendNotificationToReceiver({
            post,
            userFrom: {
              id: idUserLoggedIn as number,
              userName: userNameLoggedIn as string,
            },
            userTo: {
              id: post.user.id as number,
              userName: post.user.userName as string,
            },
            storeInDB: true,

            typeNotify: "SHARE",
            action: "SHARE_POST_ACTION",
          });
        },
      })
    );
  };

  const replyCommentSubmit = (dataReplyComment: {
    contentReply: string;
    commentImageUrl: string | null;
  }) => {
    if (!dataReplyComment.contentReply && !dataReplyComment.commentImageUrl)
      return;

    if (replyComment) {
      dispatch(
        postActions.replyCommentPostRequest({
          replyCommentRequest: {
            parent: replyComment.parent,
            post: replyComment.post,
            replyComment: {
              ...replyComment.replyCommentValue,
              commentImageUrl: dataReplyComment.commentImageUrl,
              content: dataReplyComment.contentReply,
            },
          },
          sendNotify: () => {
            sendNotificationToReceiver({
              post,
              userFrom: {
                id: idUserLoggedIn as number,
                userName: userNameLoggedIn as string,
              },
              userTo: {
                id: post.user.id as number,
                userName: post.user.userName as string,
              },
              storeInDB: true,

              typeNotify: "COMMENT",
              action: "COMMENT_POST_ACTION",
            });
          },
        })
      );
    }
  };

  return (
    <div className="post-bottom" style={{ paddingTop: 0 }}>
      <div className="post-interactive">
        {likePost(post)}
        {commentPost(post)}
        {!post.isPostShared && sharePost()}
      </div>

      {openCommentsPost === post.id && (
        <>
          <Divider variant="fullWidth" style={{ margin: "10px 0" }} />
          {/* Create comment Input */}
          {createComment(post)}

          {/* List comment */}
          <div className="post-list-comments">
            <CommentList
              // Data
              comments={getRootComments(post.comments)}
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
        </>
      )}
    </div>
  );
};

export default PostBottom;
