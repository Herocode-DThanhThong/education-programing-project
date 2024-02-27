import { UserType } from ".";

export type SignalType = {
  userFrom?: Pick<UserType, "id" | "userName">;
  userTo?: Pick<UserType, "id" | "userName">;
  action:
    | "LIKE_POST_ACTION"
    | "COMMENT_POST_ACTION"
    | "SHARE_POST_ACTION"
    | "NEW_POST_ACTION"
    | "ADD_FRIEND_REQUEST_ACTION"
    | "ACCEPT_FRIEND_REQUEST_ACTION"
    | "DECLINE_FRIEND_REQUEST_ACTION"
    | "CANCEL_FRIEND_REQUEST_SENDING_ACTION"
    | "REMOVE_FRIEND_ACTION"
    | "CHAT_PRIVATE_ACTION";
  postId?: number;
  conversationId?: string;
};
