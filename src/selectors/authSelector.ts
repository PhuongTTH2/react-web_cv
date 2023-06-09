import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export const isAuthSelector = createSelector(
  (state: RootState) => state.persistedReducer.account,
  (account) => {
    return account;
  }
);
export const isUserSelector = createSelector(
  (state: RootState) => state.persistedReducer.users,
  (users) => {
    return users;
  }
);

export const isReligion = createSelector(
  (state: RootState) => state.religion,
  (religion) => {
    return religion;
  }
);
