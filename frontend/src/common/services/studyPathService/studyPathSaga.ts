// Vendor
import { AxiosResponse } from "axios";
import { call, fork, put, select, takeLatest } from "redux-saga/effects";

// Src
import { Path } from "api/paths";
import queryString from "query-string";
import { toast } from "react-toastify";
import { ListResponse, QueryParams, StudyPathType } from "types";
import { filters, studyPathActions } from "./studyPathSlice";
import { baseService } from "common/services/baseService";
import { loadingActions } from "common/services/loadingService/loadingSlice";
// get all study paths
async function getAllStudyPaths(
  params: QueryParams
): Promise<AxiosResponse<ListResponse<StudyPathType>>> {
  return baseService.GET(
    `${Path.GetAllStudyPaths}?${queryString.stringify(params, {
      skipNull: true,
    })}`
  );
}

function* getAllStudyPathsSaga() {
  yield put(loadingActions.startLoading());
  try {
    const filterData: QueryParams = yield select(filters);
    const response: AxiosResponse<ListResponse<StudyPathType>> = yield call(
      getAllStudyPaths,
      filterData
    );
    if (response.status === 200) {
      yield put(studyPathActions.getAllStudyPathSuccess(response.data.content));
      yield put(studyPathActions.setPagination(response.data.pageable));
    }
  } catch (error: any) {
    yield put(
      studyPathActions.getAllStudyPathFailure(error.response.data.message)
    );
    toast.error(error.response.data.message);
  }
  yield put(loadingActions.endLoading());
}

function* watchStudyPathSaga(): Generator {
  yield takeLatest(
    studyPathActions.getAllStudyPathRequest.type,
    getAllStudyPathsSaga
  );
}

const studyPathsSaga = [fork(watchStudyPathSaga)];
export default studyPathsSaga;
