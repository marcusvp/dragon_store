import axios from "axios";
import {
  CART_ADD_BATCH_FAIL,
  CART_ADD_BATCH_REQUEST,
  CART_ADD_BATCH_SUCCESS,
  CART_ADD_ITEM_FAIL,
  CART_ADD_ITEM_REQUEST,
  CART_ADD_ITEM_SUCCESS,
  CART_FETCH_FAIL,
  CART_FETCH_REQUEST,
  CART_FETCH_SUCCESS,
  CART_REMOVE_ITEM_FAIL,
  CART_REMOVE_ITEM_REQUEST,
  CART_REMOVE_ITEM_SUCCESS,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS_FAIL,
  CART_SAVE_SHIPPING_ADDRESS_REQUEST,
  CART_SAVE_SHIPPING_ADDRESS_SUCCESS,
  CART_FETCH_ADDRESS_FAIL,
  CART_FETCH_ADDRESS_REQUEST,
  CART_FETCH_ADDRESS_SUCCESS,
} from "../constants/cartConstant";

export const getCart = () => async (dispatch, getState) => {
  dispatch({ type: CART_FETCH_REQUEST });
  try {
    const {
      userSignin: { userInfo },
    } = getState();

    if (userInfo) {
      await axios.get("/api/cart/create", {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      const { data } = await axios.get("/api/cart/", {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      var dbCartItems = data.cartItems;
      if (dbCartItems.length > 0) {
        dbCartItems.forEach(async (dbCartItem) => {
          await dispatch(addToCart(dbCartItem.itemId, dbCartItem.qty));
        });
      }
    }
    dispatch({
      type: CART_FETCH_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: CART_FETCH_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addToCart = (itemId, qty) => async (dispatch, getState) => {
  dispatch({ type: CART_ADD_ITEM_REQUEST });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    var cartItem = {};

    if (userInfo) {
      await axios.post(
        "/api/cart/post_item",
        {
          itemId: itemId,
          qty: qty,
        },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      const item = await axios.get(`/api/items/${itemId}`);
      cartItem = {
        qty: qty,
        item: item.data,
      };
    } else {
      const item = await axios.get(`/api/items/${itemId}`);
      cartItem = {
        qty: qty,
        item: item.data,
      };
    }
    dispatch({
      type: CART_ADD_ITEM_SUCCESS,
      payload: cartItem,
    });
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  } catch (error) {
    dispatch({
      type: CART_ADD_ITEM_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addBatch = () => async (dispatch, getState) => {
  dispatch({ type: CART_ADD_BATCH_REQUEST });
  try {
    const {
      userSignin: { userInfo },
      cart: { cartItems },
    } = getState();
    var itemsFinal = [];
    if (cartItems.length > 0) {
      cartItems.forEach(async (cartItem) => {
        await axios.post(
          "/api/cart/post_item",
          {
            itemId: cartItem.item.id,
            qty: cartItem.qty,
          },
          {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          }
        );
        const item = await axios.get(`/api/items/${cartItem.item.id}`);
        var cartItemNew = {
          id: cartItem.id,
          qty: cartItem.qty,
          item: item.data,
        };
        itemsFinal.push(cartItemNew);
      });
      localStorage.setItem(
        "cartItems",
        JSON.stringify(getState().cart.cartItems)
      );
    }
    dispatch({
      type: CART_ADD_BATCH_SUCCESS,
      payload: itemsFinal,
    });
  } catch (error) {
    dispatch({
      type: CART_ADD_BATCH_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const removeFromCart = (cartItemId) => async (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM_REQUEST,
  });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    if (userInfo) {
      await axios.post(
        "/api/cart/remove",
        { itemId: cartItemId },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
    }
    dispatch({
      type: CART_REMOVE_ITEM_SUCCESS,
      payload: cartItemId,
    });
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  } catch (error) {
    dispatch({
      type: CART_REMOVE_ITEM_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const saveShippingAddress = (data) => async (dispatch, getState) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS_REQUEST,
    payload: data,
  });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    localStorage.setItem("shippingAddress", JSON.stringify(data));
    await axios.post(
      "/api/addresses/register",
      {
        fullName: data.fullName,
        address: data.address,
        city: data.city,
        postalCode: data.postalCode,
        country: data.country,
      },
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    dispatch({
      type: CART_SAVE_SHIPPING_ADDRESS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CART_SAVE_SHIPPING_ADDRESS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getAddress = () => async (dispatch, getState) => {
  dispatch({ type: CART_FETCH_ADDRESS_REQUEST });
  try {
    const {
      userSignin: { userInfo },
      cart: { shippingAddress },
    } = getState();
    const dbAddress = await axios.get("/api/user/address", {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    let address = shippingAddress;
    if (dbAddress.data) {
      address = dbAddress.data;
    }
    dispatch({
      type: CART_FETCH_ADDRESS_SUCCESS,
      payload: address,
    });
  } catch (error) {
    dispatch({
      type: CART_FETCH_ADDRESS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: data });
};
