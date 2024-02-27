import { useAppDispatch } from "common/hooks";
import OverviewStatistic from "./OverviewStatistic";
import PopularCourse from "./PopularCourse";
import RecentCourse from "./RecentCourse";
import UserRegisterCourseChart from "./UserRegisterCourseChart";
import WorkStatistic from "./WorkStatistic";
import { loadingActions } from "common/services/loadingService/loadingSlice";
import { toast } from "react-toastify";
import { AxiosResponse } from "axios";
import { useState } from "react";
import { Path } from "api/paths";
import { baseService } from "common/services/baseService";
import { useEffect } from "react";
import { StatisticCourse, TotalCourseByUserType } from "types";
type Props = {};

const AdminDashboard = (props: Props) => {
  const dispatch = useAppDispatch();
  const [overviewStatistic, setOverviewStatistic] = useState({
    totalCourse: 0,
    totalPost: 0,
    totalStudyRoute: 0,
    totalUser: 0,
  });
  const [totalCourseByUsers, setTotalCourseByUsers] = useState<
    TotalCourseByUserType[]
  >([]);
  const [recentCourse, setRecentCourse] = useState<StatisticCourse[]>([]);

  useEffect(() => {
    fetchOverviewStatistic();
    fetchCourseRegisterByUser();
    fetchRecentCourse();
  }, []);

  const fetchOverviewStatistic = () => {
    getTotalCourse();
    getTotalPost();
    getTotalUser();
    getTotalStudyPath();
  };

  const fetchRecentCourse = async () => {
    dispatch(loadingActions.startLoading());
    try {
      const response: AxiosResponse<Array<StatisticCourse>> =
        await baseService.GET(`${Path.StatisticCourse}`);
      setRecentCourse(response.data);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(loadingActions.endLoading());
    }
  };
  const fetchCourseRegisterByUser = async () => {
    dispatch(loadingActions.startLoading());
    try {
      const response: AxiosResponse<Array<TotalCourseByUserType>> =
        await baseService.GET(`${Path.GetTotalCourseByUser}`);
      setTotalCourseByUsers(response.data);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(loadingActions.endLoading());
    }
  };
  const getTotalCourse = async () => {
    dispatch(loadingActions.startLoading());
    try {
      const response: AxiosResponse<number> = await baseService.GET(
        `${Path.GetTotalCourse}`
      );
      setOverviewStatistic((prev) => ({ ...prev, totalCourse: response.data }));
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(loadingActions.endLoading());
    }
  };
  const getTotalPost = async () => {
    dispatch(loadingActions.startLoading());
    try {
      const response: AxiosResponse<number> = await baseService.GET(
        `${Path.GetTotalPosts}`
      );
      setOverviewStatistic((prev) => ({ ...prev, totalPost: response.data }));
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(loadingActions.endLoading());
    }
  };
  const getTotalUser = async () => {
    dispatch(loadingActions.startLoading());
    try {
      const response: AxiosResponse<number> = await baseService.GET(
        `${Path.GetTotalUser}`
      );
      setOverviewStatistic((prev) => ({ ...prev, totalUser: response.data }));
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(loadingActions.endLoading());
    }
  };
  const getTotalStudyPath = async () => {
    dispatch(loadingActions.startLoading());
    try {
      const response: AxiosResponse<number> = await baseService.GET(
        `${Path.GetTotalStudyPaths}`
      );
      setOverviewStatistic((prev) => ({
        ...prev,
        totalStudyRoute: response.data,
      }));
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(loadingActions.endLoading());
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <OverviewStatistic overviewStatistic={overviewStatistic} />
      <div className="flex flex-row gap-4 w-full">
        <UserRegisterCourseChart totalCourseByUsers={totalCourseByUsers} />
        <WorkStatistic totalCourseByUsers={totalCourseByUsers} />
      </div>
      <div className="flex flex-row gap-4 w-full">
        <RecentCourse recentCourse={recentCourse} />
        <PopularCourse totalCourseByUsers={totalCourseByUsers} />
      </div>
    </div>
  );
};

export default AdminDashboard;
