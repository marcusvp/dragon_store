import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import {
  addItemReducer,
  adminItemListReducer,
  adminOrderListReducer,
  adminSaleListReducer,
  adminUserListReducer,
} from "./reducers/adminReducers";
import { cartReducer } from "./reducers/cartReducers";
import { itemDetailsReducer, itemListReducer } from "./reducers/itemReducers";
import {
  orderCreatorReducer,
  orderDetailsReducer,
  orderListReducer,
  orderPaymentReducer,
} from "./reducers/orderReducers";
import {
  userDetailsReducer,
  userEditProfileReducer,
  userRegisterReducer,
  userSigninReducer,
} from "./reducers/userReducers";

const initialState = {
  userSignin: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingAddress: {},
    paymentMethod: "paypal",
  },
};
const reducer = combineReducers({
  itemList: itemListReducer,
  itemDetails: itemDetailsReducer,
  cart: cartReducer,
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userEditProfile: userEditProfileReducer,
  orderCreator: orderCreatorReducer,
  orderDetails: orderDetailsReducer,
  orderPayment: orderPaymentReducer,
  orderList: orderListReducer,
  adminItemList: adminItemListReducer,
  adminOrderList: adminOrderListReducer,
  adminUserList: adminUserListReducer,
  adminSaleList: adminSaleListReducer,
  adminAddItem: addItemReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
