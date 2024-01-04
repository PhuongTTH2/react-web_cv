import { createSlice } from "@reduxjs/toolkit";

const userTest = createSlice({
  name: "Test",
  initialState: {
    TestID: "",
  },
  reducers: {
    TestID: (state, action) => {
      state.TestID = action.payload;
    },
  },
});
export const { TestID } = userTest.actions;
export default userTest.reducer;
