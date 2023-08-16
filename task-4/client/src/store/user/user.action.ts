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
  (usersIdArray: number[], navigate: any) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: USER_ACTION_TYPES.USER_LOADING_START });

      const { data } = await api.blockUser(usersIdArray);

      dispatch({
        type: USER_ACTION_TYPES.BLOCK_USERS,
        payload: data.updatedUsersId,
      });

      dispatch({ type: USER_ACTION_TYPES.USER_LOADING_END });
    } catch (error: any) {
      console.error(error);
      alert(error?.response?.data?.message);
      navigate("/auth");
    }
  };

export const deleteUsers =
  (usersIdArray: number[], navigate: any) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: USER_ACTION_TYPES.USER_LOADING_START });

      const { data } = await api.deleteUser(usersIdArray);

      dispatch({
        type: USER_ACTION_TYPES.DELETE_USERS,
        payload: data.updatedUsersId,
      });

      dispatch({ type: USER_ACTION_TYPES.USER_LOADING_END });
    } catch (error: any) {
      console.error(error);
      alert(error?.response?.data?.message);
      navigate("/auth");
    }
  };

export const unBlockUser =
  (usersIdArray: number[], navigate: any) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: USER_ACTION_TYPES.USER_LOADING_START });

      const { data } = await api.unBlockUser(usersIdArray);

      dispatch({
        type: USER_ACTION_TYPES.UNBLOCK_USERS,
        payload: data.updatedUsersId,
      });

      dispatch({ type: USER_ACTION_TYPES.USER_LOADING_END });
    } catch (error: any) {
      console.error(error);
      alert(error?.response?.data?.message);
      navigate("/auth");
    }
  };
