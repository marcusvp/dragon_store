import React from "react";

export default function AdminScreen(props) {
  return (
    <div className="sidenav">
      <ul>
        <li>
          <button
            onClick={() => {
              props.history.push(`/admin/items`);
            }}
          >
            products
          </button>
        </li>
        <li>
          <button
            type="button"
            onClick={() => {
              props.history.push(`/admin/orders`);
            }}
          >
            orders
          </button>
        </li>
        <li>
          <button
            type="button"
            onClick={() => {
              props.history.push(`/admin/users`);
            }}
          >
            users
          </button>
        </li>
        <li>
          <button type="button">sales</button>
        </li>
      </ul>
    </div>
  );
}
