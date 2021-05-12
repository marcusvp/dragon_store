import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getItemsAdmin } from "../../actions/adminActions";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";

export default function ItemListScreen(props) {
  const dispatch = useDispatch();

  const adminItemList = useSelector((state) => state.adminItemList);
  const { items, loading, error } = adminItemList;

  useEffect(() => {
    dispatch(getItemsAdmin());
  }, [dispatch]);

  return (
    <div className="admin_area">
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="">
          <h1>products</h1>
          <table className="table">
            <thead>
              <tr>
                <th>name</th>
                <th>preview</th>
                <th>id</th>
                <th>category</th>
                <th>brand</th>
                <th>description</th>
                <th>price</th>
                <th>stock</th>
                <th>action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>
                    <img
                      src={`/images/${item.image}`}
                      alt={item.name}
                      className="small"
                    ></img>
                  </td>
                  <td>{item.id}</td>
                  <td>{item.category}</td>
                  <td>{item.brand}</td>
                  <td>{item.description}</td>
                  <th>{item.price}</th>
                  <th>{item.countInStock}</th>
                  <th>
                    <button
                      type="button"
                      onClick={() => {
                        props.history.push(`/admin/item/${item.id}`);
                      }}
                    >
                      edit
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <button
        type="button"
        onClick={() => {
          props.history.push("/admin/add_item");
        }}
      >
        add item
      </button>
    </div>
  );
}
