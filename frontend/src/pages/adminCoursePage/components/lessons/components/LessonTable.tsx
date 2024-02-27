import {
  Box,
  Card,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import Button from "@mui/material/Button";
import { useAppDispatch, useAppSelector } from "common/hooks";
import {
  filters,
  lessonActions,
  lessons,
  pagination,
} from "common/services/lessonService/lessonSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { loadingActions } from "common/services/loadingService/loadingSlice";
import { baseService } from "common/services/baseService";
import { Path } from "api/paths";
import { toast } from "react-toastify";

export const LessonTable = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const lessonsData = useAppSelector(lessons);
  const filterData = useAppSelector(filters);
  const paginationData = useAppSelector(pagination);

  useEffect(() => {
    dispatch(lessonActions.resetFilter());
    dispatch(lessonActions.getAllLessonRequest());
  }, []);

  const handlePagination = (page: number, size: number) => {
    dispatch(
      lessonActions.setFilter({
        ...filterData,
        page,
        size,
      })
    );
    dispatch(lessonActions.getAllLessonRequest());
  };

  const deleteLesson = async (id: string) => {
    if (window.confirm("Bạn chắc chắn muốn xóa bài học này?")) {
      dispatch(loadingActions.startLoading());
      try {
        await baseService.DELETE(`${Path.GetAllLessons}/${id}`);
        dispatch(lessonActions.getAllLessonRequest());
        toast.success("Xóa bài học thành công");
      } catch (error: any) {
        console.log(error);
        toast.error(error.response.data.message);
      } finally {
        dispatch(loadingActions.endLoading());
      }
    }
  };

  return (
    <Card>
      <Box sx={{ minWidth: 800 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell size="small">ID</TableCell>
              <TableCell>Tên bài học</TableCell>
              <TableCell>ID chương</TableCell>
              <TableCell>ID Video</TableCell>
              <TableCell>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {lessonsData?.map((lesson) => {
              return (
                <TableRow hover key={lesson.id}>
                  <TableCell size="small">
                    {lesson.id.length > 10
                      ? lesson.id.substring(0, 10) + "..."
                      : lesson.id}
                  </TableCell>
                  <TableCell>{lesson.title}</TableCell>
                  <TableCell>
                    {lesson.chapter.id.length > 10
                      ? lesson.chapter.id.substring(0, 10) + "..."
                      : lesson.chapter.id}
                  </TableCell>
                  <TableCell>{lesson.videoId}</TableCell>
                  <TableCell>
                    <Stack alignItems="center" direction="row" spacing={1}>
                      <Button
                        size="small"
                        onClick={() => {
                          navigate(`/admin/lesson/edit/${lesson.id}`);
                        }}
                        variant="contained"
                        color="primary"
                      >
                        Chỉnh sửa
                      </Button>
                      <Button
                        onClick={() => deleteLesson(lesson.id)}
                        size="small"
                        variant="contained"
                        color="error"
                      >
                        Xóa
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>

      <TablePagination
        component="div"
        count={paginationData.totalElements}
        onPageChange={(_, page) => {
          handlePagination(page, filterData.size);
        }}
        onRowsPerPageChange={(e) => {
          handlePagination(filterData.page, Number(e.target.value));
        }}
        page={paginationData.pageNumber}
        rowsPerPage={paginationData.pageSize}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};
