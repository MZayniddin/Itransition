import { AnyAction } from "redux";

import { UserData } from "./user.types";
import { USER_ACTION_TYPES } from "./user.types";

export type UserState = {
  readonly users: UserData[] | null;
  readonly isLoading: boolean;
};

const INITIAL_STATE_USERS: UserState = {
  users: [],
  isLoading: false,
};

export const usersReducer = (
  state = INITIAL_STATE_USERS,
  action: AnyAction
) => {
  const { type, payload } = action;
  switch (type) {
    case USER_ACTION_TYPES.USER_LOADING_START:
      return { ...state, isLoading: true };
    case USER_ACTION_TYPES.USER_LOADING_END:
      return { ...state, isLoading: false };
    case USER_ACTION_TYPES.FETCH_ALL_USERS:
      return { ...state, users: payload };
    case USER_ACTION_TYPES.BLOCK_USER:
      return {
        ...state,
        users: state.users?.map((user) => {
          if (user.id === payload) user.status = false;

          return user;
        }),
      };
    case USER_ACTION_TYPES.UNBLOCK_USER:
      return {
        ...state,
        users: state.users?.map((user) => {
          if (user.id === payload) user.status = true;

          return user;
        }),
      };
    case USER_ACTION_TYPES.DELETE_USER:
      return {
        ...state,
        users: state.users?.filter((user) => user.id !== payload),
      };

    default:
      return state;
  }
};
