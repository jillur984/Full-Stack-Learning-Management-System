import { configureStore } from "@reduxjs/toolkit";

import rootReducer from "./rootReducer.js";
import { authApi } from "@/features/authApi.js";
import { courseApi } from "@/features/courseApi.js";

export const appStore = configureStore({
  reducer: rootReducer,

  middleware: (defaultMiddleware) =>
    defaultMiddleware().concat(authApi.middleware, courseApi.middleware),
});

const initializeApp = async () => {
  await appStore.dispatch(
    authApi.endpoints.loadUser.initiate({}, { forceRefetch: true })
  );
};
initializeApp();
