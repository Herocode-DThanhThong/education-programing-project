import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar, Box } from "@mui/material";
import axiosClient from "api/axiosClient";
import { Search, SearchIconWrapper, StyledInputBase } from "assests/mui/styles";
import { useAppSelector } from "common/hooks";
import { idUser } from "common/services/authService/authSlice";
import debounce from "debounce";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { store } from "redux/configureStore";
import { UserType } from "types";

interface Props {}

const SearchFriend = (props: Props) => {
  // Hooks
  const idUserLoggedIn = useAppSelector(idUser);
  const navigate = useNavigate();

  // States
  const searchRef = useRef<HTMLInputElement>(null);
  const [searchValue, setSearchValue] = useState("");
  const [usersSearch, setUsersSearch] = useState<Array<UserType>>([]);
  const [showResult, setShowResult] = useState(false);

  // Handler
  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.target.value) setShowResult(true);
    else setShowResult(false);
    setSearchValue(e.target.value);
  };

  const handleClickUserSearch = (user: UserType) => {
    navigate(`/community/userPost/${user.id}`);

    setShowResult(false);

    // Clear search value
    setSearchValue("");

    // Update value in input
    if (searchRef.current) {
      searchRef.current.value = "";
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    if (searchValue) {
      (async () => {
        try {
          const accessToken = store.getState().authReducer.accessToken;
          const { data } = await axiosClient.get(
            `/users/search?fullName=${searchValue}`,
            {
              signal: controller.signal,
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          setUsersSearch(data);
        } catch (e) {
          console.log(e);
        }
      })();
    } else {
      setUsersSearch([]);
    }

    return () => {
      controller.abort();
    };
  }, [searchValue]);

  return (
    <div className="relative ml-6">
      <Box sx={{ display: "flex", gap: "4px" }}>
        <Search
          sx={{
            width: "100%",
            margin: "0 !important",
          }}
        >
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            inputRef={searchRef}
            sx={{
              width: "350px",
            }}
            defaultValue={""}
            onChange={debounce(handleSearchChange, 300)}
            placeholder={"Tìm kiếm bạn bè"}
            inputProps={{ "aria-label": "search" }}
          />
        </Search>
      </Box>

      {showResult && (
        <div className="absolute shadow-md bottom-0 translate-y-full left-0 right-0 bg-white">
          {usersSearch.map(
            (user, _) =>
              user.id !== idUserLoggedIn && (
                <div
                  onClick={() => {
                    handleClickUserSearch(user);
                  }}
                  key={user.id}
                >
                  <div className="flex py-3 px-2 gap-2 items-center hover:bg-gray-200">
                    <div className="user-img text-sm text-black">
                      {user.imageUrl ? (
                        <Avatar
                          sx={{
                            m: 1,
                            bgcolor: "orange",
                            margin: "auto",
                            width: 28,
                            height: 28,
                          }}
                          alt="avatar"
                          src={user.imageUrl}
                        />
                      ) : (
                        <AccountCircleOutlinedIcon
                          style={{ fontSize: "28px" }}
                        />
                      )}
                    </div>
                    <div className="user-info text-sm text-black">
                      <p className="name">
                        {user.firstName} {user.lastName}
                      </p>
                    </div>
                  </div>
                </div>
              )
          )}
        </div>
      )}
    </div>
  );
};

export default SearchFriend;
