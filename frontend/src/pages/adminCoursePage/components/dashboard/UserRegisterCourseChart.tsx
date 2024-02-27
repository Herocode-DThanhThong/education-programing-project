import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
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
export default function UserRegisterCourseChart({ totalCourseByUsers }: Props) {
  const data = useMemo(() => {
    return totalCourseByUsers.map((item) => ({
      courseName: item.courseName,
      totalRegister: item.totalUser,
    }));
  }, [totalCourseByUsers]);

  return (
    <div className="h-[22rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col flex-1">
      <strong className="text-gray-700 font-medium">
        Số lượt đăng ký theo khóa học
      </strong>
      <div className="mt-3 w-full flex-1 text-xs">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 20,
              right: 10,
              left: -10,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3 0 0" vertical={false} />
            <XAxis hide dataKey="courseName" />
            <YAxis />
            <Tooltip />

            <Legend />

            <Bar
              name="Số lượng đăng ký"
              dataKey="totalRegister"
              fill="#0ea5e9"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
