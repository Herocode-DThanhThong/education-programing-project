import { Button } from "@mui/material";
import { useEffect } from "react";
import { ChapterType, LessonType } from "types";
import _ from "lodash";
import { useState } from "react";
import { toast } from "react-toastify";
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

const LessonExercise = ({
  chapters,
  currentProgress,
  currentLessonLearn,
  lessonDetail,
  courseId,
  fetchUpdateProgressLearn,
}: Props) => {
  const [answers, setAnswers] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [resultAnswers, setResultAnswers] = useState<string[]>([]);

  useEffect(() => {
    const dummyDataAns: string[] = [];
    for (let index = 0; index < lessonDetail.totalQuestion; index++) {
      dummyDataAns.push(_.uniqueId("ans-"));
    }
    setAnswers(dummyDataAns);

    const result: string[] = [];
    for (let index = 0; index < lessonDetail.answerKeys.length; index++) {
      result.push(lessonDetail.answerKeys[index]);
    }
    setResultAnswers(result);
    setIsSubmitted(false);
  }, [lessonDetail]);

  const checkDisabledSubmitBtn = () => {
    // check fill all data
    let result = false;
    answers.forEach((ans) => {
      if (ans.includes("ans-")) result = true;
    });
    if (result) return result;
    // check disable when submmited
    return isSubmitted;
  };
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

  const resetAns = () => {
    const result: string[] = [];
    for (let index = 0; index < lessonDetail.totalQuestion; index++) {
      result.push(_.uniqueId("ans-"));
    }
    setAnswers(result);
    setIsSubmitted(false);
  };

  const onChangeAns = (index: number, key: string) => {
    setAnswers((prev) => prev.map((ans, idx) => (idx === index ? key : ans)));
  };

  const isTheSameAnsWithResultAns = () => {
    let userAns = "";
    answers.forEach((ans) => {
      userAns += ans;
    });
    return userAns === lessonDetail.answerKeys;
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    if (isTheSameAnsWithResultAns()) {
      toast.success("Bạn đã vượt qua bài tập");
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
    } else {
      toast.error("Bạn chưa vượt qua được bài tập");
    }
  };

  return (
    <div className="w-full p-4">
      <h1 className="text-center font-semibold text-2xl mb-2 sticky top-0">
        Bài tập kiểm tra
      </h1>
      <div className="grid grid-cols-3 gap-2">
        <div className="col-span-2">
          <div
            className="leading-8"
            dangerouslySetInnerHTML={{ __html: lessonDetail.content }}
          />
        </div>
        <div className="col-span-1 sticky top-0">
          <div className="max-h-[400px] overflow-auto shadow-md w-full">
            <h3 className="text-center py-2 sticky top-0 border border-gray-400 bg-white">
              Bảng đáp án
            </h3>
            {answers.map((ans, idx) => (
              <div
                key={idx}
                className={`${
                  resultAnswers[idx] !== ans && isSubmitted
                    ? "border-red-500 border-2"
                    : "border-gray-400"
                } flex items-center gap-2 border px-2`}
              >
                <div className="">{idx + 1}.</div>
                <div className="w-full grid grid-cols-4 px-8 gap-4 py-2">
                  <button
                    disabled={isSubmitted}
                    onClick={() => onChangeAns(idx, "A")}
                    className={`${
                      ans === "A" ? "bg-blue-500 text-white" : ""
                    } py-2 border rounded-full border-gray-300`}
                  >
                    A
                  </button>
                  <button
                    disabled={isSubmitted}
                    onClick={() => onChangeAns(idx, "B")}
                    className={`${
                      ans === "B" ? "bg-blue-500 text-white" : ""
                    } py-2 border rounded-full border-gray-300`}
                  >
                    B
                  </button>
                  <button
                    disabled={isSubmitted}
                    onClick={() => onChangeAns(idx, "C")}
                    className={`${
                      ans === "C" ? "bg-blue-500 text-white" : ""
                    } py-2 border rounded-full border-gray-300`}
                  >
                    C
                  </button>
                  <button
                    disabled={isSubmitted}
                    onClick={() => onChangeAns(idx, "D")}
                    className={`${
                      ans === "D" ? "bg-blue-500 text-white" : ""
                    } py-2 border rounded-full border-gray-300`}
                  >
                    D
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <Button
              size="small"
              disabled={checkDisabledSubmitBtn()}
              onClick={handleSubmit}
              fullWidth
              type="button"
              variant="contained"
            >
              Nộp bài
            </Button>
            <Button
              sx={{
                mt: 2,
              }}
              onClick={resetAns}
              size="small"
              disabled={!isSubmitted}
              fullWidth
              type="button"
              variant="contained"
            >
              Làm lại
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonExercise;
