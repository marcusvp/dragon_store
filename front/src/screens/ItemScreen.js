import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { detailsItem } from "../actions/itemActions";

export default function ItemScreen(props) {
  const dispatch = useDispatch();
  const itemId = props.match.params.id;
  const [qty, setQty] = useState(1);
  const itemDetails = useSelector((state) => state.itemDetails);
  const { loading, error, item } = itemDetails;

  useEffect(() => {
    dispatch(detailsItem(itemId));
  }, [dispatch, itemId]);

  const addToCartHandler = () => {
    props.history.push(`/cart/${itemId}?qty=${qty}`);
  };

  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <Link to="/">back to results</Link>
          <div className="row top">
            <div className="col-2">
              <img
                className="large"
                src={`/images/${item.image}`}
                alt={item.name}
              ></img>
            </div>
            <div className="col-1">
              <ul>
                <li>
                  <h1>{item.name}</h1>
                </li>
                <li>
                  <Rating
                    rating={item.rating}
                    numReviews={item.numReviews}
                  ></Rating>
                </li>
                <li>price : ${item.price}</li>
                <li>
                  description:
                  <p>{item.description}</p>
                </li>
              </ul>
            </div>
            <div className="col-1">
              <div className="card card-body">
                <ul>
                  <li>
                    <div className="row">
                      <div>price</div>
                      <div className="price">${item.price}</div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>status</div>
                      <div>
                        {item.countInStock > 0 ? (
                          <span className="success">in stock</span>
                        ) : (
                          <span className="danger">unavailable</span>
                        )}
                      </div>
                    </div>
                  </li>
                  {item.countInStock > 0 && (
                    <>
                      <li>
                        <div className="row">
                          <div>qty</div>
                          <div>
                            <select
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            >
                              {[...Array(item.countInStock).keys()].map((x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </li>
                      <li>
                        <button
                          onClick={addToCartHandler}
                          className="primary block"
                        >
                          add to cart
                        </button>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
