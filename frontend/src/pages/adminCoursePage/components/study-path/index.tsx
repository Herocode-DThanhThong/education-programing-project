import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  Button,
  Container,
  Unstable_Grid2 as Grid,
  Pagination,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import StudyPathCard from "./components/StudyPathCard";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "common/hooks";
import {
  filters,
  pagination,
  studyPathActions,
  studyPaths,
} from "common/services/studyPathService/studyPathSlice";
import { useEffect } from "react";
import { loadingActions } from "common/services/loadingService/loadingSlice";
import { baseService } from "common/services/baseService";
import { Path } from "api/paths";
import { toast } from "react-toastify";

type Props = {};

const AdminStudyPathPage = (props: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const studyPathsData = useAppSelector(studyPaths);
  const filterData = useAppSelector(filters);
  const paginationData = useAppSelector(pagination);

  useEffect(() => {
    dispatch(studyPathActions.resetFilter());
    dispatch(studyPathActions.getAllStudyPathRequest());
  }, []);

  const handlePagination = (page: number, size: number) => {
    dispatch(
      studyPathActions.setFilter({
        ...filterData,
        page,
        size,
      })
    );
    dispatch(studyPathActions.getAllStudyPathRequest());
  };

  const deleteStudyPath = async (id: string | number) => {
    if (window.confirm("Bạn chắc chắn muốn xóa lộ trình này?")) {
      dispatch(loadingActions.startLoading());
      try {
        await baseService.DELETE(`${Path.GetAllStudyPaths}/${id}`);
        dispatch(studyPathActions.getAllStudyPathRequest());
        toast.success("Xóa lộ trình học thành công");
      } catch (error: any) {
        console.log(error);
        toast.error(error.response.data.message);
      } finally {
        dispatch(loadingActions.endLoading());
      }
    }
  };

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
            <Typography variant="h5">Lộ trình học</Typography>
          </Stack>
          <div>
            <Button
              size="small"
              onClick={() => {
                navigate("/admin/study-path/add");
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
        <Grid container spacing={3}>
          {studyPathsData?.map((sp) => (
            <Grid xs={12} md={6} lg={4} key={sp.id}>
              <StudyPathCard studyPath={sp} onDelete={deleteStudyPath} />
            </Grid>
          ))}
        </Grid>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 2,
          }}
        >
          <Pagination
            onChange={(_, page) => {
              handlePagination(page - 1, filterData.size);
            }}
            page={paginationData.pageNumber + 1}
            count={Math.ceil(
              paginationData.totalElements / paginationData.pageSize
            )}
            size="small"
          />
        </Box>
      </Container>
    </Box>
  );
};

export default AdminStudyPathPage;
