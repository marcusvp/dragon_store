import React from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";

export default function Item(props) {
  const { item } = props;
  return (
    <div key={item.id} className="card">
      <Link to={`/item/${item.id}`}>
        <img className="medium" src={`/images/${item.image}`} alt={item.name} />
      </Link>
      <div className="card-body">
        <Link to={`/item/${item.id}`}>
          <h2>{item.name}</h2>
        </Link>
        <Rating rating={item.rating} numReviews={item.numReviews}></Rating>
        <div className="price">R${item.price}</div>
      </div>
    </div>
  );
}
