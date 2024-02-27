// Vendor
import { AxiosResponse } from "axios";
import { call, fork, put, select, takeLatest } from "redux-saga/effects";

// Src
import { Path } from "api/paths";
import queryString from "query-string";
import { toast } from "react-toastify";
import { ListResponse, QueryParams } from "types";
import { ChapterType } from "types";
import { baseService } from "../baseService";
import { loadingActions } from "../loadingService/loadingSlice";
import { chapterActions, filters } from "./chapterSlice";
// get all user
async function getAllChapters(
  params: QueryParams
): Promise<AxiosResponse<ListResponse<ChapterType>>> {
  return baseService.GET(
    `${Path.GetAllChapters}?${queryString.stringify(params, {
      skipNull: true,
    })}`
  );
}

function* getAllChaptersSaga() {
  yield put(loadingActions.startLoading());
  try {
    const filterData: QueryParams = yield select(filters);
    const response: AxiosResponse<ListResponse<ChapterType>> = yield call(
      getAllChapters,
      filterData
    );
    if (response.status === 200) {
      yield put(chapterActions.getAllChapterSuccess(response.data.content));
      yield put(chapterActions.setPagination(response.data.pageable));
    }
  } catch (error: any) {
    yield put(chapterActions.getAllChapterFailure(error.response.data.message));
    toast.error(error.response.data.message);
  }
  yield put(loadingActions.endLoading());
}

function* watchChapterSaga(): Generator {
  yield takeLatest(
    chapterActions.getAllChapterRequest.type,
    getAllChaptersSaga
  );
}

const chapterSaga = [fork(watchChapterSaga)];
export default chapterSaga;
