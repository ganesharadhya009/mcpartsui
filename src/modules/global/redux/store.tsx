import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import loginSlice from "./login/loginSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import PersistEnum from "../constants/enums";
import forgotPasswordSlice from "./login/forgotPasswordSlice";

/**
 * Global redux store configuration with persist which stores the data to local storage.
 */

const persistConfig = {
  key: PersistEnum.root,
  storage,
  whiteList: [PersistEnum.login,],
};

const rootReducer = combineReducers({
  auth: loginSlice,
  forgotPassword: forgotPasswordSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
