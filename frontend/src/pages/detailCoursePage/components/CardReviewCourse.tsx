import { CourseType } from "types";

type Props = {
  courseDetail: CourseType;
};

const CardReviewCourse = ({ courseDetail }: Props) => {
  return (
    <div className="w-full flex items-center justify-center rounded-md border shadow-lg">
      <div className="">
        <div className="group relative transition-all ease-in-out duration-300">
          <img
            src={courseDetail.image}
            className="w-full h-full rounded-md"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default CardReviewCourse;
