import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice.js";
import { authApi } from "../features/authApi.js";
import { courseApi } from "@/features/courseApi.js";

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer, // rtk query nije akta reducer dey. setai authApi.reducer
  [courseApi.reducerPath]: courseApi.reducer,

  auth: authReducer,
});

export default rootReducer;
