import * as api from "../../api";
import { USER_AUTH_TYPES, FormDataType } from "./auth.types";
import { Dispatch } from "redux";

export const signInUser =
  (formData: FormDataType, navigate) => async (dispatch: Dispatch) => {
    try {
      const { data } = await api.signIn(formData);

      dispatch({ type: USER_AUTH_TYPES.AUTH, payload: data });

      navigate("/");
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message);
    }
  };

export const signUpUser =
  (formData: FormDataType, navigate) => async (dispatch: Dispatch) => {
    try {
      const { data } = await api.signUp(formData);

      dispatch({ type: USER_AUTH_TYPES.AUTH, payload: data });
      navigate("/");
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };
