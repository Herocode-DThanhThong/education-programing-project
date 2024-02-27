import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Avatar, Typography } from "@mui/material";
import { StyledBadge } from "assests/mui/styles";
import { UserType } from "types";
interface Props {
  user: UserType;
  sendFriendInvitation: (userTo: UserType) => void;
}
export const FriendSuggest = ({ user, sendFriendInvitation }: Props) => {
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
          {user.imageUrl ? (
            <Avatar
              sx={{
                m: 1,
                bgcolor: "orange",
                margin: "auto",
                width: 32,
                height: 32,
              }}
              alt="avatar"
              src={user.imageUrl}
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
          {user.firstName + " " + user.lastName}
        </Typography>
        <div className="flex gap-2">
          <button
            onClick={() => {
              sendFriendInvitation(user);
            }}
            className="py-1 rounded-md text-white px-5 hover:bg-sky-500 bg-sky-600 text-sm transition-all ease-in-out"
          >
            Thêm bạn
          </button>
        </div>
      </div>
    </div>
  );
};
