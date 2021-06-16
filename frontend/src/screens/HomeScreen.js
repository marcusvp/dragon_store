import React, { useEffect } from "react";
import Item from "../components/Item";
import LoadingBox from "../components/LoadingBox.js";
import MessageBox from "../components/MessageBox.js";
import { useDispatch, useSelector } from "react-redux";
import { listItems } from "../actions/itemActions.js";

export default function HomeScreen() {
  const dispatch = useDispatch();
  const itemList = useSelector((state) => state.itemList);
  const { loading, error, items } = itemList;

  useEffect(() => {
    dispatch(listItems());
  }, [dispatch]);

  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="row center">
          {items.map((item) => (
            <Item key={item.id} item={item}></Item>
          ))}
        </div>
      )}
    </div>
  );
}
