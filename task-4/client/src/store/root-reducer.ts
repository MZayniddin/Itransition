import { combineReducers } from "redux";

import { authReducer } from "./auth/auth.reducer";
import { usersReducer } from "./user/user.reducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
});
