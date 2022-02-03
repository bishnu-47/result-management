import { configureStore } from "@reduxjs/toolkit";

import shoppingListReducer from "./shoppingListSlice";
import authSlice from "./authSlice";
import messagesSlice from "./messagesSlice";

export const store = configureStore({
  reducer: {
    shoppingList: shoppingListReducer,
    auth: authSlice,
    messages: messagesSlice,
  },
});
