import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

type Props = {
  totalLesson: number;
  currentProgress: number;
};

export default function ProgressLearn({ totalLesson, currentProgress }: Props) {
  return (
    <Box sx={{ width: "90%" }}>
      {totalLesson > 0 ? (
        <Slider
          min={0}
          max={totalLesson}
          value={currentProgress}
          step={1}
          sx={{
            height: 18,
          }}
          marks={[
            {
              value: 0,
              label: "Bắt đầu",
            },
            {
              value: totalLesson,
              label: `Kết thúc`,
            },
          ]}
          valueLabelDisplay="on"
        />
      ) : (
        <p className="text-center p-2 border-dashed border-2 border-sky-500">
          Hiện tại chưa có bài học nào để theo dõi tiến độ
        </p>
      )}
    </Box>
  );
}
