// Vendor
import { AxiosResponse } from "axios";
import { call, fork, put, select, takeLatest } from "redux-saga/effects";

// Src
import { PayloadAction } from "@reduxjs/toolkit";
import { Path } from "api/paths";
import { toast } from "react-toastify";
import { Conversation, Message, MessageRequest } from "types/ChatType";
import { baseService } from "../baseService";
import { loadingActions } from "../loadingService/loadingSlice";
import { chatActions, currentConversation } from "./chatSlice";
// get all user
async function getDetailConversation(params: {
  userIdOne: number;
  userIdTwo: number;
}): Promise<AxiosResponse<Conversation>> {
  return baseService.GET(
    `${Path.GetAllConversation}/${params.userIdOne}/${params.userIdTwo}`
  );
}

async function sendMessage(
  params: MessageRequest
): Promise<AxiosResponse<Message>> {
  return baseService.POST(`${Path.Chat}`, params);
}

async function getDetailConversationById(
  conversationId: string
): Promise<AxiosResponse<Conversation>> {
  return baseService.GET(`${Path.GetAllConversation}/${conversationId}`);
}

function* getDetailConversationSaga(
  action: PayloadAction<{ userIdOne: number; userIdTwo: number }>
) {
  yield put(loadingActions.startLoading());
  try {
    const response: AxiosResponse<Conversation> = yield call(
      getDetailConversation,
      action.payload
    );
    if (response.status === 200) {
      yield put(chatActions.getDetailConversationSuccess(response.data));
    }
  } catch (error: any) {
    yield put(
      chatActions.getDetailConversationFailure(error.response.data.message)
    );
    toast.error(error.response.data.message);
  } finally {
    yield put(loadingActions.endLoading());
  }
}

function* getDetailConversationByIdSaga(action: PayloadAction<string>) {
  try {
    const response: AxiosResponse<Conversation> = yield call(
      getDetailConversationById,
      action.payload
    );
    if (response.status === 200) {
      yield put(chatActions.getDetailConversationSuccess(response.data));
    }
  } catch (error: any) {
    yield put(
      chatActions.getDetailConversationByIdFailure(error.response.data.message)
    );
    toast.error(error.response.data.message);
  }
}

function* sendMessageSaga(
  action: PayloadAction<{
    messageRequest: MessageRequest;
    sendMessageToReceiver: () => void;
  }>
) {
  try {
    const response: AxiosResponse<Message> = yield call(
      sendMessage,
      action.payload.messageRequest
    );
    if (response.status === 200) {
      yield put(
        chatActions.getDetailConversationByIdRequest(
          action.payload.messageRequest.conversation.id
        )
      );
      action.payload.sendMessageToReceiver();
    }
  } catch (error: any) {
    yield put(chatActions.sendMessageFailure(error.response.data.message));
    toast.error(error.response.data.message);
  }
}

function* refreshConversationSaga(action: PayloadAction<string | undefined>) {
  try {
    const currentConversationData: Conversation | null = yield select(
      currentConversation
    );
    if (action.payload) {
      if (currentConversationData?.id === action.payload) {
        yield put(chatActions.getDetailConversationByIdRequest(action.payload));
      }
    }
  } catch (error: any) {
    yield put(
      chatActions.getDetailConversationByIdFailure(error.response.data.message)
    );
    toast.error(error.response.data.message);
  }
}

function* watchChatSaga(): Generator {
  yield takeLatest(
    chatActions.getDetailConversationRequest.type,
    getDetailConversationSaga
  );
  yield takeLatest(
    chatActions.getDetailConversationByIdRequest.type,
    getDetailConversationByIdSaga
  );
  yield takeLatest(chatActions.sendMessageRequest.type, sendMessageSaga);
  yield takeLatest(
    chatActions.refreshConversation.type,
    refreshConversationSaga
  );
}

const chatSaga = [fork(watchChatSaga)];
export default chatSaga;
