import axios from "axios";
import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
} from "../Constants/OrderConstant";
import store from "../store";
import { port } from "../../Utils/Util";

export const createOrder = (cartItems, totalPrice) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_ORDER_REQUEST,
    });

    const { auth } = store.getState();
    if (auth.isAuthenticated) {
      const { data } = await axios.post(
        `${port}/order/add-order`,
        {
          totalPrice: totalPrice,
          items: cartItems,
          paymentStatus: "pending",
          paymentType: "cod",
        },
        {
          withCredentials: true,
          credentials: "include",
        }
      );
      dispatch({
        type: CREATE_ORDER_SUCCESS,
        payload: data,
      });
    }
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
