import axios from "axios";
import {
  ITEM_DETAILS_FAIL,
  ITEM_DETAILS_REQUEST,
  ITEM_DETAILS_RESET,
  ITEM_DETAILS_SUCCESS,
  ITEM_LIST_FAIL,
  ITEM_LIST_REQUEST,
  ITEM_LIST_SUCCESS,
  ITEM_SEARCH_FAIL,
  ITEM_SEARCH_REQUEST,
  ITEM_SEARCH_SUCCESS,
  ITEM_UPDATE_FAIL,
  ITEM_UPDATE_REQUEST,
  ITEM_UPDATE_SUCCESS,
} from "../constants/itemConstants";

export const listItems = () => async (dispatch) => {
  dispatch({
    type: ITEM_LIST_REQUEST,
  });
  try {
    const { data } = await axios.get("/api/items");
    dispatch({ type: ITEM_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ITEM_LIST_FAIL, payload: error.message });
  }
};

export const detailsItem = (itemId) => async (dispatch) => {
  dispatch({ type: ITEM_DETAILS_REQUEST, payload: itemId });
  try {
    const { data } = await axios.get(`/api/items/${itemId}`);
    dispatch({ type: ITEM_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ITEM_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const searchItems = (query) => async (dispatch, getState) => {
  dispatch({ type: ITEM_SEARCH_REQUEST, payload: query });
  try {
    const { data } = await axios.post(`/api/item/search`, { query: query });
    dispatch({ type: ITEM_SEARCH_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ITEM_SEARCH_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateItem =
  (itemId, name, image, category, brand, description, price, stock) =>
  async (dispatch, getState) => {
    dispatch({ type: ITEM_UPDATE_REQUEST });
    try {
      const {
        userSignin: { userInfo },
      } = getState();
      await axios.put(
        `/api/items/${itemId}`,
        {
          itemId,
          name,
          image,
          category,
          brand,
          description,
          price,
          stock,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: ITEM_DETAILS_RESET });
      dispatch({ type: ITEM_UPDATE_SUCCESS });
    } catch (error) {
      dispatch({
        type: ITEM_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
