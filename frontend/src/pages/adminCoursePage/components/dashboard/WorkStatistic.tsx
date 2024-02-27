import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { TotalCourseByUserType } from "types";
import { useMemo } from "react";
type Props = {
  totalCourseByUsers: TotalCourseByUserType[];
};

const WorkStatistic = ({ totalCourseByUsers }: Props) => {
  const data = useMemo(() => {
    return totalCourseByUsers.map((item) => ({
      courseName: item.courseName,
      totalRegister: item.totalUser,
    }));
  }, [totalCourseByUsers]);
  return (
    <div className="w-[20rem] h-[22rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col">
      <strong className="text-gray-700 font-medium">
        Thống kê theo nhu cầu
      </strong>
      <div className="mt-3 w-full flex-1 text-xs">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis hide dataKey="courseName" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              name="Số lượng đăng ký"
              type="monotone"
              dataKey="totalRegister"
              stroke="#8884d8"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WorkStatistic;
