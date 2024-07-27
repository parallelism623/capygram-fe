import { configureStore } from "@reduxjs/toolkit";

import formReducer from "./formSlice";
import userReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    form: formReducer,
    user: userReducer,
  },
});

