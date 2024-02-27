// Vendor
import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { call, fork, put, takeLatest } from "redux-saga/effects";

// Src
import axiosClient from "api/axiosClient";
import { Path } from "api/paths";
import { LoginRequestType, LoginSuccessType } from "types";
import { authActions } from "./authSlice";

// login
async function login(
  body: LoginRequestType
): Promise<AxiosResponse<LoginSuccessType>> {
  return await axiosClient.post(Path.Login, body);
}

function* loginSaga(action: PayloadAction<LoginRequestType>) {
  try {
    const response: AxiosResponse<LoginSuccessType> = yield call(
      login,
      action.payload
    );
    if (response.status === 200) {
      localStorage.setItem("accessToken", response.data.accessToken);
      yield put(
        authActions.loginSuccess({
          id: response.data.id,
          userName: response.data.userName,
          accessToken: response.data.accessToken,
          authorities: response.data.authorities,
        })
      );
    }
  } catch (error: any) {
    yield put(authActions.loginFailure(error.response.data.message));
  }
}

function* watchAuthSaga(): Generator {
  yield takeLatest(authActions.loginRequest.type, loginSaga);
}

const authSaga = [fork(watchAuthSaga)];
export default authSaga;
