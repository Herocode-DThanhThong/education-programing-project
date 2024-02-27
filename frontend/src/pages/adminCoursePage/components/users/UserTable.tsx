import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import {
  Box,
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { Path } from "api/paths";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { baseService } from "common/services/baseService";
import { loadingActions } from "common/services/loadingService/loadingSlice";
import {
  filters,
  pagination,
  userActions,
  users,
} from "common/services/userService/userSlice";
import { checkAdminRole } from "pages/adminCoursePage/lib/helpers";
import { useEffect } from "react";
import { toast } from "react-toastify";
export const UserTable = () => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector(users);
  const filterData = useAppSelector(filters);
  const paginationData = useAppSelector(pagination);

  useEffect(() => {
    dispatch(userActions.resetFilter());
    dispatch(userActions.getAllUserRequest());
  }, []);

  const handlePagination = (page: number, size: number) => {
    dispatch(
      userActions.setFilter({
        ...filterData,
        page,
        size,
      })
    );
    dispatch(userActions.getAllUserRequest());
  };

  const blockUser = async (id: string | number) => {
    if (window.confirm("Bạn chắc chắn muốn khóa người dùng này?")) {
      dispatch(loadingActions.startLoading());
      try {
        await baseService.PUT(`${Path.BlockUser}/${id}`, {});
        dispatch(userActions.getAllUserRequest());
        toast.success("Khóa người dùng thành công");
      } catch (error: any) {
        console.log(error);
        toast.error(error.response.data.message);
      } finally {
        dispatch(loadingActions.endLoading());
      }
    }
  };

  const unblockUser = async (id: string | number) => {
    if (window.confirm("Bạn chắc chắn muốn mở khóa người dùng này?")) {
      dispatch(loadingActions.startLoading());
      try {
        await baseService.PUT(`${Path.UnBlockUser}/${id}`, {});
        dispatch(userActions.getAllUserRequest());
        toast.success("Mở khóa người dùng thành công");
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
              <TableCell>ID</TableCell>
              <TableCell>Tên đăng nhập</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Họ</TableCell>
              <TableCell>Tên</TableCell>
              <TableCell>Vai trò</TableCell>
              <TableCell>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userData?.map((u) => {
              return (
                <TableRow hover key={u.id}>
                  <TableCell>{u.id}</TableCell>
                  <TableCell>{u.userName}</TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell>{u.firstName}</TableCell>
                  <TableCell>{u.lastName}</TableCell>
                  <TableCell>
                    {u.authorities.map((item) => item.name)}
                  </TableCell>
                  <TableCell>
                    {checkAdminRole(u.authorities) ? (
                      <div className="flex gap-2">
                        <Button
                          size="small"
                          disabled
                          variant="outlined"
                          color="error"
                          startIcon={<LockIcon />}
                        >
                          khóa
                        </Button>
                        <Button
                          size="small"
                          disabled
                          variant="outlined"
                          color="error"
                          startIcon={<LockOpenIcon />}
                        >
                          Bỏ khóa
                        </Button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <Button
                          disabled={!u.activated}
                          size="small"
                          onClick={() => blockUser(u.id)}
                          variant="outlined"
                          color="error"
                          startIcon={<LockIcon />}
                        >
                          khóa
                        </Button>
                        <Button
                          disabled={u.activated}
                          size="small"
                          onClick={() => unblockUser(u.id)}
                          variant="outlined"
                          color="primary"
                          startIcon={<LockOpenIcon />}
                        >
                          bỏ khóa
                        </Button>
                      </div>
                    )}
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
