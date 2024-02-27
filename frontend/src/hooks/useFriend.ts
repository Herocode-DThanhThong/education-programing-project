import { useAppDispatch, useAppSelector } from "common/hooks";
import { idUser } from "common/services/authService/authSlice";
import {
  friendActions,
  friends,
} from "common/services/friendService/friendSlice";
import { useEffect, useState } from "react";
import { UserType } from "types";

export const useFriend = () => {
  // Hooks
  const dispatch = useAppDispatch();
  const idUserLoggedIn = useAppSelector(idUser);
  const friendsData = useAppSelector(friends);

  // States
  const [friendsSearching, setFriendsSearching] = useState<Array<UserType>>([]);

  // Handler
  const searchFriend = (inputValue: string) => {
    if (!inputValue) {
      setFriendsSearching([]);
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

  return {
    friendsSearching,
    searchFriend,
  };
};
