import { BASE_URL_SOCKET_SERVER } from "api/paths";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { idUser, userName } from "common/services/authService/authSlice";
import { chatActions } from "common/services/chatService/chatSlice";
import { friendActions } from "common/services/friendService/friendSlice";
import { notificationActions } from "common/services/notificationService/notificationSlice";
import { postActions } from "common/services/postService/postSlice";
import { useEffect } from "react";
import SockJS from "sockjs-client";
import { over } from "stompjs";
import {
  FriendAction,
  NotificationRequest,
  NotificationToReceiver,
  SignalType,
} from "types";
import { MessageRealTime } from "types/ChatType";

// Variables
let stompClient: any = null;
export const useRealTime = () => {
  // Hooks
  const dispatch = useAppDispatch();
  const userNameLoggedIn = useAppSelector(userName);
  const idUserNameLoggedIn = useAppSelector(idUser);
  // Handle real time like, comment, share, add/accept/decline/cancel friend
  const connect = () => {
    let Sock = new SockJS(BASE_URL_SOCKET_SERVER);
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  };

  const onConnected = () => {
    stompClient.subscribe(
      "/user/" + userNameLoggedIn + "/private",
      onSignalPrivateReceived
    );

    stompClient.subscribe("/signal/public", onSignalPublicReceived);
  };

  const onSignalPrivateReceived = (payload: any) => {
    const payloadData: SignalType = JSON.parse(payload.body);
    const userFromId = payloadData.userFrom?.id;
    const userToId = payloadData.userTo?.id;
    const action = payloadData.action;
    const conversationId = payloadData.conversationId;

    switch (action) {
      case "LIKE_POST_ACTION": {
        dispatch(
          notificationActions.getAllNotificationsRequest(userToId as number)
        );
        break;
      }
      case "COMMENT_POST_ACTION": {
        dispatch(
          notificationActions.getAllNotificationsRequest(userToId as number)
        );
        break;
      }
      case "SHARE_POST_ACTION": {
        dispatch(
          notificationActions.getAllNotificationsRequest(userToId as number)
        );
        break;
      }
      case "NEW_POST_ACTION": {
        dispatch(
          notificationActions.getAllNotificationsRequest(userToId as number)
        );
        break;
      }
      case "ADD_FRIEND_REQUEST_ACTION": {
        dispatch(
          friendActions.getAllfriendRequestReceivedRequest(userToId as number)
        );
        break;
      }
      case "CANCEL_FRIEND_REQUEST_SENDING_ACTION": {
        dispatch(
          friendActions.getAllfriendRequestReceivedRequest(userToId as number)
        );
        break;
      }
      case "ACCEPT_FRIEND_REQUEST_ACTION": {
        dispatch(
          friendActions.getAllFriendRequestSendingRequest(userFromId as number)
        );
        dispatch(friendActions.getAllFriendsRequest(userFromId as number));
        break;
      }
      case "DECLINE_FRIEND_REQUEST_ACTION": {
        dispatch(
          friendActions.getAllfriendRequestReceivedRequest(
            idUserNameLoggedIn as number
          )
        );
        dispatch(
          friendActions.getAllFriendRequestSendingRequest(
            idUserNameLoggedIn as number
          )
        );
        break;
      }
      case "REMOVE_FRIEND_ACTION": {
        dispatch(
          friendActions.getAllFriendsRequest(idUserNameLoggedIn as number)
        );
        dispatch(
          friendActions.getAllFriendsSuggestRequest(
            idUserNameLoggedIn as number
          )
        );
        break;
      }
      case "CHAT_PRIVATE_ACTION": {
        dispatch(chatActions.refreshConversation(conversationId));
        break;
      }
      default: {
      }
    }
  };

  const onSignalPublicReceived = (payload: any) => {
    const payloadData: SignalType = JSON.parse(payload.body);
    const postId = payloadData.postId;

    // Re-trigger to get new data
    if (postId) {
      dispatch(postActions.reNewDataAllPostsRequest(postId));
    }
  };

  const onError = (err: any) => {
    console.log(err);
  };

  const sendNotificationToReceiver = (data: NotificationToReceiver) => {
    const notification: NotificationRequest = {
      content: `${data.typeNotify.toLowerCase()} your post`,
      userFrom: data.userFrom,
      userTo: data.userTo,
      post: {
        id: data.post.id,
      },
      notificationType: data.typeNotify,
      delivered: true,
      read: false,
      storeInDB: data.storeInDB,
      action: data.action,
    };
    if (stompClient) {
      // Send notify to post owner's
      stompClient.send("/app/private-notify", {}, JSON.stringify(notification));

      // Send all users in system
      stompClient.send("/app/signal", {}, JSON.stringify(notification));
    }
  };

  const sendFriendActionToReceiver = (friendAction: FriendAction) => {
    if (stompClient) {
      const { userFrom, userTo, path, action } = friendAction;
      stompClient.send(
        path,
        {},
        JSON.stringify({
          userFrom,
          userTo,
          action,
        })
      );
    }
  };

  const sendMessageToReceiver = (mess: MessageRealTime) => {
    if (stompClient) {
      stompClient.send("/app/chat-private", {}, JSON.stringify(mess));
    }
  };

  useEffect(() => {
    // Connect socket
    connect();
    return () => {
      stompClient.disconnect();
    };
  }, []);

  return {
    sendNotificationToReceiver,
    sendFriendActionToReceiver,
    sendMessageToReceiver,
  };
};
