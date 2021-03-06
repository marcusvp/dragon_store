import {
  ORDER_LIST_ADMIN_REQUEST,
  ORDER_LIST_ADMIN_SUCCESS,
  ORDER_LIST_ADMIN_FAIL,
  ITEM_LIST_ADMIN_REQUEST,
  ITEM_LIST_ADMIN_SUCCESS,
  ITEM_LIST_ADMIN_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  SALE_LIST_REQUEST,
  SALE_LIST_SUCCESS,
  SALE_LIST_FAIL,
  ADD_ITEM_REQUEST,
  ADD_ITEM_SUCCESS,
  ADD_ITEM_FAIL,
} from "../constants/adminConstants";

export const adminItemListReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case ITEM_LIST_ADMIN_REQUEST:
      return { loading: true };
    case ITEM_LIST_ADMIN_SUCCESS:
      return { loading: false, items: action.payload };
    case ITEM_LIST_ADMIN_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const adminOrderListReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case ORDER_LIST_ADMIN_REQUEST:
      return { loading: true };
    case ORDER_LIST_ADMIN_SUCCESS:
      return { loading: false, orders: action.payload };
    case ORDER_LIST_ADMIN_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const adminUserListReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { loading: true };
    case USER_LIST_SUCCESS:
      return { loading: false, users: action.payload };
    case USER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const adminSaleListReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case SALE_LIST_REQUEST:
      return { loading: true };
    case SALE_LIST_SUCCESS:
      return { loading: false, sales: action.payload };
    case SALE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const addItemReducer = (state = { loading: false }, action) => {
  switch (action.type) {
    case ADD_ITEM_REQUEST:
      return { loading: true };
    case ADD_ITEM_SUCCESS:
      return { loading: false, item: action.payload };
    case ADD_ITEM_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
