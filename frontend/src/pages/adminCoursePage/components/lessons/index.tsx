import {
  Box,
  Button,
  Container,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { LessonTable } from "./components/LessonTable";
import { useNavigate } from "react-router-dom";
import LessonSearch from "./components/LessonSearch";

type Props = {};

const AdminLessonPage = (props: Props) => {
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
            <Typography variant="h5">Quản lý bài học</Typography>
          </Stack>
          <div>
            <Button
              size="small"
              onClick={() => {
                navigate("/admin/lesson/add");
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
        <LessonSearch />
        <LessonTable />
      </Container>
    </Box>
  );
};

export default AdminLessonPage;
