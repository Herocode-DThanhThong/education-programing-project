import {
  Button,
  Card,
  InputAdornment,
  OutlinedInput,
  SvgIcon,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useAppDispatch } from "common/hooks";
import { useState } from "react";
import { chapterActions } from "common/services/chapterService/chapterSlice";
type Props = {};

const ChapterSearch = (props: Props) => {
  const dispatch = useAppDispatch();
  const [searchText, setSearchText] = useState("");

  const fetchSearch = (value: string) => {
    dispatch(
      chapterActions.setFilter({
        page: 0,
        size: 10,
        text: value,
      })
    );
    dispatch(chapterActions.getAllChapterRequest());
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
        placeholder="Tìm kiếm chương học theo tên"
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

export default ChapterSearch;
