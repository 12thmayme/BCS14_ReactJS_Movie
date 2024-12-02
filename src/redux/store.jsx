import { configureStore } from "@reduxjs/toolkit";
import { numberReducer } from "./numberReducer";
import registerAdminReducer from "./registerAdminReducer";

export const store = configureStore({
  reducer: {
    numberReducer: numberReducer,
    registerAdminReducer: registerAdminReducer,
  },
});
