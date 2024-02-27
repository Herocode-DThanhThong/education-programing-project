// Vendor
import { AxiosResponse } from "axios";
import { call, fork, put, select, takeLatest } from "redux-saga/effects";

// Src
import { Path } from "api/paths";
import queryString from "query-string";
import { toast } from "react-toastify";
import { ListResponse, QueryParams, UserType } from "types";
import { baseService } from "../baseService";
import { loadingActions } from "../loadingService/loadingSlice";
import { filters, userActions } from "./userSlice";

async function getAllUser(
  params: QueryParams
): Promise<AxiosResponse<ListResponse<UserType>>> {
  return await baseService.GET(
    `${Path.GetAllUser}?${queryString.stringify(params, { skipNull: true })}`
  );
}

function* getAllUserSaga() {
  yield put(loadingActions.startLoading());
  try {
    const filterData: QueryParams = yield select(filters);
    const response: AxiosResponse<ListResponse<UserType>> = yield call(
      getAllUser,
      filterData
    );
    if (response.status === 200) {
      yield put(userActions.getAllUserSuccess(response.data.content));
      yield put(userActions.setPagination(response.data.pageable));
    }
  } catch (error: any) {
    yield put(userActions.getAllUserFailure(error.response.data.message));
    toast.error(error.response.data.message);
  }
  yield put(loadingActions.endLoading());
}
function* watchAuthSaga(): Generator {
  yield takeLatest(userActions.getAllUserRequest.type, getAllUserSaga);
}

const authSaga = [fork(watchAuthSaga)];
export default authSaga;
