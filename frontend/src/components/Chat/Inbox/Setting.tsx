import GroupAddIcon from "@mui/icons-material/GroupAdd";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import { useTranslation } from "react-i18next";
interface Props {}

const Setting = (props: Props) => {
  // Hooks
  const { t } = useTranslation("chat");
  return (
    <div className="flex justify-between items-center">
      <h1 className="font-bold text-[18px]">{t("inbox.chats")}</h1>
      <Box>
        <IconButton size="small" aria-label="more-setting">
          <MoreHorizIcon style={{ fontSize: "24px", color: "#475569" }} />
        </IconButton>
        <IconButton size="small" aria-label="create-group">
          <GroupAddIcon style={{ fontSize: "24px", color: "#475569" }} />
        </IconButton>
      </Box>
    </div>
  );
};

export default Setting;
