import { PostDetailsType } from '.';
import { UserType } from '.';

export type NotificationStateType = {
  notifications: NotificationType[] | null;
  totalNotificationNotRead: number;
  loadMoreNotify: boolean;
  messageError: string | null;
};

export type NotificationToReceiver = {
  post: PostDetailsType;
  userTo: Pick<UserType, 'id' | 'userName'>;
  userFrom: Pick<UserType, 'id' | 'userName'>;
  typeNotify: 'LIKE' | 'COMMENT' | 'SHARE' | 'NEW_POST';
  storeInDB: boolean;
  action:
    | 'LIKE_POST_ACTION'
    | 'COMMENT_POST_ACTION'
    | 'SHARE_POST_ACTION'
    | 'NEW_POST_ACTION';
};

export type NotificationRequest = {
  content: string;
  userTo: Pick<UserType, 'id' | 'userName'>;
  userFrom: Pick<UserType, 'id' | 'userName'>;
  post: Pick<PostDetailsType, 'id'>;
  notificationType: 'LIKE' | 'COMMENT' | 'SHARE' | 'NEW_POST' | 'NEW_POST';
  delivered: boolean;
  read: boolean;
  storeInDB: boolean;
  action:
    | 'LIKE_POST_ACTION'
    | 'COMMENT_POST_ACTION'
    | 'SHARE_POST_ACTION'
    | 'NEW_POST_ACTION';
};

export type NotificationType = {
  id: string;
  content: string;
  userTo: UserType;
  userFrom: UserType;
  post: PostDetailsType;
  notificationType: 'LIKE' | 'COMMENT' | 'SHARE' | 'NEW_POST' | 'NEW_POST';
  delivered: boolean;
  read: boolean;
  time: string;
};

export type ReadAllNotificationRequestType = {
  userId: string | number;
  notifications: NotificationType[];
};

export type CreateNotifycationSucessType = { create: NotificationType };
