import { PayloadAction } from '@reduxjs/toolkit';
import axiosClient from 'api/axiosClient';
import { Path } from 'api/paths';
import { AxiosResponse } from 'axios';
import { call, fork, put, select, takeLatest } from 'redux-saga/effects';
import { store } from 'redux/configureStore';
import { NotificationType, ReadAllNotificationRequestType } from 'types';
import { ListResponse } from 'types/CommonType';
import { notificationActions, notifications } from './notificationSlice';
import { idUser } from '../authService/authSlice';

// get all posts
async function getAllNotifications(
  userId: string | number
): Promise<AxiosResponse<ListResponse<NotificationType>>> {
  const accessToken = store.getState().authReducer.accessToken;
  return await axiosClient.get(`${Path.GetAllNotifications}/${userId}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

// get all posts
async function countNotificationsNotRead(
  userId: string | number
): Promise<AxiosResponse<number>> {
  const accessToken = store.getState().authReducer.accessToken;
  return await axiosClient.get(
    `${Path.CountAllNotificationsNotRead}/${userId}`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
}

// load more notifications
async function loadMoreNotification(params: {
  userId: string | number;
  createdTimestampLastNotification: string;
}): Promise<AxiosResponse<ListResponse<NotificationType>>> {
  const accessToken = store.getState().authReducer.accessToken;
  return await axiosClient.get(
    `${Path.LoadMoreNotifications}/${params.userId}?time=${params.createdTimestampLastNotification}`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
}

// create notification
async function createNotification(
  notification: NotificationType
): Promise<AxiosResponse<NotificationType>> {
  const accessToken = store.getState().authReducer.accessToken;
  return await axiosClient.post(`${Path.CreateNotification}`, notification, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

// read all notification
async function readAllNotification(
  notifications: Array<NotificationType>
): Promise<AxiosResponse<string>> {
  const accessToken = store.getState().authReducer.accessToken;
  return await axiosClient.put(
    `${Path.UpdateReadAllNotification}`,
    { notifications },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
}

// delete all notification
async function deleteAllNotification(
  userId: string | number
): Promise<AxiosResponse<string>> {
  const accessToken = store.getState().authReducer.accessToken;
  return await axiosClient.delete(`${Path.DeleteAllNotification}/${userId}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

function* getAllNotificationsSaga(action: PayloadAction<string | number>) {
  try {
    // Get notification with limit element
    const response: AxiosResponse<ListResponse<NotificationType>> = yield call(
      getAllNotifications,
      action.payload
    );

    // Count notifications not read
    const responseNotificationNotRead: AxiosResponse<number> = yield call(
      countNotificationsNotRead,
      action.payload
    );

    if (response.status === 200) {
      yield put(
        notificationActions.getAllNotificationsSuccess(response.data.content)
      );

      // Set total notification not read
      yield put(
        notificationActions.setTotalNotificationNotReadSuccess(
          responseNotificationNotRead.data
        )
      );

      /**
       * Check can still load more notification base on totalElements
       *  */
      yield put(
        notificationActions.setLoadMoreNotification(
          response.data.content.length < response.data.pageable.totalElements
        )
      );
    }
  } catch (error: any) {
    yield put(
      notificationActions.getAllNotificationsFailure(
        error.response.data.message
      )
    );
  }
}

function* loadMoreNotificationSaga(action: PayloadAction<string | number>) {
  // Get current list notification
  const notificationsData: Array<NotificationType> = yield select(
    notifications
  );

  /**
   * Load old notification than last notificaton loaded
   * notificationsData.length !== 0 -> this mean can be loaded new data
   * Get timestamp created of last notification
   * */
  const createdTimestampNotification: string | null =
    notificationsData.length !== 0
      ? notificationsData[notificationsData.length - 1].time
      : null;
  try {
    if (createdTimestampNotification) {
      // Load more notification
      const response: AxiosResponse<ListResponse<NotificationType>> =
        yield call(loadMoreNotification, {
          userId: action.payload,
          createdTimestampLastNotification: createdTimestampNotification,
        });

      // Read notification which load more
      const responseNotification: AxiosResponse<string> = yield call(
        readAllNotification,
        response.data.content
      );

      // Count notifications not read
      const responseNotificationNotRead: AxiosResponse<number> = yield call(
        countNotificationsNotRead,
        action.payload
      );

      if (response.status === 200) {
        // Concat new data to old data
        yield put(
          notificationActions.loadMoreNotificationsSuccess(
            response.data.content
          )
        );

        // Reset total post not read
        yield put(
          notificationActions.setTotalNotificationNotReadSuccess(
            responseNotificationNotRead.data
          )
        );

        // when content === total element => end notification
        // Because in API load by created time, so total element will return total element (all of element has time less than) => totalElemnts will change when loaded and when ===. This mean end of notificaiton
        if (
          response.data.content.length === response.data.pageable.totalElements
        )
          yield put(notificationActions.setLoadMoreNotification(false));
      }
    } else yield put(notificationActions.setLoadMoreNotification(false));
  } catch (error: any) {
    yield put(
      notificationActions.loadMoreNotificationsFailure(
        error.response.data.message
      )
    );
  }
}

function* createNotificationsSaga(action: PayloadAction<NotificationType>) {
  try {
    const response: AxiosResponse<NotificationType> = yield call(
      createNotification,
      action.payload
    );
    if (response.status === 200) {
      yield put(notificationActions.createNotificationSuccess());
    }
  } catch (error: any) {
    yield put(
      notificationActions.createNotificationFailure(error.response.data.message)
    );
  }
}

function* readAllNotificationsSaga(
  action: PayloadAction<ReadAllNotificationRequestType>
) {
  try {
    const response: AxiosResponse<string> = yield call(
      readAllNotification,
      action.payload.notifications
    );
    if (response.status === 200) {
      // Read notifications
      yield put(notificationActions.readAllNotificationSuccess());

      // Update curent notification from un-read -> read
      yield put(
        notificationActions.getAllNotificationsRequest(action.payload.userId)
      );
    }
  } catch (error: any) {
    yield put(
      notificationActions.readAllNotificationFailure(
        error.response.data.message
      )
    );
  }
}

function* deleteAllNotificationsSaga(action: PayloadAction<string | number>) {
  try {
    const response: AxiosResponse<string> = yield call(
      deleteAllNotification,
      action.payload
    );
    if (response.status === 200) {
      yield put(notificationActions.getAllNotificationsRequest(action.payload));
    }
  } catch (error: any) {
    yield put(
      notificationActions.deleteAllNotificationFailure(
        error.response.data.message
      )
    );
  }
}

function* watchPostSaga(): Generator {
  yield takeLatest(
    notificationActions.loadMoreNotificationsRequest.type,
    loadMoreNotificationSaga
  );
  yield takeLatest(
    notificationActions.getAllNotificationsRequest.type,
    getAllNotificationsSaga
  );
  yield takeLatest(
    notificationActions.createNotificationRequest.type,
    createNotificationsSaga
  );
  yield takeLatest(
    notificationActions.readAllNotificationRequest.type,
    readAllNotificationsSaga
  );
  yield takeLatest(
    notificationActions.deleteAllNotificationRequest.type,
    deleteAllNotificationsSaga
  );
}

const notifycationSaga = [fork(watchPostSaga)];
export default notifycationSaga;
