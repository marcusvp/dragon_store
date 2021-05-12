import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersAdmin } from "../../actions/adminActions";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";

export default function OrderList(props) {
  const dispatch = useDispatch();
  const adminOrderList = useSelector((state) => state.adminOrderList);
  const { orders, loading, error } = adminOrderList;

  useEffect(() => {
    dispatch(getOrdersAdmin());
  }, [dispatch]);

  return (
    <div className="admin_area">
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <h1>order history</h1>
          <table className="table">
            <thead>
              <tr>
                <th>name</th>
                <th>id</th>
                <th>date</th>
                <th>total</th>
                <th>paid</th>
                <th>delivered</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.user.name}</td>
                  <td>{order.id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice.toFixed(2)}</td>
                  <td>
                    {order.isPaid ? order.paidAt.substring(0, 10) : "not paid"}
                  </td>
                  <td>
                    {order.isDelivered
                      ? order.deliveredAt.substring(0, 10)
                      : "not delivered"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
