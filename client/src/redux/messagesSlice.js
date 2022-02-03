import { createSlice } from "@reduxjs/toolkit";
import { adminLogin, loginUser } from "./authSlice";

const initialState = {
  error: null,
  info: null,
  warning: null,
  success: null,
};

export const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    // success
    addSuccessMsg(state, { payload }) {
      state.success = payload;
    },

    // error
    addErrorMsg(state, { payload }) {
      state.error = payload;
    },

    // info
    addInfoMsg(state, { payload }) {
      state.info = payload;
    },

    // warning
    addWarningMsg(state, { payload }) {
      state.warning = payload;
    },

    removeAllMsg(state) {
      state.info = null;
      state.error = null;
      state.warning = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    // auth actions
    // admin
    builder.addCase(adminLogin.fulfilled, (state, { payload }) => {
      state.success = payload.msg;
    });

    builder.addCase(adminLogin.rejected, (state, { payload }) => {
      state.error = payload.error;
    });

    // TODO: student
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      state.error = payload.msg;
    });

    builder.addCase(loginUser.rejected, (state, { payload }) => {
      state.error = payload.error;
    });
  },
});

export const {
  addErrorMsg,
  addInfoMsg,
  addWarningMsg,
  addSuccessMsg,
  removeAllMsg,
} = messagesSlice.actions;

export default messagesSlice.reducer;
