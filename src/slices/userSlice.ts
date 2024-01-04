import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClients from "api/rest/axiosClients";
import { authHeaderAndAccount } from "api/rest/header";
import apiGets from "api/rest/apiGets";
export const getAccountScopes = createAsyncThunk(
  "auth/getAccountScopes",
  async (account: any) => {
    const data: any = await axiosClients.get(apiGets.getAccount, {
      headers: authHeaderAndAccount(),
    });

    if (data.status === 403 || data.status === 400) {
      localStorage.clear();
      window.location.href = "/";
    }
    return data.data;
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: {},
  },
  reducers: {
    updateAccount: (state, action) => {
      state.users = action.payload;
    },
    removeAccount: (state) => {
      state.users = {};
    },
  },
  extraReducers: {
    [getAccountScopes.fulfilled as any]: (state, action) => {
      state.users = action.payload;
    },
  },
});
export const { updateAccount, removeAccount } = userSlice.actions;
export default userSlice.reducer;
