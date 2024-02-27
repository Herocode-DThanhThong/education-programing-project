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
import { Path } from "api/paths";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { baseService } from "common/services/baseService";
import {
  chapterActions,
  chapters,
  filters,
  pagination,
} from "common/services/chapterService/chapterSlice";
import { loadingActions } from "common/services/loadingService/loadingSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const ChapterTable = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const chapterData = useAppSelector(chapters);
  const filterData = useAppSelector(filters);
  const paginationData = useAppSelector(pagination);

  useEffect(() => {
    dispatch(chapterActions.resetFilter());
    dispatch(chapterActions.getAllChapterRequest());
  }, []);

  const handlePagination = (page: number, size: number) => {
    dispatch(
      chapterActions.setFilter({
        ...filterData,
        page,
        size,
      })
    );
    dispatch(chapterActions.getAllChapterRequest());
  };

  const deleteChapter = async (id: string) => {
    if (window.confirm("Bạn chắc chắn muốn xóa chương học này?")) {
      dispatch(loadingActions.startLoading());
      try {
        await baseService.DELETE(`${Path.GetAllChapters}/${id}`);
        dispatch(chapterActions.getAllChapterRequest());
        toast.success("Xóa chương học thành công");
      } catch (error: any) {
        console.log(error);
        toast.error(error.response.data.message);
      } finally {
        dispatch(loadingActions.startLoading());
      }
    }
  };

  return (
    <Card>
      <Box sx={{ minWidth: 800 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Tên chương</TableCell>
              <TableCell>ID khóa học</TableCell>
              <TableCell>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {chapterData?.map((chapter) => {
              return (
                <TableRow hover key={chapter.id}>
                  <TableCell>{chapter.id}</TableCell>
                  <TableCell>{chapter.title}</TableCell>
                  <TableCell>{chapter.course.id}</TableCell>
                  <TableCell>
                    <Stack alignItems="center" direction="row" spacing={1}>
                      <Button
                        size="small"
                        onClick={() => {
                          navigate(`/admin/chapter/edit/${chapter.id}`);
                        }}
                        variant="contained"
                        color="primary"
                      >
                        Chỉnh sửa
                      </Button>
                      <Button
                        onClick={() => deleteChapter(chapter.id)}
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
