import React, { useEffect } from "react";
import queryString from "query-string";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { searchItems } from "../actions/itemActions";
import Item from "../components/Item";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function SearchScreen(props) {
  const { search } = useLocation();
  const values = queryString.parse(search);
  const query = values.q;
  const dispatch = useDispatch();
  const itemSearch = useSelector((state) => state.itemSearch);
  const { loading, error, items } = itemSearch;

  useEffect(() => {
    dispatch(searchItems(query));
  }, [dispatch, query]);

  return (
    <div>
      <div className="row">
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <div>{items.length} results</div>
        )}
      </div>
      <div className="row top">
        <div className="col-1">
          <h3>department</h3>
          <ul>
            <li>category</li>
          </ul>
        </div>
        <div className="col-3">
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
              {items.length === 0 && <MessageBox>no items found</MessageBox>}
              <div className="row center">
                {items.map((item) => (
                  <Item key={item.id} item={item}></Item>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
