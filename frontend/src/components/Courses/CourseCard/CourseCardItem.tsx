import { NavLink } from "react-router-dom";
import { CourseType } from "types";
import GroupsIcon from "@mui/icons-material/Groups";
interface Props {
  course: CourseType;
}

const CourseCardItem = ({ course }: Props) => {
  return (
    <NavLink to={`/course/${course.id}`}>
      <div className="w-full flex items-center justify-center rounded-md">
        <div className="">
          <div className="group relative transition-all ease-in-out duration-300">
            <img
              src={course.image}
              className="w-full h-full rounded-md"
              alt=""
            />
            <div className="absolute z-[-5] group-hover:z-10 top-0 left-0 right-0 bottom-0 bg-black bg-opacity-30">
              <div className="flex items-center justify-center flex-col w-full h-full">
                <button className="bg-white px-4 py-2 rounded-md text-sm">
                  Xem khóa học
                </button>
              </div>
            </div>
          </div>
          <div className="p-2">
            <h5 className="font-semibold">{course.title}</h5>
            <div className="flex items-center gap-2">
              <GroupsIcon />
              <span>{course.registeredUser.length}</span>
            </div>
          </div>
        </div>
      </div>
    </NavLink>
  );
};

export default CourseCardItem;
