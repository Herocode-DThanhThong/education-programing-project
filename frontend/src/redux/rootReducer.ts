// Vendor
import { combineReducers, Reducer } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import { PersistPartial } from "redux-persist/lib/persistReducer";

// Reducers
import authReducer from "common/services/authService/authSlice";
import chatReducer from "common/services/chatService/chatSlice";
import commonReducer, {
  CommonStateTypes,
} from "common/services/commonService/commonSlice";
import createAccountReducer from "common/services/createAccountService/createAccountSlice";
import friendReducer from "common/services/friendService/friendSlice";
import loadingReducer from "common/services/loadingService/loadingSlice";
import notificationReducer from "common/services/notificationService/notificationSlice";
import postReducer from "common/services/postService/postSlice";
import settingReducer from "common/services/settingService/settingSlice";
import userReducer from "common/services/userService/userSlice";
import courseReducer from "common/services/courseService/courseSlice";
import chapterReducer from "common/services/chapterService/chapterSlice";
import lessonReducer from "common/services/lessonService/lessonSlice";
import studyPathReducer from "common/services/studyPathService/studyPathSlice";

// Types
import { LoadingStateTypes } from "common/services/loadingService/loadingSlice";
import {
  AuthStateTypes,
  CourseStateTypes,
  CreateUserAccountStateType,
  LessonStateTypes,
  PostStateTypes,
  SettingStateType,
  StudyPathStateTypes,
  UserStateTypes,
} from "types";

// Src
import { FriendStateTypes, NotificationStateType } from "types";
import { ChatStateType } from "types/ChatType";
import {
  authPersistConfig,
  postsPersistConfig,
  userPersistConfig,
} from "./configureStore";
import { ChapterStateTypes } from "types/ChapterType";

export interface IRootReducer {
  authReducer: AuthStateTypes & PersistPartial;
  postReducer: PostStateTypes;
  settingReducer: SettingStateType;
  createAccountReducer: CreateUserAccountStateType;
  loadingReducer: LoadingStateTypes;
  commonReducer: CommonStateTypes;
  notificationReducer: NotificationStateType;
  friendReducer: FriendStateTypes;
  chatReducer: ChatStateType;
  userReducer: UserStateTypes;
  courseReducer: CourseStateTypes;
  chapterReducer: ChapterStateTypes;
  lessonReducer: LessonStateTypes;
  studyPathReducer: StudyPathStateTypes;
}

const rootReducer = (asyncReducers = {}): Reducer =>
  combineReducers({
    authReducer: persistReducer(authPersistConfig, authReducer as any),
    postReducer: persistReducer(postsPersistConfig, postReducer as any),
    settingReducer: settingReducer,
    createAccountReducer: createAccountReducer,
    loadingReducer: loadingReducer,
    commonReducer: commonReducer,
    notificationReducer: notificationReducer,
    friendReducer: friendReducer,
    chatReducer: chatReducer,
    userReducer: persistReducer(userPersistConfig, userReducer as any),
    ...asyncReducers,
    courseReducer: courseReducer,
    chapterReducer: chapterReducer,
    lessonReducer: lessonReducer,
    studyPathReducer: studyPathReducer,
  });

export default rootReducer;
