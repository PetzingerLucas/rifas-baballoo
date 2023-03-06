import React, { useContext } from "react";
import Context from "../context/Context";

function Total() {
  const context = useContext(Context);

  const calcTotal = () => {
    const user = context.user;
    if (user.selectionQty >= context.state.offset) {
      return user.selectionQty * context.state.promoPrice;
    } else return user.selectionQty * context.state.price;
  };
  return (
    <div className="total">
      <p>
        Total a pagar:{" "}
        <em style={{ color: "green", fontWeight: "700" }}>
          R${calcTotal().toFixed(2)}
        </em>{" "}
      </p>
    </div>
  );
}

export default Total;
