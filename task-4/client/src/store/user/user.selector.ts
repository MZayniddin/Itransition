import { createSelector } from "reselect";
import { RootState } from "../store";

const selectUserReducer = (state: RootState) => state.users;

export const selectUsers = createSelector(
  [selectUserReducer],
  (usersSlice) => usersSlice.users
);

export const selectIsUserLoading = createSelector(
  [selectUserReducer],
  (userSlice) => userSlice.isLoading
);
