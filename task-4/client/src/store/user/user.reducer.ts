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
    case USER_ACTION_TYPES.UNBLOCK_USERS:
      return {
        ...state,
        users: state.users?.map((user) => {
          if (payload.includes(user.id)) user.status = true;

          return user;
        }),
      };
    case USER_ACTION_TYPES.BLOCK_USERS:
      return {
        ...state,
        users: state.users?.map((user) => {
          if (payload.includes(user.id)) user.status = false;

          return user;
        }),
      };
    case USER_ACTION_TYPES.DELETE_USERS:
      return {
        ...state,
        users: state.users?.filter((user) => !payload.includes(user.id)),
      };

    default:
      return state;
  }
};
