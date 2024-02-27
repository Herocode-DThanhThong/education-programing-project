import { IoBagHandle, IoCart, IoPeople, IoPieChart } from "react-icons/io5";

type Props = {
  overviewStatistic: {
    totalCourse: number;
    totalPost: number;
    totalStudyRoute: number;
    totalUser: number;
  };
};
export default function OverviewStatistic({ overviewStatistic }: Props) {
  return (
    <div className="flex gap-4">
      <div className="bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center">
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-500">
          <IoBagHandle className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-light">
            Số lượng khóa học
          </span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-semibold">
              {overviewStatistic.totalCourse}
            </strong>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center">
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-orange-600">
          <IoPieChart className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-light">
            Số lượng bài viết
          </span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-semibold">
              {overviewStatistic.totalPost}
            </strong>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center">
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-green-600">
          <IoCart className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-light">
            Số lượng lộ trình
          </span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-semibold">
              {overviewStatistic.totalStudyRoute}
            </strong>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center">
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-yellow-400">
          <IoPeople className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-light">
            Số lượng người đăng ký
          </span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-semibold">
              {overviewStatistic.totalUser}
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
}
