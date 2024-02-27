import FriendList from "./components/FriendCardList";
import SearchFriend from "./components/SearchFriend";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { idUser } from "common/services/authService/authSlice";
import {
  friendActions,
  friends,
} from "common/services/friendService/friendSlice";
import { useEffect } from "react";
import { IFriend, UserType } from "types";
import { useState } from "react";
import { useRealTime } from "hooks";
interface Props {}

const FriendCoursePage = (props: Props) => {
  // States
  const [friendsSearching, setFriendsSearching] =
    useState<Array<UserType> | null>([]);
  const _ = useRealTime();
  // Hooks
  const dispatch = useAppDispatch();
  const idUserLoggedIn = useAppSelector(idUser);
  const friendsData = useAppSelector(friends);

  const mappingFriend = (data: IFriend[]) => {
    // Get all user friends
    const allUserFriend: Array<UserType> = data
      ? data.map((f) =>
          f.userFrom.id === idUserLoggedIn ? f.userTo : f.userFrom
        )
      : [];

    // Handle and get result
    const friendSearchResult = allUserFriend.filter(
      (u) => u.firstName + u.lastName
    );
    return friendSearchResult;
  };

  // Handler
  const searchFriend = (inputValue: string) => {
    if (!friendsData) {
      setFriendsSearching(null);
      return;
    }

    if (!inputValue) {
      setFriendsSearching(mappingFriend(friendsData));
      return;
    }

    // Get all user friends
    const allUserFriend: Array<UserType> = friendsData
      ? friendsData.map((f) =>
          f.userFrom.id === idUserLoggedIn ? f.userTo : f.userFrom
        )
      : [];

    // Handle and get result
    const friendSearchResult = allUserFriend.filter((u) =>
      (u.firstName + u.lastName)
        .toLowerCase()
        .includes(inputValue.toLocaleLowerCase().trim())
    );

    // Set result
    setFriendsSearching(friendSearchResult);
  };

  // Effects
  useEffect(() => {
    dispatch(friendActions.getAllFriendsRequest(idUserLoggedIn as number));
  }, []);

  useEffect(() => {
    if (friendsData) {
      // Set result
      setFriendsSearching(mappingFriend(friendsData));
    }
  }, [friendsData]);

  return (
    <div className="w-full p-4 pl-[120px]">
      <div className="px-12">
        <h1 className="text-left font-bold text-xl">Tìm kiếm bạn bè</h1>
        <div className="my-4">
          <SearchFriend searchFriend={searchFriend} />
        </div>
      </div>

      <div className="px-12">
        <h1 className="text-left font-bold text-xl">
          Tất cả bạn bè {friendsData ? `(${friendsData.length})` : `(${0})`}
        </h1>
        {friendsSearching ? (
          <FriendList friendsData={friendsSearching} />
        ) : (
          <p className="text-center">No friend</p>
        )}
      </div>
    </div>
  );
};

export default FriendCoursePage;
