// Vendor
import { AxiosResponse } from "axios";
import { call, fork, put, takeLatest } from "redux-saga/effects";

// Src
import { PayloadAction } from "@reduxjs/toolkit";
import axiosClient from "api/axiosClient";
import { Path } from "api/paths";
import { store } from "redux/configureStore";
import { IFriend, IFriendSendingRequest, UserType } from "types";
import { friendActions } from "./friendSlice";

// Get all friend
async function getAllFriends(
  userID: string | number
): Promise<AxiosResponse<Array<IFriend>>> {
  const accessToken = store.getState().authReducer.accessToken;

  return await axiosClient.get(`${Path.GetAllFriend}/${userID}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

// Get all friend suggest
async function getAllFriendsSuggest(
  userID: string | number
): Promise<AxiosResponse<Array<UserType>>> {
  const accessToken = store.getState().authReducer.accessToken;

  return await axiosClient.get(`${Path.GetAllFriendSuggest}/${userID}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

// Get all friend request sending
async function getAllFriendsRequestSending(
  userId: string | number
): Promise<AxiosResponse<Array<IFriend>>> {
  const accessToken = store.getState().authReducer.accessToken;

  return await axiosClient.get(`${Path.GetAllFriendRequestSending}/${userId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

// Get all friend request received
async function getAllFriendsRequestReceived(
  userId: string | number
): Promise<AxiosResponse<Array<IFriend>>> {
  const accessToken = store.getState().authReducer.accessToken;

  return await axiosClient.get(
    `${Path.GetAllFriendRequestReceived}/${userId}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
}

// send friend invitation
async function sendFriendInvitation(
  friendRequest: IFriendSendingRequest
): Promise<AxiosResponse<IFriend>> {
  const accessToken = store.getState().authReducer.accessToken;

  return await axiosClient.post(`${Path.SendFriendInvitation}`, friendRequest, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

// accept friend invitation
async function acceptFriendInvitation(
  friendReceivedID: string | number
): Promise<AxiosResponse<IFriend>> {
  const accessToken = store.getState().authReducer.accessToken;

  return await axiosClient.put(
    `${Path.AcceptFriendInvitation}/${friendReceivedID}`,
    {},
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
}

// cancel friend invitation
async function removeFriend(
  friendId: string | number
): Promise<AxiosResponse<string>> {
  const accessToken = store.getState().authReducer.accessToken;

  return await axiosClient.delete(
    `${Path.CancelFriendInvitation}/${friendId}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
}

function* getAllFriendsSaga(action: PayloadAction<string | number>) {
  try {
    const response: AxiosResponse<Array<IFriend>> = yield call(
      getAllFriends,
      action.payload
    );
    if (response.status === 200) {
      yield put(friendActions.getAllFriendsSuccess(response.data));
    }
  } catch (error: any) {
    yield put(friendActions.getAllFriendsFailure(error.response.data.message));
  }
}

function* getAllFriendsSuggestSaga(action: PayloadAction<string | number>) {
  try {
    const response: AxiosResponse<Array<UserType>> = yield call(
      getAllFriendsSuggest,
      action.payload
    );
    if (response.status === 200) {
      yield put(friendActions.getAllFriendsSuggestSuccess(response.data));
    }
  } catch (error: any) {
    yield put(
      friendActions.getAllFriendsSuggestFailure(error.response.data.message)
    );
  }
}

function* getAllFriendsRequestSendingSaga(
  action: PayloadAction<number | string>
) {
  try {
    const response: AxiosResponse<Array<IFriend>> = yield call(
      getAllFriendsRequestSending,
      action.payload
    );
    if (response.status === 200) {
      yield put(friendActions.getAllFriendRequestSendingSuccess(response.data));
    }
  } catch (error: any) {
    yield put(
      friendActions.getAllFriendRequestSendingFailure(
        error.response.data.message
      )
    );
  }
}

function* getAllFriendsRequestReceivedSaga(
  action: PayloadAction<number | string>
) {
  try {
    const response: AxiosResponse<Array<IFriend>> = yield call(
      getAllFriendsRequestReceived,
      action.payload
    );
    if (response.status === 200) {
      yield put(
        friendActions.getAllfriendRequestReceivedSuccess(response.data)
      );

      yield put(friendActions.getAllFriendsSuggestRequest(action.payload));
    }
  } catch (error: any) {
    yield put(
      friendActions.getAllfriendRequestReceivedFailure(
        error.response.data.message
      )
    );
  }
}

function* sendFriendInvitationSaga(
  action: PayloadAction<{
    friend: IFriendSendingRequest;
    sendRequest: () => void;
  }>
) {
  try {
    const response: AxiosResponse<IFriend> = yield call(
      sendFriendInvitation,
      action.payload.friend
    );
    if (response.status === 200) {
      yield put(
        friendActions.getAllFriendRequestSendingRequest(
          action.payload.friend.userFrom.id
        )
      );
      yield put(
        friendActions.getAllFriendsSuggestRequest(
          action.payload.friend.userFrom.id
        )
      );

      // Send request to receiver
      action.payload.sendRequest();
    }
  } catch (error: any) {
    yield put(
      friendActions.sendFriendInvitationFailure(error.response.data.message)
    );
  }
}

function* acceptFriendInvitationSaga(
  action: PayloadAction<{
    friendId: string | number;
    acceptRequest: () => void;
  }>
) {
  try {
    const response: AxiosResponse<IFriend> = yield call(
      acceptFriendInvitation,
      action.payload.friendId
    );
    if (response.status === 200) {
      yield put(
        friendActions.getAllfriendRequestReceivedRequest(
          response.data.userTo.id
        )
      );
      yield put(friendActions.getAllFriendsRequest(response.data.userTo.id));

      // Accept request and notify to requester
      action.payload.acceptRequest();
    }
  } catch (error: any) {
    yield put(
      friendActions.acceptFriendInvitationFailure(error.response.data.message)
    );
  }
}

function* removeFriendSaga(
  action: PayloadAction<{
    userId: string | number;
    friendId: string | number;
    removeRequest: () => void;
  }>
) {
  try {
    const response: AxiosResponse<string> = yield call(
      removeFriend,
      action.payload.friendId
    );
    if (response.status === 200) {
      yield put(friendActions.getAllFriendsRequest(action.payload.userId));
      yield put(
        friendActions.getAllFriendsSuggestRequest(action.payload.userId)
      );
      // Remove friend
      action.payload.removeRequest();
    }
  } catch (error: any) {
    yield put(friendActions.removeFriendFailure(error.response.data.message));
  }
}

function* declineInvitationSaga(
  action: PayloadAction<{
    userId: string | number;
    friendId: string | number;
    declineRequest: () => void;
  }>
) {
  try {
    const response: AxiosResponse<string> = yield call(
      removeFriend,
      action.payload.friendId
    );
    if (response.status === 200) {
      yield put(
        friendActions.getAllFriendRequestSendingRequest(action.payload.userId)
      );
      yield put(
        friendActions.getAllfriendRequestReceivedRequest(action.payload.userId)
      );

      // Deny request and notify to friend requester
      action.payload.declineRequest();
    }
  } catch (error: any) {
    yield put(friendActions.removeFriendFailure(error.response.data.message));
  }
}

function* cancelFriendRequestSendingSaga(
  action: PayloadAction<{
    userId: string | number;
    friendId: string | number;
    cancelFriendRequestSending: () => void;
  }>
) {
  try {
    const response: AxiosResponse<string> = yield call(
      removeFriend,
      action.payload.friendId
    );
    if (response.status === 200) {
      yield put(
        friendActions.getAllFriendRequestSendingRequest(action.payload.userId)
      );

      yield put(
        friendActions.getAllFriendsSuggestRequest(action.payload.userId)
      );

      // Cancel request sending and notify to receiver
      action.payload.cancelFriendRequestSending();
    }
  } catch (error: any) {
    yield put(friendActions.removeFriendFailure(error.response.data.message));
  }
}

function* watchFriendSaga(): Generator {
  yield takeLatest(
    friendActions.getAllFriendsSuggestRequest.type,
    getAllFriendsSuggestSaga
  );

  yield takeLatest(
    friendActions.getAllFriendRequestSendingRequest.type,
    getAllFriendsRequestSendingSaga
  );

  yield takeLatest(
    friendActions.getAllfriendRequestReceivedRequest.type,
    getAllFriendsRequestReceivedSaga
  );

  yield takeLatest(
    friendActions.sendFriendInvitationRequest.type,
    sendFriendInvitationSaga
  );

  yield takeLatest(
    friendActions.cancelFriendRequestSendingRequest.type,
    cancelFriendRequestSendingSaga
  );

  yield takeLatest(
    friendActions.acceptFriendInvitationRequest.type,
    acceptFriendInvitationSaga
  );

  yield takeLatest(friendActions.getAllFriendsRequest.type, getAllFriendsSaga);

  yield takeLatest(
    friendActions.declineInvitaionRequest.type,
    declineInvitationSaga
  );

  yield takeLatest(friendActions.removeFriendRequest.type, removeFriendSaga);
}

const friendSaga = [fork(watchFriendSaga)];
export default friendSaga;
