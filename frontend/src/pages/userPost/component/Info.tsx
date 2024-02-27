import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Avatar } from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { idUser, userName } from "common/services/authService/authSlice";
import {
  friendActions,
  friendRequestReceived,
  friendRequestSending,
  friends,
} from "common/services/friendService/friendSlice";
import { useEffect, useState } from "react";
import { FriendAction, IFriend, UserType } from "types";
import AcceptOrDeclineFriendRequestButton from "./AcceptOrDeclineFriendRequestButton";
import AddFriendButton from "./AddFriendButton";
import SendFriendRequestButton from "./CancelFriendRequestButton";
import FriendButton from "./FriendButton";
import { chatActions } from "common/services/chatService/chatSlice";

const getFriendRequestSending = (
  id: number | string,
  arrData: IFriend[]
): IFriend | null => {
  for (let index = 0; index < arrData.length; index++) {
    const element = arrData[index];
    if (element.userTo.id === id) return element;
  }
  return null;
};

const getFriendRequestReceived = (
  id: number | string,
  arrData: IFriend[]
): IFriend | null => {
  for (let index = 0; index < arrData.length; index++) {
    const element = arrData[index];
    if (element.userFrom.id === id) return element;
  }
  return null;
};

const getFriend = (id: number | string, arrData: IFriend[]): IFriend | null => {
  for (let index = 0; index < arrData.length; index++) {
    const element = arrData[index];
    if (element.userFrom.id === id || element.userTo.id === id) return element;
  }
  return null;
};

interface InforProps {
  user: UserType;
  sendFriendActionToReceiver: (friendAction: FriendAction) => void;
}
const Info = ({ user, sendFriendActionToReceiver }: InforProps) => {
  // Hooks
  const dispatch = useAppDispatch();
  const friendSendingRequestData = useAppSelector(friendRequestSending);
  const friendsRequestReceivedData = useAppSelector(friendRequestReceived);
  const friendData = useAppSelector(friends);

  const idUserLoggedIn = useAppSelector(idUser);
  const userNameLoggedIn = useAppSelector(userName);
  // States
  const [friendStatus, setFriendStatus] = useState<
    "FRIEND" | "SENDING" | "WAITING" | "STRANGING" | null
  >(null);
  const [friend, setFriend] = useState<IFriend | null>(null);

  // Handler
  const addFriend = () => {
    dispatch(
      friendActions.sendFriendInvitationRequest({
        friend: {
          userFrom: {
            id: idUserLoggedIn as number,
            userName: userNameLoggedIn as string,
          },
          userTo: {
            id: user.id,
            userName: user.userName,
          },
          status: false,
        },
        sendRequest: () => {
          sendFriendActionToReceiver({
            userFrom: {
              id: idUserLoggedIn as number,
              userName: userNameLoggedIn as string,
            },
            userTo: {
              id: user.id,
              userName: user.userName,
            },
            action: "ADD_FRIEND_REQUEST_ACTION",
            path: "/app/friend-request",
          });
        },
      })
    );
  };

  const acceptFriendInvitation = () => {
    if (friend)
      dispatch(
        friendActions.acceptFriendInvitationRequest({
          friendId: friend.id,
          acceptRequest: () => {
            sendFriendActionToReceiver({
              userFrom: friend.userFrom,
              userTo: friend.userTo,
              action: "ACCEPT_FRIEND_REQUEST_ACTION",
              path: "/app/friend-accept",
            });
          },
        })
      );
  };

  const cancelFriendRequestSending = () => {
    if (friend)
      dispatch(
        friendActions.cancelFriendRequestSendingRequest({
          userId: idUserLoggedIn as number,
          friendId: friend.id,
          cancelFriendRequestSending: () => {
            sendFriendActionToReceiver({
              userFrom: friend.userFrom,
              userTo: friend.userTo,
              action: "CANCEL_FRIEND_REQUEST_SENDING_ACTION",
              path: "/app/cancel-friend-request",
            });
          },
        })
      );
  };

  const declineFriendRequest = () => {
    if (friend)
      dispatch(
        friendActions.declineInvitaionRequest({
          userId: idUserLoggedIn as number,
          friendId: friend.id,
          declineRequest: () => {
            sendFriendActionToReceiver({
              userFrom: friend.userFrom,
              userTo: friend.userTo,
              action: "DECLINE_FRIEND_REQUEST_ACTION",
              path: "/app/decline-friend-request",
            });
          },
        })
      );
  };

  const deleteFriend = () => {
    if (friend) {
      dispatch(
        friendActions.removeFriendRequest({
          userId: idUserLoggedIn as number,
          friendId: friend.id,
          removeRequest: () => {
            sendFriendActionToReceiver({
              userFrom: friend.userFrom,
              userTo: friend.userTo,
              action: "REMOVE_FRIEND_ACTION",
              path: "/app/remove-friend",
            });
          },
        })
      );
    }
  };

  // Effects
  useEffect(() => {
    dispatch(
      friendActions.getAllFriendRequestSendingRequest(idUserLoggedIn as number)
    );
    dispatch(friendActions.getAllFriendsRequest(idUserLoggedIn as number));
    dispatch(
      friendActions.getAllfriendRequestReceivedRequest(idUserLoggedIn as number)
    );
  }, []);

  useEffect(() => {
    if (friendSendingRequestData && friendsRequestReceivedData && friendData) {
      if (getFriend(user.id, friendData)) {
        setFriendStatus("FRIEND");
        setFriend(getFriend(user.id, friendData));
      } else if (getFriendRequestSending(user.id, friendSendingRequestData)) {
        setFriend(getFriendRequestSending(user.id, friendSendingRequestData));
        setFriendStatus("SENDING");
      } else if (
        getFriendRequestReceived(user.id, friendsRequestReceivedData)
      ) {
        setFriendStatus("WAITING");
        setFriend(
          getFriendRequestReceived(user.id, friendsRequestReceivedData)
        );
      } else {
        setFriendStatus("STRANGING");
      }
    }
  }, [friendSendingRequestData, friendsRequestReceivedData, friendData]);

  return (
    <div className="post-wrapper">
      <div className="w-full p-2">
        <div className="flex flex-col items-center">
          <div className="user-img">
            {user.imageUrl ? (
              <Avatar
                sx={{
                  m: 1,
                  bgcolor: "orange",
                  margin: "auto",
                  width: 64,
                  height: 64,
                }}
                alt="avatar"
                src={user.imageUrl}
              />
            ) : (
              <AccountCircleIcon style={{ fontSize: "60px" }} />
            )}
          </div>
          <div>
            <h1 className="font-semibold mt-2">
              {user.firstName} {user.lastName}
            </h1>
          </div>

          {/* Only load button when not myself */}
          {user.id !== idUserLoggedIn ? (
            friendSendingRequestData &&
            friendsRequestReceivedData &&
            friendData &&
            friendStatus ? (
              <div className="flex gap-2 mt-2">
                {friendStatus === "FRIEND" ? (
                  <FriendButton deleteFriend={deleteFriend} />
                ) : friendStatus === "SENDING" ? (
                  <SendFriendRequestButton
                    cancelFriendSendingRequest={cancelFriendRequestSending}
                  />
                ) : friendStatus === "WAITING" ? (
                  <AcceptOrDeclineFriendRequestButton
                    acceptFriendInvitation={acceptFriendInvitation}
                    declineFriendRequest={declineFriendRequest}
                  />
                ) : (
                  <AddFriendButton addFriend={addFriend} />
                )}
                <button
                  disabled={friendStatus !== "FRIEND"}
                  onClick={() => {
                    dispatch(
                      chatActions.getDetailConversationRequest({
                        userIdOne: idUserLoggedIn as number,
                        userIdTwo: user.id,
                      })
                    );
                  }}
                  className={`${
                    friendStatus !== "FRIEND"
                      ? "bg-gray-500"
                      : "bg-blue-500 hover:bg-blue-400"
                  } flex items-center gap-2 p-2 rounded-md text-white transition-all ease-in-out`}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"
                    />
                  </svg>

                  <p className="text-sm">Nhắn tin</p>
                </button>
              </div>
            ) : (
              <div
                role="status"
                className="max-w-sm p-4 rounded animate-pulse md:p-6 "
              >
                <div className="flex gap-3">
                  <div className="w-16 h-8 bg-gray-200 rounded-md dark:bg-gray-700" />
                  <div className="w-16 h-8 bg-gray-200 rounded-md dark:bg-gray-700" />
                </div>
              </div>
            )
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Info;
