// Vendor
import { AxiosResponse } from "axios";
import { call, fork, put, select, takeLatest } from "redux-saga/effects";

// Src
import { Path } from "api/paths";
import queryString from "query-string";
import { CourseType, ListResponse, QueryParams } from "types";
import { baseService } from "../baseService";
import { courseActions, filters } from "./courseSlice";
import { loadingActions } from "../loadingService/loadingSlice";
import { toast } from "react-toastify";
// get all user
async function getAllCourses(
  params: QueryParams
): Promise<AxiosResponse<ListResponse<CourseType>>> {
  return baseService.GET(
    `${Path.GetAllCourses}?${queryString.stringify(params, {
      skipNull: true,
    })}`
  );
}

function* getAllCoursesSaga() {
  yield put(loadingActions.startLoading());
  try {
    const filterData: QueryParams = yield select(filters);
    const response: AxiosResponse<ListResponse<CourseType>> = yield call(
      getAllCourses,
      filterData
    );
    if (response.status === 200) {
      yield put(courseActions.getAllCourseSuccess(response.data.content));
      yield put(courseActions.setPagination(response.data.pageable));
    }
  } catch (error: any) {
    yield put(courseActions.getAllCourseFailure(error.response.data.message));
    toast.error(error.response.data.message);
  } finally {
    yield put(loadingActions.endLoading());
  }
}

function* watchCourseSaga(): Generator {
  yield takeLatest(courseActions.getAllCourseRequest.type, getAllCoursesSaga);
}

const courseSaga = [fork(watchCourseSaga)];
export default courseSaga;
