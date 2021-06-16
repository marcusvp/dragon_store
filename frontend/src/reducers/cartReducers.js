import {
  CART_ADD_BATCH_REQUEST,
  CART_ADD_BATCH_SUCCESS,
  CART_ADD_BATCH_FAIL,
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
  CART_FETCH_ADDRESS_REQUEST,
  CART_FETCH_ADDRESS_SUCCESS,
  CART_FETCH_ADDRESS_FAIL,
  EMPTY_CART,
} from "../constants/cartConstant";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_FETCH_REQUEST:
      return { ...state, loading: true };
    case CART_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case CART_FETCH_FAIL:
      return { ...state, loading: false, error: action.payload };
    case CART_ADD_ITEM_REQUEST:
      return { ...state, loading: true };
    case CART_ADD_ITEM_SUCCESS:
      const cartItem = action.payload;
      const existItem = state.cartItems.find(
        (x) => x.item.id === cartItem.item.id
      );
      if (existItem) {
        return {
          ...state,
          error: "",
          cartItems: state.cartItems.map((x) =>
            x.item === existItem.item ? cartItem : x
          ),
        };
      } else {
        return {
          ...state,
          error: "",
          cartItems: [...state.cartItems, cartItem],
        };
      }
    case CART_ADD_ITEM_FAIL:
      return { ...state, loading: false, error: action.payload };
    case CART_ADD_BATCH_REQUEST: {
      return { ...state, loading: true };
    }
    case CART_ADD_BATCH_SUCCESS: {
      return { ...state, loading: false, cartItems: action.payload };
    }
    case CART_ADD_BATCH_FAIL: {
      return { ...state, loading: false, cartItems: action.payload };
    }
    case CART_REMOVE_ITEM_REQUEST:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.item.id !== action.payload),
      };
    case CART_REMOVE_ITEM_SUCCESS:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.item.id !== action.payload),
      };
    case CART_REMOVE_ITEM_FAIL:
      return { ...state, loading: false, error: action.payload };
    case CART_SAVE_SHIPPING_ADDRESS_REQUEST:
      return { ...state, loading: true, shippingAddress: action.payload };
    case CART_SAVE_SHIPPING_ADDRESS_SUCCESS:
      return { ...state, loading: false };
    case CART_SAVE_SHIPPING_ADDRESS_FAIL:
      return { ...state, error: action.payload };
    case CART_SAVE_PAYMENT_METHOD:
      return { ...state, paymentMethod: action.payload };
    case CART_FETCH_ADDRESS_REQUEST:
      return { ...state, loading: true };
    case CART_FETCH_ADDRESS_SUCCESS:
      return { ...state, loading: false, shippingAddress: action.payload };
    case CART_FETCH_ADDRESS_FAIL:
      return { ...state, loading: false, error: action.payload };
    case EMPTY_CART:
      return { ...state, cartItems: [] };
    default:
      return state;
  }
};
