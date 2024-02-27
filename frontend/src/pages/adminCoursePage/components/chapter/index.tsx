import {
  Box,
  Button,
  Container,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { ChapterTable } from "./components/ChapterTable";
import ChapterSearch from "./components/ChapterSearch";
import { useNavigate } from "react-router-dom";

type Props = {};

const AdminChapterPage = (props: Props) => {
  const navigate = useNavigate();
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
      }}
    >
      <Container maxWidth="xl">
        <Stack
          direction="row"
          mb={2}
          justifyContent="space-between"
          spacing={4}
        >
          <Stack spacing={1}>
            <Typography variant="h5">Quản lý chương học</Typography>
          </Stack>
          <div>
            <Button
              size="small"
              onClick={() => {
                navigate("/admin/chapter/add");
              }}
              startIcon={
                <SvgIcon fontSize="small">
                  <AddIcon />
                </SvgIcon>
              }
              variant="contained"
            >
              Thêm
            </Button>
          </div>
        </Stack>
        <ChapterSearch />
        <ChapterTable />
      </Container>
    </Box>
  );
};

export default AdminChapterPage;
