import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IRootReducer } from "redux/rootReducer";
import { FriendStateTypes, IFriend, IFriendSendingRequest } from "types";
import { UserType } from "types";

const initialState: FriendStateTypes = {
  friendsSuggest: null,
  friendRequestSending: null,
  friendRequestReceived: null,
  friends: null,
  messageError: null,
};

const friendSlice = createSlice({
  name: "friend",
  initialState,
  reducers: {
    // get all friends
    getAllFriendsRequest: (state, _: PayloadAction<string | number>): void => {
      Object.assign(state, {});
    },
    getAllFriendsSuccess: (
      state,
      action: PayloadAction<Array<IFriend>>
    ): void => {
      Object.assign(state, {
        ...state,
        friends: action.payload,
        messageError: null,
      });
    },
    getAllFriendsFailure: (state, action: PayloadAction<string>): void => {
      Object.assign(state, {
        ...state,
        friends: null,
        messageError: action.payload,
      });
    },

    // get all friends suggest
    getAllFriendsSuggestRequest: (
      state,
      _: PayloadAction<string | number>
    ): void => {
      Object.assign(state, {});
    },
    getAllFriendsSuggestSuccess: (
      state,
      action: PayloadAction<Array<UserType>>
    ): void => {
      Object.assign(state, {
        ...state,
        friendsSuggest: action.payload,
        messageError: null,
      });
    },
    getAllFriendsSuggestFailure: (
      state,
      action: PayloadAction<Array<UserType>>
    ): void => {
      Object.assign(state, {
        ...state,
        friendsSuggest: null,
        messageError: action.payload,
      });
    },

    // get all friends request sending
    getAllFriendRequestSendingRequest: (
      state,
      _: PayloadAction<string | number>
    ): void => {
      Object.assign(state, {});
    },
    getAllFriendRequestSendingSuccess: (
      state,
      action: PayloadAction<Array<IFriend>>
    ): void => {
      Object.assign(state, {
        ...state,
        friendRequestSending: action.payload,
        messageError: null,
      });
    },
    getAllFriendRequestSendingFailure: (
      state,
      action: PayloadAction<string>
    ): void => {
      Object.assign(state, {
        ...state,
        friendRequestSending: null,
        messageError: action.payload,
      });
    },

    // get all friends request receive
    getAllfriendRequestReceivedRequest: (
      state,
      _: PayloadAction<string | number>
    ): void => {
      Object.assign(state, {});
    },
    getAllfriendRequestReceivedSuccess: (
      state,
      action: PayloadAction<Array<IFriend>>
    ): void => {
      Object.assign(state, {
        ...state,
        friendRequestReceived: action.payload,
        messageError: null,
      });
    },
    getAllfriendRequestReceivedFailure: (
      state,
      action: PayloadAction<string>
    ): void => {
      Object.assign(state, {
        ...state,
        friendRequestReceived: null,
        messageError: action.payload,
      });
    },

    // send friend invitation
    sendFriendInvitationRequest: (
      state,
      _: PayloadAction<{
        friend: IFriendSendingRequest;
        sendRequest: () => void;
      }>
    ): void => {
      Object.assign(state, {});
    },
    sendFriendInvitationSuccess: (
      state,
      _: PayloadAction<IFriendSendingRequest>
    ): void => {
      Object.assign(state, {
        ...state,
        messageError: null,
      });
    },
    sendFriendInvitationFailure: (state, _: PayloadAction<string>): void => {
      Object.assign(state, {
        ...state,
        messageError: null,
      });
    },

    // accept friend invitation
    acceptFriendInvitationRequest: (
      state,
      _: PayloadAction<{ friendId: string | number; acceptRequest: () => void }>
    ): void => {
      Object.assign(state, {});
    },
    acceptFriendInvitationSuccess: (state): void => {
      Object.assign(state, {
        ...state,
        messageError: null,
      });
    },
    acceptFriendInvitationFailure: (state, _: PayloadAction<string>): void => {
      Object.assign(state, {
        ...state,
        messageError: null,
      });
    },

    // remove friend
    removeFriendRequest: (
      state,
      _: PayloadAction<{
        userId: string | number;
        friendId: string | number;
        removeRequest: () => void;
      }>
    ): void => {
      Object.assign(state, {});
    },
    removeFriendSuccess: (state): void => {
      Object.assign(state, {
        ...state,
        messageError: null,
      });
    },
    removeFriendFailure: (state, _: PayloadAction<string>): void => {
      Object.assign(state, {
        ...state,
        messageError: null,
      });
    },

    // Cancel friend request sending
    cancelFriendRequestSendingRequest: (
      state,
      _: PayloadAction<{
        userId: string | number;
        friendId: string | number;
        cancelFriendRequestSending: () => void;
      }>
    ): void => {
      Object.assign(state, {});
    },
    cancelFriendRequestSendingSuccess: (state): void => {
      Object.assign(state, {
        ...state,
        messageError: null,
      });
    },
    cancelFriendRequestSendingFailure: (
      state,
      _: PayloadAction<string>
    ): void => {
      Object.assign(state, {
        ...state,
        messageError: null,
      });
    },

    // decline invitation
    declineInvitaionRequest: (
      state,
      _: PayloadAction<{
        userId: string | number;
        friendId: string | number;
        declineRequest: () => void;
      }>
    ): void => {
      Object.assign(state, {});
    },
    declineInvitaionSuccess: (state): void => {
      Object.assign(state, {
        ...state,
        messageError: null,
      });
    },
    declineInvitaionFailure: (state, _: PayloadAction<string>): void => {
      Object.assign(state, {
        ...state,
        messageError: null,
      });
    },
  },
});

export const friendActions = friendSlice.actions;

export const friendsSuggest = (state: IRootReducer): Array<UserType> | null =>
  state.friendReducer.friendsSuggest;

export const friendRequestSending = (
  state: IRootReducer
): Array<IFriend> | null => state.friendReducer.friendRequestSending;

export const friendRequestReceived = (
  state: IRootReducer
): Array<IFriend> | null => state.friendReducer.friendRequestReceived;

export const friends = (state: IRootReducer): Array<IFriend> | null =>
  state.friendReducer.friends;

export const messageError = (state: IRootReducer): string | null =>
  state.postReducer.messageError;

export default friendSlice.reducer;
