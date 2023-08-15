import { AnyAction } from "redux";
import { USER_AUTH_TYPES } from "./auth.types";
import jwtDecode from "jwt-decode";

export const authReducer = (state = { authData: null }, action: AnyAction) => {
  const { type, payload } = action;

  switch (type) {
    case USER_AUTH_TYPES.AUTH:
      localStorage.setItem("token", payload.token);
      return { ...state, authData: jwtDecode(payload.token) };

    case USER_AUTH_TYPES.LOGOUT:
      localStorage.clear();
      return { ...state, authData: null };
    default:
      return state;
  }
};
