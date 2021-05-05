import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createOrder } from "../actions/orderActions";
import CheckoutSteps from "../components/CheckoutSteps";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";

export default function PlaceOrderScreen(props) {
  const cart = useSelector((state) => state.cart);
  if (!cart.paymentMethod) {
    props.history.push("/payment");
  }
  const orderCreator = useSelector((state) => state.orderCreator);
  const { loading, success, error, order } = orderCreator;

  const toPrice = (num) => Number(num.toFixed(2)); // converts to a max 2 digits after comma number
  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.item.price, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
  cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  const dispatch = useDispatch();
  useEffect(() => {
    if (success) {
      props.history.push(`/order/${order.id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [dispatch, order, props.history, success]);

  const placeOrderHandler = () => {
    dispatch(createOrder(cart.itemsPrice));
  };
  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card-body">
                <h2>shipping</h2>
                <p>
                  <strong>name: </strong> {cart.shippingAddress.fullName} <br />
                  <strong>address: </strong> {cart.shippingAddress.address},{" "}
                  {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}
                  , {cart.shippingAddress.country} <br />
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>payment</h2>
                <p>
                  <strong>method: </strong> {cart.paymentMethod}
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>order items</h2>
                <ul>
                  {cart.cartItems.map((cartItem) => (
                    <li key={cartItem.item.item}>
                      <div className="row">
                        <div>
                          <img
                            src={`/images/${cartItem.item.image}`}
                            alt={cartItem.item.name}
                            className="small"
                          ></img>
                        </div>
                        <div className="min-30">
                          <Link to={`/item/${cartItem.item}`}>
                            {cartItem.item.name}
                          </Link>
                        </div>
                        <div>
                          {cartItem.qty} x ${cartItem.item.price} = $
                          {cartItem.qty * cartItem.item.price}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="col-1">
          <div className="card card-body">
            <ul>
              <li>
                <h2>order summary</h2>
              </li>
              <li>
                <div className="row">
                  <div>items</div>
                  <div>${cart.itemsPrice}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>shipping</div>
                  <div>${cart.shippingPrice}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>tax</div>
                  <div>${cart.taxPrice}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>
                    <strong>order total</strong>
                  </div>
                  <div>
                    <strong>${cart.totalPrice}</strong>
                  </div>
                </div>
              </li>
              <li>
                <button
                  type="button"
                  onClick={placeOrderHandler}
                  className="primary block"
                  disabled={cart.cartItems.length === 0}
                >
                  place order
                </button>
              </li>
              {loading && <LoadingBox></LoadingBox>}
              {error && <MessageBox variant="danger">{error}</MessageBox>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
