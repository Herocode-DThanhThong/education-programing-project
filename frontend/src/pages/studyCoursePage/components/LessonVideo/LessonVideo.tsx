import YouTube from "react-youtube";
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

const LessonVideo = ({
  chapters,
  currentProgress,
  currentLessonLearn,
  courseId,
  lessonDetail,
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
  return (
    <div className="w-full p-2">
      <YouTube
        iframeClassName={"rounded-md"}
        opts={{ height: "600", width: "100%" }}
        videoId={lessonDetail.videoId}
        onEnd={() => {
          if (
            currentLessonLearn === currentProgress &&
            getCurrentNumberLessonLearning(lessonDetail.id) ===
              currentLessonLearn
          ) {
            fetchUpdateProgressLearn({
              courseId,
              currentNumberLesson: currentProgress + 1,
              done: false,
            });
          }
        }}
      />
      {lessonDetail.content && (
        <div className="mt-4">
          <div
            className="leading-8"
            dangerouslySetInnerHTML={{ __html: lessonDetail.content }}
          />
        </div>
      )}
    </div>
  );
};

export default LessonVideo;
