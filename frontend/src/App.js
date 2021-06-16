import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Link, Route } from "react-router-dom";
import { signOut } from "./actions/userActions";
import AdminRoute from "./components/AdminRoute";
import PrivateRoute from "./components/PrivateRoute";
import AdminScreen from "./screens/admin/AdminScreen";
import ItemListScreen from "./screens/admin/ItemListScreen";
import OrderListScreen from "./screens/admin/OrderListScreen";
import UserListScreen from "./screens/admin/UserListScreen";
import CartScreen from "./screens/CartScreen";
import EditItemScreen from "./screens/admin/EditItemScreen";
import HomeScreen from "./screens/HomeScreen";
import ItemScreen from "./screens/ItemScreen";
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import OrderScreen from "./screens/OrderScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import ProfileScreen from "./screens/ProfileScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import SigninScreen from "./screens/SigninScreen";
import SalesListScreen from "./screens/admin/SalesListScreen";
import AddItemScreen from "./screens/admin/AddItemScreen";
import SearchBox from "./components/SearchBox";
import SearchScreen from "./screens/SearchScreen";

function App() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signOut());
  };
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <Link className="brand" to="/">
              dragon store
            </Link>
          </div>
          <div>
            <Route
              render={({ history }) => (
                <SearchBox history={history}></SearchBox>
              )}
            ></Route>
          </div>
          <div>
            <Link to="/cart">cart</Link>
            {cartItems.length > 0 && (
              <span className="badge">{cartItems.length}</span>
            )}
            {userInfo ? (
              <div className="dropdown">
                <Link to="#">
                  {userInfo.name}
                  <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/profile">profile</Link>
                  </li>
                  <li>
                    <Link to="/orderhistory">order history</Link>
                  </li>
                  <li>
                    {userInfo.isAdmin && <Link to="/admin">admin screen</Link>}
                  </li>
                  <li>
                    <Link to="#signout" onClick={signoutHandler}>
                      sign out
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/signin">sign in</Link>
            )}
          </div>
        </header>
        <main>
          <div className="client">
            <Route path="/" component={HomeScreen} exact></Route>
            <Route path="/item/:id" component={ItemScreen}></Route>
            <Route path="/cart/:id?" component={CartScreen}></Route>
            <Route path="/signin" component={SigninScreen}></Route>
            <Route path="/register" component={RegisterScreen}></Route>
            <Route path="/shipping" component={ShippingAddressScreen}></Route>
            <Route path="/payment" component={PaymentMethodScreen}></Route>
            <Route path="/placeorder" component={PlaceOrderScreen}></Route>
            <Route path="/order/:id" component={OrderScreen}></Route>
            <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
            <PrivateRoute
              path="/profile"
              component={ProfileScreen}
            ></PrivateRoute>
            <Route path="/search" component={SearchScreen}></Route>
          </div>
        </main>
        <div className="admin">
          <AdminRoute path="/admin" component={AdminScreen}></AdminRoute>
          <AdminRoute
            path="/admin/items"
            component={ItemListScreen}
          ></AdminRoute>
          <AdminRoute
            path="/admin/item/:id"
            component={EditItemScreen}
          ></AdminRoute>
          <AdminRoute
            path="/admin/add_item"
            component={AddItemScreen}
          ></AdminRoute>
          <AdminRoute
            path="/admin/orders"
            component={OrderListScreen}
          ></AdminRoute>
          <AdminRoute
            path="/admin/users"
            component={UserListScreen}
          ></AdminRoute>
          <AdminRoute
            path="/admin/sales"
            component={SalesListScreen}
          ></AdminRoute>
        </div>
        <footer className="row center">™</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
