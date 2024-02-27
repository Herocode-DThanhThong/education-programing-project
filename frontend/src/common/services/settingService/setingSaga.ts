import { PayloadAction } from "@reduxjs/toolkit";
import axiosClient from "api/axiosClient";
import { Path } from "api/paths";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { call, fork, put, takeLatest } from "redux-saga/effects";
import { store } from "redux/configureStore";
import { UpdatePasswordRequestType, UpdateUserRequestType } from "types";
import { UserType } from "types";
import { settingActions } from "./settingSlice";

async function getUserDetail(
  userId: string | number
): Promise<AxiosResponse<UserType>> {
  const accessToken = store.getState().authReducer.accessToken;
  return await axiosClient.get(`${Path.GetDetailUser}/${userId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

async function updateUserProfile(
  body: UpdateUserRequestType
): Promise<AxiosResponse<UserType>> {
  const accessToken = store.getState().authReducer.accessToken;
  return await axiosClient.put(Path.UpdateUserProfile, body, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

async function updateUserPassword(
  body: UpdatePasswordRequestType
): Promise<AxiosResponse<UserType>> {
  const accessToken = store.getState().authReducer.accessToken;
  return await axiosClient.put(Path.UpdateUserPassword, body, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

function* getUserDetailSaga(action: PayloadAction<string | number>) {
  try {
    const response: AxiosResponse<UserType> = yield call(
      getUserDetail,
      action.payload
    );
    if (response.status === 200) {
      yield put(settingActions.getUserDetailSuccess(response.data));
    }
  } catch (error: any) {
    yield put(settingActions.getUserDetailFailure(error.response.data.message));
  }
}

function* updateUserProfileSaga(action: PayloadAction<UpdateUserRequestType>) {
  try {
    const response: AxiosResponse<UserType> = yield call(
      updateUserProfile,
      action.payload
    );
    if (response.status === 200) {
      yield put(settingActions.updateUserSuccess(response.data));
      toast.success("Cập nhật thông tin thành công");
    }
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
}

function* updateUserPasswordSaga(
  action: PayloadAction<UpdatePasswordRequestType>
) {
  try {
    const response: AxiosResponse<UserType> = yield call(
      updateUserPassword,
      action.payload
    );
    if (response.status === 200) {
      yield put(settingActions.updatePasswordSuccess(response.data));

      toast.success("Đổi mật khẩu thành công");
    }
  } catch (error: any) {
    // Notify error
    toast.error(error.response.data.message);
    yield put(
      settingActions.updatePasswordFailure(error.response.data.message)
    );
  }
}

function* watchSettingSaga(): Generator {
  yield takeLatest(settingActions.getUserDetailRequest.type, getUserDetailSaga);
  yield takeLatest(
    settingActions.updateUserRequest.type,
    updateUserProfileSaga
  );
  yield takeLatest(
    settingActions.updatePasswordRequest.type,
    updateUserPasswordSaga
  );
}

const settingSaga = [fork(watchSettingSaga)];
export default settingSaga;
