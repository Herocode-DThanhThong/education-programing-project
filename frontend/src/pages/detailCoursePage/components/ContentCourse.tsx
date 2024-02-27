import LockIcon from "@mui/icons-material/Lock";
import { useNavigate } from "react-router-dom";
import { ChapterType } from "types";
import ModeIcon from "@mui/icons-material/Mode";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import YouTubeIcon from "@mui/icons-material/YouTube";
type Props = {
  chapterInCourse: ChapterType[];
  currentProgress: number | null;
};

const ContentCourse = ({ chapterInCourse, currentProgress }: Props) => {
  let number = 0;
  const navigate = useNavigate();

  return (
    <>
      <h1 className="mt-4 text-left font-bold text-xl tracking-wide">
        Nội dung khóa học
      </h1>
      <div>
        {chapterInCourse.map((chapter, _) => (
          <div key={chapter.id}>
            <h1 className="text-left cursor-pointer my-4 p-4 bg-gray-300 rounded-md font-semibold tracking-wider hover:opacity-90">
              {chapter.title}
            </h1>

            {chapter.lessons.length > 0 &&
              chapter.lessons.map((ls, idx) => {
                number++;
                return (
                  <button
                    disabled={!currentProgress || currentProgress < number}
                    onClick={() =>
                      navigate(
                        `/learning/course/${chapter.course.id}?chapterId=${chapter.id}&lessonId=${ls.id}`
                      )
                    }
                    key={ls.id}
                    className={`${
                      !currentProgress || currentProgress < number
                        ? "bg-gray-300 text-gray-400"
                        : "hover:bg-sky-400 hover:text-white"
                    } w-full p-2 py-4 flex justify-between border-b-2 rounded-t-md transition-all ease-in-out duration-300 cursor-pointer`}
                  >
                    <p
                      className="text-left flex items-center gap-2"
                      key={ls.id}
                    >
                      <span>{number}. </span>
                      <span>{ls.title}</span>
                    </p>
                    {(!currentProgress || currentProgress < number) && (
                      <LockIcon fontSize={"small"} />
                    )}
                  </button>
                );
              })}
          </div>
        ))}
      </div>
    </>
  );
};

export default ContentCourse;
