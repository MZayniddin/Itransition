import { createSelector } from "reselect";
import { RootState } from "../store";

const selectAuthReducer = (state: RootState) => state.auth;

export const selectCurrentUser = createSelector(
  [selectAuthReducer],
  (authSlice) => authSlice.authData
);
