import LockIcon from "@mui/icons-material/Lock";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ChapterType, LessonType } from "types";

type Props = {
  courseId: string;
  lessonId: string;
  chapters: ChapterType[];
  currentProgress: number | null;
  changeLesson: (lesson: LessonType) => void;
  setCurrentLessonLearning: (num: number) => void;
};

const ChapterBar = ({
  chapters,
  currentProgress,
  courseId,
  lessonId,
  changeLesson,
  setCurrentLessonLearning,
}: Props) => {
  let number = 0;
  const navigate = useNavigate();
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    // Scroll button to in to view
    if (buttonRef.current) {
      if (buttonRef.current.id === lessonId) {
        buttonRef.current.scrollIntoView({
          behavior: "smooth",
          block: "end",
          inline: "nearest",
        });
      }
    }

    // Set current lesson learning
    let num = 1;
    chapters.forEach((chap) => {
      chap.lessons.forEach((less) => {
        if (less.id === lessonId) setCurrentLessonLearning(num);
        num++;
      });
    });
  }, []);

  const getCurrentNumberLessonLearning = (lessonId: string) => {
    let number = 1;
    let result = 1;
    chapters.forEach((chap) => {
      chap.lessons.forEach((less) => {
        if (less.id === lessonId) result = number;
        number++;
      });
    });
    return result;
  };
  return (
    <div className="scrollbar scrollbar-none overflow-auto scrollbar-track-gray-100 fixed top-[64px] right-0 bottom-0 bg-white shadow-md w-[400px]">
      {chapters.map((chapter, _) => (
        <div key={chapter.id}>
          <h1 className="border border-gray-400 text-left p-4 bg-gray-200 font-semibold tracking-wider">
            {chapter.title}
          </h1>

          {chapter.lessons.map((ls) => {
            number++;
            return (
              <button
                disabled={!currentProgress || currentProgress < number}
                id={ls.id}
                ref={buttonRef}
                onClick={() => {
                  changeLesson(ls);
                  setCurrentLessonLearning(
                    getCurrentNumberLessonLearning(ls.id)
                  );
                  navigate(
                    `/learning/course/${courseId}?chapterId=${chapter.id}&lessonId=${ls.id}`
                  );
                }}
                key={ls.id}
                className={`${
                  !currentProgress || currentProgress < number
                    ? "bg-gray-300 text-gray-500"
                    : ls.id === lessonId
                    ? "bg-blue-500 text-white"
                    : ""
                } w-full text-sm tracking-wide p-2 py-4 flex justify-between border-b-2 transition-all ease-in-out duration-300`}
              >
                <p className="text-left">
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
  );
};

export default ChapterBar;
