import { AnyAction } from "redux";
import { USER_AUTH_TYPES } from "./auth.types";
import jwtDecode from "jwt-decode";
import { UserData } from "../user/user.types";

export type AuthState = {
  authData: UserData | null;
};

const INITIAL_STATE_AUTH: AuthState = {
  authData: null,
};

export const authReducer = (state = INITIAL_STATE_AUTH, action: AnyAction) => {
  const { type, payload } = action;

  switch (type) {
    case USER_AUTH_TYPES.AUTH:
      localStorage.setItem("token", payload.token);
      localStorage.setItem("user", payload.user);

      return { ...state, authData: jwtDecode(payload.token) };

    case USER_AUTH_TYPES.LOGOUT:
      localStorage.clear();
      return { ...state, authData: null };
    default:
      return state;
  }
};
