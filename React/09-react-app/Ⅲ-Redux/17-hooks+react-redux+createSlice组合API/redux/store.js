import { configureStore } from "@reduxjs/toolkit";
import count from "./slices/count";
import person from "./slices/person";
// 在此直接整合 reducer
export default configureStore({
  reducer: {
    count,
    person,
  },
});
