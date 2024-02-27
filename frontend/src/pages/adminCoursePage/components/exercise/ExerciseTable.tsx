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

export const ExerciseTable = () => {
  const items = [
    {
      id: "5e887ac47eed253091be10cb",
      lessonId: 1,
      attachment: "file pdf, simple question....",
    },
    {
      id: "5e887b209c28ac3dd97f6db5",
      lessonId: 1,
      attachment: "file pdf, simple question....",
    },
    {
      id: "5e887b7602bdbc4dbb234b27",
      lessonId: 1,
      attachment: "file pdf, simple question....",
    },
    {
      id: "5e86809283e28b96d2d38537",
      lessonId: 1,
      attachment: "file pdf, simple question....",
    },
    {
      id: "5e86805e2bafd54f66cc95c3",
      lessonId: 1,
      attachment: "file pdf, simple question....",
    },
    {
      id: "5e887a1fbefd7938eea9c981",
      lessonId: 1,
      attachment: "file pdf, simple question....",
    },
    {
      id: "5e887d0b3d090c1b8f162003",
      lessonId: 1,
      attachment: "file pdf, simple question....",
    },
    {
      id: "5e88792be2d4cfb4bf0971d9",
      lessonId: 1,
      attachment: "file pdf, simple question....",
    },
    {
      id: "5e8877da9a65442b11551975",
      lessonId: 1,
      attachment: "file pdf, simple question....",
    },
    {
      id: "5e8680e60cba5019c5ca6fda",
      lessonId: 1,
      attachment: "file pdf, simple question....",
    },
  ];

  return (
    <Card>
      <Box sx={{ minWidth: 800 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Lesson ID</TableCell>
              <TableCell>Attachment</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((customer) => {
              return (
                <TableRow hover key={customer.id}>
                  <TableCell>{customer.id}</TableCell>
                  <TableCell>{customer.lessonId}</TableCell>
                  <TableCell>{customer.attachment}</TableCell>
                  <TableCell>
                    <Stack alignItems="center" direction="row" spacing={1}>
                      <Button variant="contained" color="primary">
                        Chỉnh sửa
                      </Button>
                      <Button variant="contained" color="error">
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
        count={10}
        onPageChange={() => {}}
        onRowsPerPageChange={() => {}}
        page={1}
        rowsPerPage={5}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};
