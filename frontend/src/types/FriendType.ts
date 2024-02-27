import { UserType } from ".";

export type FriendStateTypes = {
  friendsSuggest: Array<UserType> | null;
  friendRequestSending: Array<IFriend> | null;
  friendRequestReceived: Array<IFriend> | null;
  friends: Array<IFriend> | null;
  messageError: string | null;
};

export type IFriend = {
  id: number | string;
  userFrom: UserType;
  userTo: UserType;
  status: boolean;
};

export type IFriendSendingRequest = {
  userFrom: Pick<UserType, "id" | "userName">;
  userTo: Pick<UserType, "id" | "userName">;
  status: boolean;
};

export type UserFriend = {
  id: number;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  imageUrl: string;
};

export type FriendAction = {
  userFrom: Pick<UserType, "id" | "userName">;
  userTo: Pick<UserType, "id" | "userName">;
  action:
    | "ADD_FRIEND_REQUEST_ACTION"
    | "ACCEPT_FRIEND_REQUEST_ACTION"
    | "DECLINE_FRIEND_REQUEST_ACTION"
    | "CANCEL_FRIEND_REQUEST_SENDING_ACTION"
    | "REMOVE_FRIEND_ACTION";
  path:
    | "/app/friend-request"
    | "/app/cancel-friend-request"
    | "/app/friend-accept"
    | "/app/decline-friend-request"
    | "/app/remove-friend";
};
