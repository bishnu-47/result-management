import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./authSlice";
import messagesSlice from "./messagesSlice";
import branchSlice from "./branchSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    messages: messagesSlice,
    branch: branchSlice
  },
});
