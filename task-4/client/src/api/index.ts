import axios from "axios";
import { FormDataType } from "../store/auth/auth.types";

const API = axios.create({ baseURL: "http://localhost:3000" });

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
export const blockUser = (id: number | string) =>
  API.patch(`/users/block/${id}`);
export const unBlockUser = (id: number | string) =>
  API.patch(`/users/unblock/${id}`);
export const deleteUser = (id: number | string) =>
  API.delete(`/users/delete/${id}`);
