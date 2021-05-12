import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersAdmin } from "../../actions/adminActions";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";

export default function UserList() {
  const dispatch = useDispatch();
  const adminUserList = useSelector((state) => state.adminUserList);
  const { users, loading, error } = adminUserList;

  useEffect(() => {
    dispatch(getUsersAdmin());
  }, [dispatch]);

  return (
    <div className="admin_area">
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <h1>user list</h1>
          <table className="table">
            <thead>
              <tr>
                <th>id</th>
                <th>name</th>
                <th>address</th>
                <th>user since</th>
                <th>user status</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>
                    {" "}
                    {user.address ? user.address.address : "n/a"},{" "}
                    {user.address ? user.address.city : "n/a"},{" "}
                    {user.address ? user.address.postalCode : "n/a"}
                  </td>
                  <td>{user.createdAt.substring(0, 10)}</td>
                  <td>{user.isAdmin ? "admin" : "user"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
