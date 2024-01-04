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

export const isTest = createSelector(
  (state: RootState) => state.Test,
  (Test) => {
    return Test;
  }
);
