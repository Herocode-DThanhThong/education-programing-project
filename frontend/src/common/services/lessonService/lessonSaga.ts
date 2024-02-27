// Vendor
import { AxiosResponse } from "axios";
import { call, fork, put, select, takeLatest } from "redux-saga/effects";

// Src
import { Path } from "api/paths";
import queryString from "query-string";
import { toast } from "react-toastify";
import { LessonType, ListResponse, QueryParams } from "types";
import { baseService } from "../baseService";
import { loadingActions } from "../loadingService/loadingSlice";
import { filters, lessonActions } from "./lessonSlice";
// get all user
async function getAllLessons(
  params: QueryParams
): Promise<AxiosResponse<ListResponse<LessonType>>> {
  return baseService.GET(
    `${Path.GetAllLessons}?${queryString.stringify(params, {
      skipNull: true,
    })}`
  );
}

function* getAllLessonsSaga() {
  yield put(loadingActions.startLoading());
  try {
    const filterData: QueryParams = yield select(filters);
    const response: AxiosResponse<ListResponse<LessonType>> = yield call(
      getAllLessons,
      filterData
    );
    if (response.status === 200) {
      yield put(lessonActions.getAllLessonSuccess(response.data.content));
      yield put(lessonActions.setPagination(response.data.pageable));
    }
  } catch (error: any) {
    yield put(lessonActions.getAllLessonFailure(error.response.data.message));
    toast.error(error.response.data.message);
  }
  yield put(loadingActions.endLoading());
}

function* watchLessonSaga(): Generator {
  yield takeLatest(lessonActions.getAllLessonRequest.type, getAllLessonsSaga);
}

const lessonSaga = [fork(watchLessonSaga)];
export default lessonSaga;
