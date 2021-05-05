import React from "react";

export default function CheckoutSteps(props) {
  return (
    <div className="row checkout-steps">
      <div className={props.step1 ? "active" : ""}>sign-in</div>
      <div className={props.step2 ? "active" : ""}>shipping</div>
      <div className={props.step3 ? "active" : ""}>payment</div>
      <div className={props.step4 ? "active" : ""}>place order</div>
    </div>
  );
}
