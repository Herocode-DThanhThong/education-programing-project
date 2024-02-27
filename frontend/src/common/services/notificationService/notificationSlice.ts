import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IRootReducer } from 'redux/rootReducer';
import {
  NotificationRequest,
  NotificationStateType,
  NotificationType,
  ReadAllNotificationRequestType,
} from 'types';

const initialState: NotificationStateType = {
  notifications: null,
  totalNotificationNotRead: 0,
  loadMoreNotify: false,
  messageError: null,
};
const notificationSlice = createSlice({
  name: 'notification',
  initialState: initialState,
  reducers: {
    // Get all notifications
    getAllNotificationsRequest: (
      state,
      _: PayloadAction<string | number>
    ): void => {
      Object.assign(state, {});
    },
    getAllNotificationsSuccess: (
      state,
      action: PayloadAction<NotificationType[]>
    ): void => {
      Object.assign(state, {
        notifications: action.payload,
        messageError: null,
      });
    },
    getAllNotificationsFailure: (
      state,
      action: PayloadAction<string>
    ): void => {
      Object.assign(state, {
        ...state,
        notifications: null,
        messageError: action.payload,
      });
    },

    // Set total notification not read
    setTotalNotificationNotReadSuccess: (
      state,
      action: PayloadAction<number>
    ): void => {
      Object.assign(state, {
        totalNotificationNotRead: action.payload,
        messageError: null,
      });
    },

    // Load more notifications
    loadMoreNotificationsRequest: (
      state,
      _: PayloadAction<string | number>
    ): void => {
      Object.assign(state, {});
    },
    loadMoreNotificationsSuccess: (
      state,
      action: PayloadAction<NotificationType[]>
    ): void => {
      Object.assign(state, {
        notifications: state.notifications?.concat(action.payload),
        messageError: null,
      });
    },
    loadMoreNotificationsFailure: (
      state,
      action: PayloadAction<boolean>
    ): void => {
      Object.assign(state, {
        ...state,
        notifications: null,
        messageError: action.payload,
      });
    },

    // Set loadmore notify
    setLoadMoreNotification: (state, action: PayloadAction<boolean>): void => {
      Object.assign(state, {
        ...state,
        loadMoreNotify: action.payload,
        messageError: null,
      });
    },

    // Create notification
    createNotificationRequest: (
      state,
      _: PayloadAction<NotificationRequest>
    ): void => {
      Object.assign(state, {});
    },

    createNotificationSuccess: (state): void => {
      Object.assign(state, {
        ...state,
        messageError: null,
      });
    },
    createNotificationFailure: (state, action: PayloadAction<string>): void => {
      Object.assign(state, {
        ...state,
        messageError: action.payload,
      });
    },

    // Read all notification
    readAllNotificationRequest: (
      state,
      _: PayloadAction<ReadAllNotificationRequestType>
    ): void => {
      Object.assign(state, {});
    },
    readAllNotificationSuccess: (state): void => {
      Object.assign(state, {
        ...state,
        messageError: null,
      });
    },
    readAllNotificationFailure: (
      state,
      action: PayloadAction<string>
    ): void => {
      Object.assign(state, {
        ...state,
        messageError: action.payload,
      });
    },

    // Clear all notification
    deleteAllNotificationRequest: (
      state,
      _: PayloadAction<string | number>
    ): void => {
      Object.assign(state, {});
    },

    deleteAllNotificationSuccess: (state): void => {
      Object.assign(state, {
        ...state,
        messageError: null,
      });
    },

    deleteAllNotificationFailure: (
      state,
      action: PayloadAction<string>
    ): void => {
      Object.assign(state, {
        ...state,
        messageError: action.payload,
      });
    },
  },
});

export const notificationActions = notificationSlice.actions;
export const totalNotificationNotRead = (state: IRootReducer): number =>
  state.notificationReducer.totalNotificationNotRead;
export const loadMoreNotify = (state: IRootReducer): boolean =>
  state.notificationReducer.loadMoreNotify;
export const notifications = (state: IRootReducer): NotificationType[] | null =>
  state.notificationReducer.notifications;
export const notificationMessageError = (state: IRootReducer): string | null =>
  state.notificationReducer.messageError;

export default notificationSlice.reducer;
