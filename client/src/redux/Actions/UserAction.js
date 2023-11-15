import axios from "axios";
import Cookies from "js-cookie";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_USER_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  CLEAR_ERRORS,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOAD_USER_REQUEST,
} from "../Constants/UserConstant";

import { RESET_CART } from "../Constants/CartConstant";
import { port } from "../../Utils/Util";
import { getCartItems } from "./CartAction";

// new update signup action
export const signup = (user) => {
  return async (dispatch) => {
    try {
      dispatch({ type: REGISTER_USER_REQUEST });
      const res = await axios.post(`${port}/user/signup`, user);
      if (res.status === 201) {
        dispatch({ type: REGISTER_USER_SUCCESS });
        const { token, user } = res.data;
        Cookies.set("token", token);
        Cookies.set("user", JSON.stringify(user));
        dispatch({
          type: LOGIN_SUCCESS,
          payload: {
            token,
            user,
          },
        });
      } else {
        const { error } = res.data;
        dispatch({ type: REGISTER_USER_FAIL, payload: { error } });
      }
    } catch (error) {
      const { data } = error.response;
      dispatch({
        type: REGISTER_USER_FAIL,
        payload: { error: data.error },
      });
    }
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    const res = await axios.post(
      `${port}/user/login`,
      {
        email,
        password,
      },
      { credentials: "include" }
    );

    if (res.status === 200) {
      const { token, user } = res.data;
      Cookies.set("token", token);
      Cookies.set("user", JSON.stringify(user));
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          token,
          user,
        },
      });
      dispatch(getCartItems());
    } else if (res.status === 400) {
      dispatch({
        type: LOGIN_FAIL,
        payload: { error: res.data.error },
      });
    }
  };
};

export const isUserLoggedIn = () => {
  return async (dispatch) => {
    const token = Cookies.get("token");
    if (token) {
      dispatch({ type: LOAD_USER_REQUEST });
      try {
        const { data } = await axios.get(`${port}/user/me`, {
          withCredentials: true,
        });
        dispatch({
          type: LOAD_USER_SUCCESS,
          payload: {
            token,
            user: data.user,
          },
        });
        dispatch(getCartItems());
      } catch (error) {
        console.log(error);
        dispatch({
          type: LOAD_USER_FAIL,
          payload: { error: error.response.data.error },
        });
      }
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOGOUT_REQUEST });
      const res = await axios.get(
        `${port}/user/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        Cookies.remove("token");
        Cookies.remove("user");
        dispatch({ type: LOGOUT_SUCCESS });
        dispatch({ type: RESET_CART });
      }

      //const res = await axios.post(`/admin/signout`);
      // if(res.status === 200){
    } catch (e) {
      dispatch({
        type: LOGOUT_FAIL,
        payload: { error: e.message },
      });
    }
  };
};

// Clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
