import { createSlice } from "@reduxjs/toolkit";

const userReligion = createSlice({
  name: "religion",
  initialState: {
    religionID: "",
  },
  reducers: {
    religionID: (state, action) => {
      state.religionID = action.payload;
    },
  },
});
export const { religionID } = userReligion.actions;
export default userReligion.reducer;
