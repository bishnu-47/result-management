import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./authSlice";
import messagesSlice from "./messagesSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    messages: messagesSlice,
  },
});
