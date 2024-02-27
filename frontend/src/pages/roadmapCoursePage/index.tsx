import { useAppDispatch } from "common/hooks";
import Navbar from "components/Courses/Navbar";
import Sidebar from "components/Courses/Sidebar";
import RoadMapList from "./components/RoadMapList";
import { useState, useEffect } from "react";
import { StudyPathType } from "types";
import { loadingActions } from "common/services/loadingService/loadingSlice";
import { AxiosResponse } from "axios";
import { baseService } from "common/services/baseService";
import { Path } from "api/paths";
import { toast } from "react-toastify";
import { useRealTime } from "hooks";

const RoadMapCoursePage = () => {
  const [allRoutePath, setAllRoutePath] = useState<Array<StudyPathType> | null>(
    null
  );
  const dispatch = useAppDispatch();
  const _ = useRealTime();
  useEffect(() => {
    fetchAllRoutePath();
  }, []);

  const fetchAllRoutePath = async () => {
    dispatch(loadingActions.startLoading());
    try {
      const response: AxiosResponse<Array<StudyPathType>> =
        await baseService.GET(Path.GetAllStudyPathsNotPagination);
      setAllRoutePath(response.data);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(loadingActions.endLoading());
    }
  };

  return (
    <div className="w-full h-full pl-[120px]">
      <div className="p-4">
        {allRoutePath && <RoadMapList routePaths={allRoutePath} />}
      </div>
    </div>
  );
};

export default RoadMapCoursePage;
