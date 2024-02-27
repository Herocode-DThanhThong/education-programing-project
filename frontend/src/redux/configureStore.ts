import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootReducer, { IRootReducer } from "./rootReducer";
import rootSaga from "./rootSaga";

// Redux-Persist
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

// Config for Redux-Persist
const rootPersistConfig = {
  key: "root",
  storage,
  stateReconciler: autoMergeLevel2,
  blacklist: [
    "authReducer",
    "loadingReducer",
    "postReducer",
    "userReducer",
    "notificationReducer",
    "courseReducer",
    "chapterReducer",
    "lessonReducer",
    "chatReducer",
  ],
};

export const authPersistConfig = {
  key: "auth",
  storage,
  stateReconciler: autoMergeLevel2,
  blacklist: ["messageError"],
};

export const userPersistConfig = {
  key: "user",
  storage,
  stateReconciler: autoMergeLevel2,
  blacklist: ["filters", "pagination"],
};

export const postsPersistConfig = {
  key: "posts",
  storage,
  stateReconciler: autoMergeLevel2,
  blacklist: ["allPostsReadyDeleted", "allPostsSearch"],
};

// Store, Persistor and SagaMiddleware creation
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const persistedReducer = persistReducer<IRootReducer>(
  rootPersistConfig,
  rootReducer()
);
// disalbe thunk and add redux-saga middleware
const sagaMiddleware = createSagaMiddleware();

const store: any = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleWare) => {
    return getDefaultMiddleWare({
      thunk: false,
      serializableCheck: false,
    }).concat(sagaMiddleware);
  },
});

// asyncReducers for Plugins Framework (Module Federation)
store.asyncReducers = {};

// injectReducer for Plugins Framework (Module Federation)
// The injectReducer function enable plugin to add reducers into Redux Centralize App
store.injectReducer = (key: any, asyncReducer: any) => {
  store.asyncReducers[key] = asyncReducer;
  store.replaceReducer(rootReducer(store.asyncReducers));
};

const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store, persistor };
