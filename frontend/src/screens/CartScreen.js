import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, getAddress, removeFromCart } from "../actions/cartActions";
import MessageBox from "../components/MessageBox";

export default function CartScreen(props) {
  const itemId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const dispatch = useDispatch();
  useEffect(() => {
    if (itemId) {
      dispatch(addToCart(itemId, qty));
    }
  }, [dispatch, itemId, qty]);
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = async () => {
    await dispatch(getAddress());
    props.history.push("/signin?redirect=shipping");
  };
  return (
    <div className="row top">
      <div className="col-2">
        <h1>shopping cart</h1>
        {cartItems.length === 0 ? (
          <MessageBox>
            cart is empty <Link to="/">link to homepage</Link>
          </MessageBox>
        ) : (
          <ul>
            {cartItems.map((cartItem) => (
              <li key={cartItem.item.id}>
                <div className="row">
                  <div>
                    <img
                      src={`/images/${cartItem.item.image}`}
                      alt={cartItem.item.name}
                      className="small"
                    ></img>
                  </div>
                  <div className="min-30">
                    <Link to={`/item/${cartItem.item.id}`}>
                      {cartItem.item.name}
                    </Link>
                  </div>
                  <div>
                    <select
                      value={cartItem.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(cartItem.item.id, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(cartItem.item.countInStock).keys()].map(
                        (x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                  <div>${cartItem.item.price}</div>
                  <div>
                    <button
                      type="button"
                      onClick={() => removeFromCartHandler(cartItem.item.id)}
                    >
                      delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="col-1">
        <div className="card card-body">
          <ul>
            <li>
              <h2>
                subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items: $
                {cartItems.reduce((a, c) => a + c.item.price * c.qty, 0)})
              </h2>
            </li>
            <li>
              <button
                type="button"
                onClick={checkoutHandler}
                className="primary block"
                disabled={cartItems.length === 0}
              >
                proceed to checkout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
