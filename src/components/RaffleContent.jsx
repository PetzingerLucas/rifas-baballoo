import React, { useContext, useState, useEffect } from "react";
import Context from "../context/Context";

function RaffleContent() {
  const { state, socket } = useContext(Context);
  const [raffleInfo, setRaffleInfo] = useState(state);
  const [isFirstUpdate, setIsFirstUpdate] = useState(true);

  useEffect(() => {
    const receiveRaffleInfoFromServer = (raffleInfo) => {
      if (
        !raffleInfo.name ||
        (raffleInfo.name.trim() === "" &&
          raffleInfo.price === 0 &&
          raffleInfo.offset === 0 &&
          raffleInfo.promoPrice === 0 &&
          !raffleInfo.description) ||
        raffleInfo.description.trim() === ""
      ) {
        return;
      }
      if (isFirstUpdate) {
        setRaffleInfo(raffleInfo);
        setIsFirstUpdate(false);
      }
    };
    socket.on("raffle_info", receiveRaffleInfoFromServer);
    return () => {
      socket.off("raffle_info", receiveRaffleInfoFromServer);
    };
  }, [isFirstUpdate]);

  return (
    <div
      style={{
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
      }}
    >
      {
        <div className="content-container">
          <h2>{raffleInfo.name.toUpperCase()}</h2>
          <h3>
            {`1 nome por R$${raffleInfo.price},00 ou ${raffleInfo.offset} nomes por `}
            <em style={{ color: "green", fontSize: "x-large" }}>
              R${raffleInfo.promoPrice * raffleInfo.offset},00
            </em>
          </h3>
          {raffleInfo.description.trim() !== "" && (
            <h5>{raffleInfo.description}</h5>
          )}
        </div>
      }
    </div>
  );
}

export default RaffleContent;
