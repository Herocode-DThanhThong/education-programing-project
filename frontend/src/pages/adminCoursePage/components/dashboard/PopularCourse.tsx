import classNames from "classnames";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { TotalCourseByUserType } from "types";
import _ from "lodash";
type Props = {
  totalCourseByUsers: TotalCourseByUserType[];
};

function PopularCourse({ totalCourseByUsers }: Props) {
  const popularProducts = useMemo(() => {
    return _.orderBy(
      totalCourseByUsers.map((item) => ({
        id: item.idCourse,
        courseName: item.courseName,
        courseThumbnail: item.imgeUrl,
        totalRegisteredUser: item.totalUser,
      })),
      ["totalRegisteredUser"],
      ["desc"]
    ).splice(0, 5);
  }, [totalCourseByUsers]);

  return (
    <div className="w-[20rem] bg-white p-4 rounded-sm border border-gray-200">
      <strong className="text-gray-700 font-medium">
        Top 5 khóa học phổ biến nhất
      </strong>
      <div className="mt-4 flex flex-col gap-3">
        {popularProducts.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className="flex items-center hover:no-underline"
          >
            <div className="w-10 h-10 min-w-[2.5rem] bg-gray-200 rounded-sm">
              <img
                className="w-full h-full object-cover rounded-sm"
                src={product.courseThumbnail}
                alt={product.courseName}
              />
            </div>
            <div className="ml-4 flex-1">
              <p className="text-sm text-gray-800">{product.courseName}</p>
              <span
                className={classNames(
                  product.totalRegisteredUser === 0
                    ? "text-red-500"
                    : product.totalRegisteredUser > 50
                    ? "text-green-500"
                    : "text-orange-500",
                  "text-xs font-medium"
                )}
              >
                {product.totalRegisteredUser} lượt đăng ký
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default PopularCourse;
