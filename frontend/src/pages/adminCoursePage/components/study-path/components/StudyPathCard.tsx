import AccessTimeIcon from "@mui/icons-material/AccessTime";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import { vi } from "constants/localeTime";
import { useNavigate } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";
import { StudyPathType } from "types";
type Props = {
  studyPath: StudyPathType;
  onDelete: (id: string | number) => Promise<void>;
};

const StudyPathCard = ({ studyPath, onDelete }: Props) => {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <CardContent>
        <Typography gutterBottom variant="h6">
          {studyPath.title}
        </Typography>
        <div
          className="leading-8"
          dangerouslySetInnerHTML={{ __html: studyPath.description }}
        />
      </CardContent>
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
              date={Date.parse(studyPath.updatedDate)}
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
              navigate(`/admin/study-path/edit/${studyPath.id}`);
            }}
            variant="contained"
            color="primary"
          >
            Chỉnh sửa
          </Button>
          <Button
            onClick={() => onDelete(studyPath.id)}
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

export default StudyPathCard;
