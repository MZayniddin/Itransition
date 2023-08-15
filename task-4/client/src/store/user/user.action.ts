import { Dispatch } from "redux";
import { USER_ACTION_TYPES } from "./user.types";
import * as api from "../../api";

export const getUsers = () => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: USER_ACTION_TYPES.USER_LOADING_START });

    const { data } = await api.getUsers();
    dispatch({ type: USER_ACTION_TYPES.FETCH_ALL_USERS, payload: data.users });

    dispatch({ type: USER_ACTION_TYPES.USER_LOADING_END });
  } catch (error) {
    console.error(error);
  }
};

export const blockUser =
  (usersIdArray: number[] | string[], navigate) =>
  async (dispatch: Dispatch) => {
    usersIdArray.map(async (id) => {
      try {
        await api.blockUser(id);
        dispatch({ type: USER_ACTION_TYPES.BLOCK_USER, payload: id });
      } catch (error) {
        console.error(error);
        alert(error.response?.data?.message);
        navigate("/auth");
      }
    });
  };

export const unBlockUsers =
  (usersIdArray: number[] | string[], navigate) =>
  async (dispatch: Dispatch) => {
    usersIdArray.map(async (id) => {
      try {
        await api.unBlockUser(id);
        dispatch({
          type: USER_ACTION_TYPES.UNBLOCK_USER,
          payload: id,
        });
      } catch (error) {
        console.error(error);
        alert(error.response?.data?.message);
        navigate("/auth");
      }
    });
  };

export const deleteUsers =
  (usersIdArray: number[] | string[], navigate) =>
  async (dispatch: Dispatch) => {
    usersIdArray.map(async (id) => {
      try {
        await api.deleteUser(id);
        dispatch({
          type: USER_ACTION_TYPES.DELETE_USER,
          payload: id,
        });
      } catch (error) {
        console.error(error);
        alert(error.response?.data?.message);
        navigate("/auth");
      }
    });
  };
