import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Avatar, Typography } from "@mui/material";
import { StyledBadge } from "assests/mui/styles";
import { IFriend } from "types";

interface Props {
  acceptFriendInvitation: (friendRequestReceived: IFriend) => void;
  cancelFriendRequest: (friendRequestReceived: IFriend) => void;
  friendRequestReceived: IFriend;
}
export const FriendRequest = ({
  acceptFriendInvitation,
  cancelFriendRequest,
  friendRequestReceived,
}: Props) => {
  return (
    <div
      className="mb-6"
      style={{ display: "flex", gap: "8px", alignItems: "center" }}
    >
      <div className="user-img">
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
        >
          {friendRequestReceived.userFrom.imageUrl ? (
            <Avatar
              sx={{
                m: 1,
                bgcolor: "orange",
                margin: "auto",
                width: 32,
                height: 32,
              }}
              alt="avatar"
              src={friendRequestReceived.userFrom.imageUrl}
            />
          ) : (
            <AccountCircleIcon style={{ fontSize: "38px" }} />
          )}
        </StyledBadge>
      </div>
      <div className="">
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: "700",
          }}
        >
          {friendRequestReceived.userFrom.firstName +
            " " +
            friendRequestReceived.userFrom.lastName}
        </Typography>
        <div className="flex gap-2">
          <button
            onClick={() => {
              acceptFriendInvitation(friendRequestReceived);
            }}
            className="py-1 rounded-md text-white px-5 hover:bg-sky-500 bg-sky-600 text-sm transition-all ease-in-out"
          >
            Xác nhận
          </button>
          <button
            onClick={() => {
              cancelFriendRequest(friendRequestReceived);
            }}
            className="py-1 rounded-md text-white px-5 hover:bg-slate-300 bg-slate-400 text-sm transition-all ease-in-out"
          >
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
};
