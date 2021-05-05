import axios from "axios";
import {
  ITEM_LIST_ADMIN_FAIL,
  ITEM_LIST_ADMIN_REQUEST,
  ITEM_LIST_ADMIN_SUCCESS,
  ORDER_LIST_ADMIN_FAIL,
  ORDER_LIST_ADMIN_REQUEST,
  ORDER_LIST_ADMIN_SUCCESS,
} from "../constants/adminConstants";
import {
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
} from "../constants/adminConstants";

export const getItemsAdmin = () => async (dispatch, getState) => {
  dispatch({ type: ITEM_LIST_ADMIN_REQUEST });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await axios.get("/api/items", {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: ITEM_LIST_ADMIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ITEM_LIST_ADMIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getOrdersAdmin = () => async (dispatch, getState) => {
  dispatch({ type: ORDER_LIST_ADMIN_REQUEST });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await axios.get("/api/orders/admin", {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: ORDER_LIST_ADMIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_ADMIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUsersAdmin = () => async (dispatch, getState) => {
  dispatch({ type: USER_LIST_REQUEST });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await axios.get("/api/users", {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: USER_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
