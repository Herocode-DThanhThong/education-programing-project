import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  Button,
  Container,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { ExerciseTable } from "./ExerciseTable";
import ExerciseSearch from "./ExerciseSearch";
type Props = {};

const AdminExericsePage = (props: Props) => {
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
          alignItems={"center"}
        >
          <Stack spacing={1}>
            <Typography variant="h4">Exercises</Typography>
          </Stack>
          <div>
            <Button
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
        <ExerciseSearch />
        <ExerciseTable />
      </Container>
    </Box>
  );
};

export default AdminExericsePage;
