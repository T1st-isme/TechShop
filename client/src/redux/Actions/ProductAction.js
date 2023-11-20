import axios from "axios";
import {
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
} from "../Constants/ProductConstant";
import { port } from "../../Utils/Util";

const listProduct =
  (keyword = "", currentPage = 1, resPerPage = 12, price, category, sort) =>
  (dispatch) => {
    dispatch({ type: PRODUCT_LIST_REQUEST });

    return new Promise((resolve, reject) => {
      let link = `/product?resPerPage=${resPerPage}&page=${currentPage}`;
      if (keyword) {
        link = `/product?resPerPage=${resPerPage}&keyword=${keyword}&page=${currentPage}`;
      }
      if (category) {
        link += `&category=${category}`;
      }
      if (price) {
        link += `&price=${price}`;
      }
      if (sort === "price") {
        link += "&sort=price";
      }

      axios
        .get(port + link)
        .then(({ data }) => {
          dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data,
          });
          resolve();
        })
        .catch((error) => {
          dispatch({
            type: PRODUCT_LIST_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
          });
          reject();
        });
    });
  };

const detailProduct = (slug) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(port + `/product/${slug}`);

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

const updateProduct = (slug, product) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_UPDATE_REQUEST });

    const { data } = await axios.put(port + `/product/${slug}`, product, {
      withCredentials: true,
      credentials: "include",
    });
    dispatch({
      type: PRODUCT_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export { listProduct, detailProduct, updateProduct };
