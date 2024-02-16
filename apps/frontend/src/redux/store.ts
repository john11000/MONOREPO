import { AppState, AuthSession } from "@/models";
import {
  configureStore,
  combineReducers,
  Reducer,
  AnyAction,
} from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import authSlice from "./slices/auth.slice";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistStore,
} from "redux-persist";
import appSlice from "./slices/app.slice";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

const createNoopStorage = () => {
  return {
    getItem(_key: any) {
      return Promise.resolve(null);
    },
    setItem(_key: any, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: any) {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

export interface AppStore {
  authState: AuthSession;
  appState: AppState;
}

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["authState", "appState"],
};

const appReducer = combineReducers({
  authState: authSlice,
  appState: appSlice,
});

export type RootState = ReturnType<typeof appReducer>;

const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
  if (action.type === "auth/resetCredentials") {
    state = {} as RootState;
  }
  return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([thunk]),
  devTools: process.env.NODE_ENV !== "production",
});

const persistor = persistStore(store);

export { store, persistor };
