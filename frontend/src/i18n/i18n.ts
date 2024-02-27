import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import USER_PROFILE_EN from 'locales/en/userProfile.json';
import USER_PROFILE_VI from 'locales/vi/userProfile.json';
import CREATE_NEW_POST_EN from 'locales/en/createNewPost.json';
import CREATE_NEW_POST_VI from 'locales/vi/createNewPost.json';
import LEFT_WALL_EN from 'locales/en/leftWall.json';
import LEFT_WALL_VI from 'locales/vi/leftWall.json';
import RIGHT_WALL_EN from 'locales/en/rightWall.json';
import RIGHT_WALL_VI from 'locales/vi/rightWall.json';
import POST_EN from 'locales/en/post.json';
import POST_VI from 'locales/vi/post.json';
import SEARCH_FRIEND_EN from 'locales/en/searchFriend.json';
import SEARCH_FRIEND_VI from 'locales/vi/searchFriend.json';
import AUTH_EN from 'locales/en/auth.json';
import AUTH_VI from 'locales/vi/auth.json';
import NOTIFICATION_EN from 'locales/en/notification.json';
import NOTIFICATION_VI from 'locales/vi/notification.json';
import TRASH_EN from 'locales/en/trash.json';
import TRASH_VI from 'locales/vi/trash.json';
import SNACKBAR_EN from 'locales/en/snackbar.json';
import SNACKBAR_VI from 'locales/vi/snackbar.json';
import CHAT_EN from 'locales/en/chat.json';
import CHAT_VI from 'locales/vi/chat.json';
import FRIEND_EN from 'locales/en/friend.json';
import FRIEND_VI from 'locales/vi/friend.json';

import { LOCALES_NAME } from 'api/paths';

export const locales = {
  en: 'English',
  vi: 'Vietnamese',
};

export const resources = {
  en: {
    userProfile: USER_PROFILE_EN,
    createNewPost: CREATE_NEW_POST_EN,
    leftWall: LEFT_WALL_EN,
    rightWall: RIGHT_WALL_EN,
    post: POST_EN,
    searchFriend: SEARCH_FRIEND_EN,
    auth: AUTH_EN,
    notification: NOTIFICATION_EN,
    trash: TRASH_EN,
    snackbar: SNACKBAR_EN,
    chat: CHAT_EN,
    friend: FRIEND_EN,
  },
  vi: {
    userProfile: USER_PROFILE_VI,
    createNewPost: CREATE_NEW_POST_VI,
    leftWall: LEFT_WALL_VI,
    rightWall: RIGHT_WALL_VI,
    post: POST_VI,
    searchFriend: SEARCH_FRIEND_VI,
    auth: AUTH_VI,
    notification: NOTIFICATION_VI,
    trash: TRASH_VI,
    snackbar: SNACKBAR_VI,
    chat: CHAT_VI,
    friend: FRIEND_VI,
  },
};

export const defaultNS = 'userProfile';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: Boolean(JSON.parse(localStorage.getItem(LOCALES_NAME) as string))
      ? JSON.parse(localStorage.getItem(LOCALES_NAME) as string)
      : 'en',
    ns: [
      'userProfile',
      'createNewPost',
      'leftWall',
      'rightWall',
      'post',
      'searchFriend',
      'notification',
    ],
    defaultNS,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
