import { createSelector } from "reselect";
import { RootState } from "../store";

import { AuthState } from "./auth.reducer";

const selectAuthReducer = (state: RootState): AuthState => state.auth;

export const selectCurrentUser = createSelector(
  [selectAuthReducer],
  (authSlice) => authSlice.authData
);
