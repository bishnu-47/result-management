import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchList = createAsyncThunk(
  "list/fetchList",
  async (_, thunkAPI) => {
    const { auth } = thunkAPI.getState();

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      };

      const response = await axios.get("/api/items", config);
      return response.data;
    } catch (err) {
      if (err.response)
        return thunkAPI.rejectWithValue({ error: err.response.data.msg });
      else return thunkAPI.rejectWithValue({ error: err.message });
    }
  }
);

export const addItem = createAsyncThunk(
  "list/addItem",
  async (name, thunkAPI) => {
    const { auth } = thunkAPI.getState();

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      };

      const response = await axios.post(
        "/api/items",
        {
          name,
        },
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

export const removeItem = createAsyncThunk(
  "list/removeItem",
  async ({ id }, thunkAPI) => {
    const { auth } = thunkAPI.getState();

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      };

      const response = await axios.delete(`/api/items/${id}`, config);
      return response.data;
    } catch (err) {
      if (err.response)
        return thunkAPI.rejectWithValue({ error: err.response.data.msg });
      else return thunkAPI.rejectWithValue({ error: err.message });
    }
  }
);

const initialState = {
  list: [],
  loading: true,
};

export const shoppingListSlice = createSlice({
  name: "shoppingList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetch list
    builder.addCase(fetchList.fulfilled, (state, { payload }) => {
      state.list = payload;
      state.loading = false;
    });

    // add Item
    builder.addCase(addItem.fulfilled, (state, { payload }) => {
      state.list = [payload, ...state.list];
    });

    // remove Item
    builder.addCase(removeItem.fulfilled, (state, action) => {
      state.list = state.list.filter((item) => item._id !== action.payload._id);
    });
  },
});

export default shoppingListSlice.reducer;
