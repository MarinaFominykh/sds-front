import { TypedUseSelectorHook, useSelector } from "react-redux";

import { configureStore } from "@reduxjs/toolkit";

import { mainApi } from "./api/api";
import { userAPI } from "./services/userApi";
import { orgAPI } from "./services/orgApi";
import { jobAPI } from "./services/jobsApi";
import { locationAPI } from "./services/locacationApi";
import { devAPI } from "./services/devsApi";
import userSlice from "./reducers/UserSlice";
import modalSlice from "./reducers/ModalSlice";

const store = configureStore({
  reducer: {
    userSlice,
    modalSlice,
    [mainApi.reducerPath]: mainApi.reducer,
    [userAPI.reducerPath]: userAPI.reducer,
    [orgAPI.reducerPath]: orgAPI.reducer,
    [jobAPI.reducerPath]: jobAPI.reducer,
    [locationAPI.reducerPath]: locationAPI.reducer,
    [devAPI.reducerPath]: devAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      mainApi.middleware,
      userAPI.middleware,
      orgAPI.middleware,
      jobAPI.middleware,
      locationAPI.middleware,
      devAPI.middleware,
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
