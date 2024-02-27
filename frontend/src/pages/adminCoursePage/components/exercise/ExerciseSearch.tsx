import { Card, InputAdornment, OutlinedInput, SvgIcon } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

type Props = {};

const ExerciseSearch = (props: Props) => {
  return (
    <Card sx={{ p: 2, my: 2 }}>
      <OutlinedInput
        size="small"
        defaultValue=""
        fullWidth
        placeholder="Search company"
        startAdornment={
          <InputAdornment position="start">
            <SvgIcon color="action" fontSize="small">
              <SearchIcon />
            </SvgIcon>
          </InputAdornment>
        }
        sx={{ maxWidth: 500 }}
      />
    </Card>
  );
};

export default ExerciseSearch;
