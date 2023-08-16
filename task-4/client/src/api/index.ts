import axios from "axios";
import { FormDataType } from "../store/auth/auth.types";

const API = axios.create({ baseURL: "https://itransitontask4.onrender.com" });

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

type signInType = {
  (data: FormDataType): Promise<any>;
};
type signUpType = {
  (data: FormDataType): Promise<any>;
};

type getUsersType = {
  (): Promise<any>;
};

export const signIn: signInType = (data) => API.post("/user/signin", data);
export const signUp: signUpType = (data) => API.post("/user/signup", data);

export const getUsers: getUsersType = () => API.get("/users");
export const blockUser = (users: number[]) =>
  API.patch(`/users/block`, { users });

export const unBlockUser = (users: number[]) =>
  API.patch(`/users/unblock`, { users });

export const deleteUser = (users: number[]) =>
  API.delete(`/users/delete`, { data: { users } });
