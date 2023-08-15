export enum USER_AUTH_TYPES {
  AUTH = "AUTH",
  LOGOUT = "LOGOUT",
}

export type FormDataType = {
  displayName?: string;
  email: string;
  password: string;
  confirmPassword?: string;
};

export interface MyToken {
  id: number;
  displayname: string;
  email: string;
  exp: number;
}
