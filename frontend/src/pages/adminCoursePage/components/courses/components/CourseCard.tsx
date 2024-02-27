import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Box, Card, Divider, Stack, SvgIcon, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import { vi } from "constants/localeTime";
import { useNavigate } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";
import { CourseType } from "types";
type Props = {
  course: CourseType;
  onDelete: (id: string | number) => Promise<void>;
};

const CourseCard = ({ course, onDelete }: Props) => {
  // Hooks
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <CardMedia
        sx={{ height: 200 }}
        image={course.image}
        title="green iguana"
      />
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        spacing={2}
        sx={{ p: 2 }}
      >
        {/* Time updated */}
        <Stack alignItems="center" direction="row" spacing={1}>
          <SvgIcon color="action" fontSize="small">
            <AccessTimeIcon />
          </SvgIcon>
          <Typography color="text.secondary" display="inline" variant="body2">
            <ReactTimeAgo
              date={Date.parse(course.updatedDate)}
              locale={vi}
              timeStyle="round-minute"
            />
          </Typography>
        </Stack>

        {/* Action */}
        <Stack alignItems="center" direction="row" spacing={1}>
          <Button
            size="small"
            onClick={() => {
              navigate(`/admin/courses/edit/${course.id}`);
            }}
            variant="contained"
            color="primary"
          >
            Chỉnh sửa
          </Button>
          <Button
            onClick={() => onDelete(course.id)}
            size="small"
            variant="contained"
            color="error"
          >
            Xóa
          </Button>
        </Stack>
      </Stack>
    </Card>
  );
};

export default CourseCard;
