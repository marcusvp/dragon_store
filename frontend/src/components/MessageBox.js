import React from "react";

export default function MessageBox(props) {
  /*props.children shows props from box */
  return (
    <div className={`alert alert-${props.variant || "info"}`}>
      {props.children}
    </div>
  );
}
