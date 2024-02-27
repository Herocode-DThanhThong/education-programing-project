import { Box } from "@mui/material";
import { useAppSelector } from "common/hooks";
import { idUser, userName } from "common/services/authService/authSlice";
import {
  friendActions,
  friendRequestReceived,
  friendsSuggest,
} from "common/services/friendService/friendSlice";
import { FriendRequest, FriendSuggest } from "components/Friend";
import { LoadingBasic } from "components/Loading";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { FriendAction, IFriend, UserType } from "types";

interface Props {
  sendFriendActionToReceiver: (friendAction: FriendAction) => void;
}

export const RightWall = ({ sendFriendActionToReceiver }: Props) => {
  // Hooks
  const dispatch = useDispatch();
  const idUserLoggedIn = useAppSelector(idUser);
  const userNameLoggedIn = useAppSelector(userName);
  const friendsSuggestData = useAppSelector(friendsSuggest);
  const friendsRequestReceivedData = useAppSelector(friendRequestReceived);

  // Handler
  const sendFriendInvitation = (userTo: UserType) => {
    dispatch(
      friendActions.sendFriendInvitationRequest({
        friend: {
          userFrom: {
            id: idUserLoggedIn as number,
            userName: userNameLoggedIn as string,
          },
          userTo: {
            id: userTo.id,
            userName: userTo.userName,
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
              id: userTo.id,
              userName: userTo.userName,
            },
            action: "ADD_FRIEND_REQUEST_ACTION",
            path: "/app/friend-request",
          });
        },
      })
    );
  };

  const acceptFriendInvitation = (friendRequestReceived: IFriend) => {
    dispatch(
      friendActions.acceptFriendInvitationRequest({
        friendId: friendRequestReceived.id,
        acceptRequest: () => {
          sendFriendActionToReceiver({
            userFrom: friendRequestReceived.userFrom,
            userTo: friendRequestReceived.userTo,
            action: "ACCEPT_FRIEND_REQUEST_ACTION",
            path: "/app/friend-accept",
          });
        },
      })
    );
  };

  const cancelFriendRequest = (friendRequestReceived: IFriend) => {
    dispatch(
      friendActions.declineInvitaionRequest({
        userId: idUserLoggedIn as number,
        friendId: friendRequestReceived.id,
        declineRequest: () => {
          sendFriendActionToReceiver({
            userFrom: friendRequestReceived.userFrom,
            userTo: friendRequestReceived.userTo,
            action: "DECLINE_FRIEND_REQUEST_ACTION",
            path: "/app/decline-friend-request",
          });
        },
      })
    );
  };

  // Effects
  useEffect(() => {
    dispatch(
      friendActions.getAllFriendsSuggestRequest(idUserLoggedIn as number)
    );
    dispatch(
      friendActions.getAllfriendRequestReceivedRequest(idUserLoggedIn as number)
    );
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      <div
        className="post-wrapper max-h-[40%] overflow-auto scrollbar scrollbar-thumb-transparent scrollbar-track-transparent"
        style={{ position: "fixed", width: "20%", padding: "12px 24px" }}
      >
        <h1 className="font-bold mb-3">Lời mời kết bạn</h1>

        {/* Start User Request */}
        {friendsRequestReceivedData ? (
          friendsRequestReceivedData.length > 0 &&
          friendsRequestReceivedData.map(
            (friendRequestReceived: IFriend, _) => (
              <FriendRequest
                key={friendRequestReceived.id}
                // Data
                friendRequestReceived={friendRequestReceived}
                // Handler
                acceptFriendInvitation={acceptFriendInvitation}
                cancelFriendRequest={cancelFriendRequest}
              />
            )
          )
        ) : (
          <LoadingBasic />
        )}

        {/* End User Request */}
      </div>

      {/* Start friend suggest */}
      <div
        className="post-wrapper max-h-[40%] overflow-auto scrollbar scrollbar-thumb-transparent scrollbar-track-transparent"
        style={{
          position: "fixed",
          bottom: "12px",
          width: "20%",
          padding: "12px 24px",
        }}
      >
        <h1 className="font-bold mb-3">Gợi ý bạn bè</h1>
        {friendsSuggestData ? (
          friendsSuggestData.map((friend: UserType, _) => (
            <FriendSuggest
              key={friend.id}
              // Data
              user={friend}
              // Handler
              sendFriendInvitation={sendFriendInvitation}
            />
          ))
        ) : (
          <LoadingBasic />
        )}
      </div>
      {/* End friend suggest */}
    </Box>
  );
};
