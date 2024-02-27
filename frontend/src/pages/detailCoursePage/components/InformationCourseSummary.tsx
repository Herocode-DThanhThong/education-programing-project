import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import Button from "@mui/material/Button";
import { ChapterType } from "types";
interface Props {
  isRegisterCourse: boolean;
  chapterInCourse: ChapterType[];
  fetchRegisterCourse: () => Promise<void>;
}

const InformationCourseSummary = ({
  isRegisterCourse,
  chapterInCourse,
  fetchRegisterCourse,
}: Props) => {
  const getTotalLesson = () => {
    let total = 0;
    chapterInCourse.forEach((chap) => {
      chap.lessons.forEach((ls) => total++);
    });
    return total;
  };
  return (
    <div className="mt-4">
      <div className="flex justify-center">
        <p className="flex items-center gap-2">
          <WhatshotIcon
            sx={{
              color: "#f43f5e",
            }}
            fontSize="small"
          />
          <span className="text-xl font-semibold text-red-500 tracking-wide">
            Miễn phí
          </span>
        </p>
      </div>

      <div className="flex my-4 justify-center">
        <p className="flex items-center gap-2">
          <AutoStoriesIcon
            sx={{
              color: "#a3a3a3",
              fontSize: "18px",
            }}
          />
          <span className="text-sm font-semibold text-gray-700 tracking-wide">
            {chapterInCourse.length} chương học, {getTotalLesson()} bài học
          </span>
        </p>
      </div>
      <div className="flex my-4 justify-center">
        <p className="flex items-center gap-2">
          <AutoStoriesIcon
            sx={{
              color: "#a3a3a3",
              fontSize: "18px",
            }}
          />
          <span className="text-sm font-semibold text-gray-700 tracking-wide">
            Video bài học, bài tập đa dạng theo từng chương
          </span>
        </p>
      </div>
      <div className="flex justify-center">
        <Button
          disabled={isRegisterCourse}
          onClick={() => fetchRegisterCourse()}
          type="button"
        >
          {isRegisterCourse ? "Bạn đã đăng ký khóa học" : "Đăng ký khóa học"}
        </Button>
      </div>
    </div>
  );
};

export default InformationCourseSummary;
