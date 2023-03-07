import React, { useContext } from "react";
import Context from "../context/Context";

function ConfirmationButton() {
  const { user, total } = useContext(Context);
  const isDisabled = user.selectionQty === 0;
  const pixKey = "4199120418";
  const handleClick = () => {
    const message = `*Nome do comprador:* ${
      user.name
    }\n*Nomes escolhidos:*\n${user.selection.join(
      "\n"
    )}\n*Valor a pagar:* ${total}\n*Chave PIX:* ${pixKey}`;
    navigator.clipboard.writeText(pixKey);
    window.location.href = `https://wa.me/4199120418/?text=${encodeURIComponent(
      message
    )}`;
  };

  return (
    <div>
      <button
        className="button"
        type="submit"
        disabled={isDisabled}
        onClick={handleClick}
      >
        Confirmar Escolha
      </button>
    </div>
  );
}

export default ConfirmationButton;
