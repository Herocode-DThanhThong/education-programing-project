import SearchIcon from "@mui/icons-material/Search";
import {
  Button,
  Card,
  InputAdornment,
  OutlinedInput,
  SvgIcon,
} from "@mui/material";
import { useAppDispatch } from "common/hooks";
import { userActions } from "common/services/userService/userSlice";
import { useState } from "react";

const UserSearch = () => {
  const dispatch = useAppDispatch();
  const [searchText, setSearchText] = useState("");
  const fetchSearch = (value: string) => {
    dispatch(
      userActions.setFilter({
        page: 0,
        size: 10,
        text: value,
      })
    );
    dispatch(userActions.getAllUserRequest());
  };
  const onSearch = (e: any) => {
    if (e.key === "Enter") {
      fetchSearch(e.target.value);
    }
  };

  const clearSearch = () => {
    setSearchText("");
    fetchSearch("");
  };
  return (
    <Card sx={{ p: 2, my: 2 }}>
      <OutlinedInput
        size="small"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onKeyDown={onSearch}
        fullWidth
        placeholder="Tìm kiếm theo tên người dùng"
        startAdornment={
          <InputAdornment position="start">
            <SvgIcon color="action" fontSize="small">
              <SearchIcon />
            </SvgIcon>
          </InputAdornment>
        }
        sx={{ maxWidth: 500 }}
      />
      <Button
        onClick={() => fetchSearch(searchText)}
        size="small"
        sx={{ mx: 2 }}
        variant="contained"
      >
        Tìm kiếm
      </Button>
      <Button onClick={() => clearSearch()} size="small" variant="contained">
        Xóa
      </Button>
    </Card>
  );
};

export default UserSearch;
