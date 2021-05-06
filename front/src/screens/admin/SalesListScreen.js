import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSalesAdmin } from "../../actions/adminActions";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";

export default function SalesListScreen(props) {
  const dispatch = useDispatch();
  const adminSaleList = useSelector((state) => state.adminSaleList);
  const { sales, loading, error } = adminSaleList;

  useEffect(() => {
    dispatch(getSalesAdmin());
  }, [dispatch]);

  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <h1>sale history</h1>
          <table className="table">
            <thead>
              <tr>
                <th>id</th>
                <th>date</th>
                <th>paid at</th>
                <th>payment id</th>
                <th>email address</th>
                <th>order id</th>
              </tr>
            </thead>
            <tbody>
              {sales.map((sale) => (
                <tr key={sale.id}>
                  <td>{sale.id}</td>
                  <td>{sale.createdAt.substring(0, 10)}</td>
                  <td>{sale.updatedAt.substring(0, 10)}</td>
                  <td>{sale.paymentId}</td>
                  <td>{sale.email_address}</td>
                  <td>{sale.orderId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
