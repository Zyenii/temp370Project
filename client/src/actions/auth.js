// import { AUTH } from '../constants/actionTypes';
import * as api from '../api';

let AUTH = "AUTH"
export const signin = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data });

    router('/Home');
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });
    router('/');
  } catch (error) {
    console.log(error);
  }
}