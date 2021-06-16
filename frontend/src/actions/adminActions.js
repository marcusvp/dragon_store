import axios from "axios";
import {
  ADD_ITEM_FAIL,
  ADD_ITEM_REQUEST,
  ADD_ITEM_SUCCESS,
  ITEM_LIST_ADMIN_FAIL,
  ITEM_LIST_ADMIN_REQUEST,
  ITEM_LIST_ADMIN_SUCCESS,
  ORDER_LIST_ADMIN_FAIL,
  ORDER_LIST_ADMIN_REQUEST,
  ORDER_LIST_ADMIN_SUCCESS,
  REMOVE_ITEM_FAIL,
  REMOVE_ITEM_REQUEST,
  REMOVE_ITEM_SUCCESS,
  SALE_LIST_FAIL,
  SALE_LIST_REQUEST,
  SALE_LIST_SUCCESS,
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

export const getSalesAdmin = () => async (dispatch, getState) => {
  dispatch({ type: SALE_LIST_REQUEST });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await axios.get("/api/sales", {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: SALE_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SALE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addItemAdmin =
  (name, category, brand, description, price, stock, image) =>
  async (dispatch, getState) => {
    dispatch({ type: ADD_ITEM_REQUEST });
    try {
      const {
        userSignin: { userInfo },
      } = getState();
      const { data } = await axios.post(
        "/api/items",
        {
          name,
          category,
          brand,
          description,
          price,
          countInStock: stock,
          image,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: ADD_ITEM_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ADD_ITEM_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteItemAdmin = (id) => async (dispatch, getState) => {
  dispatch({ type: REMOVE_ITEM_REQUEST });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    await axios.delete(`/api/items/${id}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: REMOVE_ITEM_SUCCESS });
  } catch (error) {
    dispatch({
      type: REMOVE_ITEM_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
