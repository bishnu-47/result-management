import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  token: localStorage.getItem("token"),
  loading: true,
  isAdmin: null,
  isStudent: null,
  authorized: null,
};

export const adminLogin = createAsyncThunk(
  "admin/login",
  async (admin, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post("/api/auth/admin/login", admin, config);

      return response.data;
    } catch (err) {
      console.log(err);
      if (err.response)
        return thunkAPI.rejectWithValue({ error: err.response.data.msg });
      else return thunkAPI.rejectWithValue({ error: err.message });
    }
  }
);

export const checkAdmin = createAsyncThunk(
  "admin/check-admin",
  async (_, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + thunkAPI.getState().auth.token,
        },
      };

      const response = await axios.get("/api/auth/check-admin", config);
      return response.data;
    } catch (err) {
      if (err.response)
        return thunkAPI.rejectWithValue({ error: err.response.data.msg });
      else return thunkAPI.rejectWithValue({ error: err.message });
    }
  }
);

export const checkStudent = createAsyncThunk(
  "student/check-student",
  async (_, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + thunkAPI.getState().auth.token,
        },
      };

      const response = await axios.get("/api/auth/check-student", config);
      return response.data;
    } catch (err) {
      if (err.response)
        return thunkAPI.rejectWithValue({ error: err.response.data.msg });
      else return thunkAPI.rejectWithValue({ error: err.message });
    }
  }
);

export const studentLogin = createAsyncThunk(
  "student/login",
  async (student, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await axios.post(
        "/api/auth/student/login",
        student,
        config
      );
      return response.data;
    } catch (err) {
      if (err.response)
        return thunkAPI.rejectWithValue({ error: err.response.data.msg });
      else return thunkAPI.rejectWithValue({ error: err.message });
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state, { payload }) {
      localStorage.removeItem("token");

      state.token = null;
      state.authorized = false;
      state.isAdmin = null;
    },
    setIsAdmin(state, { payload }) {
      state.isAdmin = payload;
    },
  },
  extraReducers: (builder) => {
    // admin login
    builder.addCase(adminLogin.pending, (state, { payload }) => {
      state.loading = true;
    });

    builder.addCase(adminLogin.fulfilled, (state, { payload }) => {
      localStorage.setItem("token", payload.token);

      state.token = payload.token;
      state.authorized = true;
      state.loading = false;
      state.isAdmin = true;
    });

    builder.addCase(adminLogin.rejected, (state, { payload }) => {
      localStorage.removeItem("token");

      state.authorized = false;
      state.token = null;
      state.loading = false;
    });

    // student login
    builder.addCase(studentLogin.pending, (state, { payload }) => {
      state.loading = true;
    });

    builder.addCase(studentLogin.fulfilled, (state, { payload }) => {
      localStorage.setItem("token", payload.token);

      state.token = payload.token;
      state.authorized = true;
      state.loading = false;
      state.isStudent = true;
    });

    builder.addCase(studentLogin.rejected, (state, { payload }) => {
      localStorage.removeItem("token");

      state.authorized = false;
      state.token = null;
      state.loading = false;
      state.isStudent = null;
    });

    // checkAdmin
    builder.addCase(checkAdmin.pending, (state, { payload }) => {
      state.loading = true;
    });

    builder.addCase(checkAdmin.fulfilled, (state, { payload }) => {
      state.isAdmin = true;
      state.authorized = true;
      state.loading = false;
    });

    builder.addCase(checkAdmin.rejected, (state, { payload }) => {
      state.isAdmin = false;
      state.loading = false;
    });

    // check Student
    builder.addCase(checkStudent.pending, (state, { payload }) => {
      state.loading = true;
    });

    builder.addCase(checkStudent.fulfilled, (state, { payload }) => {
      state.isStudent = true;
      state.authorized = true;
      state.loading = false;
    });

    builder.addCase(checkStudent.rejected, (state, { payload }) => {
      state.isStudent = null;
      state.loading = false;
    });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
