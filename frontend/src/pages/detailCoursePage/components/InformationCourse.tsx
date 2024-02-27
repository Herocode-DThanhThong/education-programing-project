import { CourseType } from "types";
interface Props {
  courseDetail: CourseType;
}

const InformationCourse = ({ courseDetail }: Props) => {
  return (
    <>
      <h1 className="text-left font-bold text-2xl tracking-wide">
        {courseDetail.title}
      </h1>
      <p className="my-4 text-left  text-gray-600 ">
        Để có cái nhìn tổng quan về khóa học hãy xem những thông tin này nhé.
      </p>
      <h1 className="mt-4 text-left font-bold text-xl tracking-wide">
        Bạn sẽ học được gì?
      </h1>
      <div className="mt-4">
        <div
          className="leading-8"
          dangerouslySetInnerHTML={{ __html: courseDetail.description }}
        />
      </div>
    </>
  );
};

export default InformationCourse;
