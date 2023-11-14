import axios from "axios";

import {
  NEW_CATRGORY_REQUEST,
  NEW_CATRGORY_SUCCESS,
  NEW_CATRGORY_FAIL,
  ALL_CATEGORY_REQUEST,
  ALL_CATEGORY_SUCCESS,
  ALL_CATEGORY_FAIL,
  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAIL,
  CLEAR_ERRORS,
} from "../Constants/CategoryConstants";
import { port } from "../../Utils/Util";

export const newCategory = (formData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_CATRGORY_REQUEST });

    const { data } = await axios.post(
      `${port}/category/create-category`,
      formData
    );
    dispatch({
      type: NEW_CATRGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_CATRGORY_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getCategory = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_CATEGORY_REQUEST });

    const { data } = await axios.get(`${port}/category`);

    dispatch({
      type: ALL_CATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_CATEGORY_FAIL,
      payload: error,
    });
  }
};

// Delete CATEGORY (Admin)
export const delCategory = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_CATEGORY_REQUEST });

    const { data } = await axios.delete(`${port}/category/${id}`);

    dispatch({
      type: DELETE_CATEGORY_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_CATEGORY_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
