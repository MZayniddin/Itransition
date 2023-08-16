export enum USER_ACTION_TYPES {
  USER_LOADING_START = "users/USER_LOADING_START",
  USER_LOADING_END = "users/USER_LOADING_END",
  FETCH_ALL_USERS = "users/FETCH_ALL_USERS",
  UNBLOCK_USERS = "users/UNBLOCK_USERS",
  DELETE_USERS = "users/DELETE_USERS",
  BLOCK_USERS = "users/BLOCK_USERS",
}

export type UserData = {
  id: string;
  displayname: string;
  email: string;
  last_login: string;
  created_at: string;
  status: boolean;
};
