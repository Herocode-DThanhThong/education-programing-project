import { UserType } from "types";
import Friend from "./FriendCardItem";

interface Props {
  friendsData: UserType[];
}

const FriendList = ({ friendsData }: Props) => {
  return (
    <div className="grid grid-cols-4 gap-2 mt-4">
      {friendsData.map((friend, _) => (
        <Friend friend={friend} key={friend.id} />
      ))}
    </div>
  );
};

export default FriendList;
