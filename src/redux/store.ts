import { TypedUseSelectorHook, useSelector } from "react-redux";

import { configureStore } from "@reduxjs/toolkit";

import { mainApi } from "./api/api";
import { userAPI } from "./services/userApi";
import { orgAPI } from "./services/orgApi";
import { jobAPI } from "./services/jobsApi";
import { locationAPI } from "./services/locacationApi";
import { devAPI } from "./services/devsApi";
import { schemeAPI } from "./services/schemeApi";
import { wellApi } from "./services/wellApi";
import userSlice from "./reducers/UserSlice";
import modalSlice from "./reducers/ModalSlice";
import locationSlice from "./reducers/locationSlice";
import devSlice from "./reducers/devSlice";
import wellSlice from "./reducers/wellSlice";
import orgSlise from "./reducers/orgSlise";
import jobSlice from "./reducers/jobSlice";

const store = configureStore({
  reducer: {
    userSlice,
    modalSlice,
    locationSlice,
    devSlice,
    wellSlice,
    orgSlise,
    jobSlice,
    [mainApi.reducerPath]: mainApi.reducer,
    [userAPI.reducerPath]: userAPI.reducer,
    [orgAPI.reducerPath]: orgAPI.reducer,
    [jobAPI.reducerPath]: jobAPI.reducer,
    [locationAPI.reducerPath]: locationAPI.reducer,
    [devAPI.reducerPath]: devAPI.reducer,
    [schemeAPI.reducerPath]: schemeAPI.reducer,
    [wellApi.reducerPath]: wellApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat([
      mainApi.middleware,
      userAPI.middleware,
      orgAPI.middleware,
      jobAPI.middleware,
      locationAPI.middleware,
      devAPI.middleware,
      schemeAPI.middleware,
      wellApi.middleware,
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
