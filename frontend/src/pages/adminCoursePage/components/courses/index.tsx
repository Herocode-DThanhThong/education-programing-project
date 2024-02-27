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
import { Path } from "api/paths";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { baseService } from "common/services/baseService";
import {
  courseActions,
  courses,
  filters,
  pagination,
} from "common/services/courseService/courseSlice";
import { loadingActions } from "common/services/loadingService/loadingSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CourseCard from "./components/CourseCard";
import CourseSearch from "./components/CourseSearch";

type Props = {};

const ManagementCoursesPage = (props: Props) => {
  // Hooks
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const coursesData = useAppSelector(courses);
  const filterData = useAppSelector(filters);
  const paginationData = useAppSelector(pagination);

  useEffect(() => {
    dispatch(courseActions.resetFilter());
    dispatch(courseActions.getAllCourseRequest());
  }, []);

  const handlePagination = (page: number, size: number) => {
    dispatch(
      courseActions.setFilter({
        ...filterData,
        page,
        size,
      })
    );
    dispatch(courseActions.getAllCourseRequest());
  };

  const deleteCourse = async (id: string | number) => {
    if (window.confirm("Bạn chắc chắn muốn xóa khóa học này?")) {
      dispatch(loadingActions.startLoading());
      try {
        await baseService.DELETE(`${Path.GetAllCourses}/${id}`);
        dispatch(courseActions.getAllCourseRequest());
        toast.success("Xóa khóa học thành công");
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
            <Typography variant="h5">Quản lý khóa học</Typography>
          </Stack>
          <div>
            <Button
              size="small"
              onClick={() => {
                navigate("/admin/courses/add");
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
        <CourseSearch />
        <Grid container spacing={3}>
          {coursesData &&
            coursesData.map((course) => (
              <Grid xs={12} md={6} lg={4} key={course.id}>
                <CourseCard course={course} onDelete={deleteCourse} />
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

export default ManagementCoursesPage;
