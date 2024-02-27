import { format } from "date-fns";
import { Link } from "react-router-dom";
import { StatisticCourse } from "types";
import _ from "lodash";
import { useMemo } from "react";

const recentOrderData = [
  {
    id: "2",
    courseName: "Lập trình java với springboot",
    totalChapter: 12,
    totalExercise: 123,
    totalLesson: 123,
    createdDate: "2022-05-17T03:24:00",
    status: "DONE",
  },
  {
    id: "3",
    courseName: "Lập trình microservice",
    totalChapter: 12,
    totalExercise: 123,
    totalLesson: 123,
    createdDate: "2022-05-17T03:24:00",
    status: "STARTED",
  },
];

type Props = {
  recentCourse: StatisticCourse[];
};

export default function RecentCourse({ recentCourse }: Props) {
  const recentCourseData = useMemo(() => {
    return _.orderBy(
      recentCourse.map((item) => ({
        id: item.idCourse,
        courseName: item.courseName,
        totalChapter: item.totalChapter,
        totalLesson: item.totalLesson,
        createdDate: item.createdDate,
      })),
      ["createdDate"],
      ["desc"]
    ).splice(0, 5);
  }, [recentCourse]);

  return (
    <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
      <strong className="text-gray-700 font-medium">
        Top 5 khóa học mới nhất
      </strong>
      <div className="border-x border-gray-200 rounded-sm mt-3">
        <table className="w-full text-gray-700">
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên khóa học</th>
              <th>Số lượng chương</th>
              <th>Số lượng bài học</th>
              <th>Ngày tạo</th>
            </tr>
          </thead>
          <tbody>
            {recentCourseData.map((order) => (
              <tr key={order.id}>
                <td>
                  <Link to={`/order/${order.id}`}>{order.id}</Link>
                </td>
                <td>
                  <Link to={`/order/${order.id}`}>{order.courseName}</Link>
                </td>
                <td>
                  <Link to={`/order/${order.id}`}>{order.totalChapter}</Link>
                </td>
                <td>
                  <Link to={`/order/${order.id}`}>{order.totalLesson}</Link>
                </td>
                <td>{format(new Date(order.createdDate), "dd MMM yyyy")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
