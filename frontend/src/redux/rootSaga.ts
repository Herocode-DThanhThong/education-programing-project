// Vendor
import { all } from "redux-saga/effects";

// Src
import authSaga from "common/services/authService/authSaga";
import createAccountSaga from "common/services/createAccountService/createAccountSaga";
import postSaga from "common/services/postService/postSaga";
import settingSaga from "common/services/settingService/setingSaga";
import notifycationSaga from "common/services/notificationService/notificationSaga";
import friendSaga from "common/services/friendService/friendSaga";
import userSaga from "common/services/userService/userSaga";
import courseSaga from "common/services/courseService/courseSaga";
import chapterSaga from "common/services/chapterService/chapterSaga";
import lessonSaga from "common/services/lessonService/lessonSaga";
import studyPathSaga from "common/services/studyPathService/studyPathSaga";
import chatsaga from "common/services/chatService/chatSaga";

export default function* rootSaga() {
  yield all([
    ...userSaga,
    ...authSaga,
    ...postSaga,
    ...settingSaga,
    ...createAccountSaga,
    ...notifycationSaga,
    ...friendSaga,
    ...courseSaga,
    ...chapterSaga,
    ...lessonSaga,
    ...studyPathSaga,
    ...chatsaga,
  ]);
}
