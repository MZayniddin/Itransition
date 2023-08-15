export enum USER_ACTION_TYPES {
  USER_LOADING_START = "users/USER_LOADING_START",
  USER_LOADING_END = "users/USER_LOADING_END",
  FETCH_ALL_USERS = "users/FETCH_ALL_USERS",
  UNBLOCK_USER = "users/UNBLOCK_USER",
  DELETE_USER = "users/DELETE_USER",
  BLOCK_USER = "users/BLOCK_USER",
}

export type UserData = {
  id: string;
  displayname: string;
  email: string;
  last_login: string;
  created_at: string;
  status: boolean;
};
