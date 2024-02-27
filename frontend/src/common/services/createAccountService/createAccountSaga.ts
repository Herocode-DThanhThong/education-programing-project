import { PayloadAction } from "@reduxjs/toolkit";
import axiosClient from "api/axiosClient";
import { Path } from "api/paths";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { call, fork, put, takeLatest } from "redux-saga/effects";
import { store } from "redux/configureStore";
import { CreateUserAccountRequestType, UserType } from "types";
import {
  CreateUserAccountRequestPayloadType,
  createAccountActions,
} from "./createAccountSlice";

async function CreateUserAccount(
  body: CreateUserAccountRequestType
): Promise<AxiosResponse<UserType>> {
  const accessToken = store.getState().authReducer.accessToken;
  return await axiosClient.post(Path.SignUp, body, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

function* CreateUserAccountSaga(
  action: PayloadAction<CreateUserAccountRequestPayloadType>
) {
  const { createData, navigate } = action.payload;
  try {
    const response: AxiosResponse<UserType> = yield call(
      CreateUserAccount,
      createData
    );
    if (response.status === 200) {
      yield put(createAccountActions.createSuccess({ create: response.data }));

      // Navigate to login
      navigate("/login");

      // Notify success
      toast.success("Đăng ký thành công");
    }
  } catch (error: any) {
    yield put(createAccountActions.createFailure(error.response.data.message));
  }
}

function* watchSettingSaga(): Generator {
  yield takeLatest(
    createAccountActions.createRequest.type,
    CreateUserAccountSaga
  );
}

const createAccountSaga = [fork(watchSettingSaga)];
export default createAccountSaga;
