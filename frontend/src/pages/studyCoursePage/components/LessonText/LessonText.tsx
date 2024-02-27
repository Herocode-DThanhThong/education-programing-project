import Button from "@mui/material/Button";
import { ChapterType, LessonType } from "types";
type Props = {
  currentProgress: number;
  currentLessonLearn: number;
  lessonDetail: LessonType;
  courseId: string;
  chapters: ChapterType[];
  fetchUpdateProgressLearn: (params: {
    courseId: string;
    currentNumberLesson: number;
    done: boolean;
  }) => Promise<void>;
};

const LessonText = ({
  chapters,
  currentProgress,
  currentLessonLearn,
  lessonDetail,
  courseId,
  fetchUpdateProgressLearn,
}: Props) => {
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
  const handleNextLesson = () => {
    if (
      currentLessonLearn === currentProgress &&
      getCurrentNumberLessonLearning(lessonDetail.id) === currentLessonLearn
    ) {
      fetchUpdateProgressLearn({
        courseId,
        currentNumberLesson: currentProgress + 1,
        done: false,
      });
    }
  };

  return (
    <div className="w-full p-4">
      <h1 className="text-center font-semibold text-2xl mb-2">
        Bài học lý thuyết
      </h1>
      <div
        className="leading-8"
        dangerouslySetInnerHTML={{ __html: lessonDetail.content }}
      />
      <Button
        sx={{
          mt: 2,
        }}
        size="small"
        onClick={handleNextLesson}
        type="button"
        variant="contained"
      >
        Mở khóa bài học tiếp theo
      </Button>
    </div>
  );
};

export default LessonText;
