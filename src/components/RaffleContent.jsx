import React, { useContext, useState, useEffect } from "react";
import Context from "../context/Context";

function RaffleContent() {
  const { state, socket } = useContext(Context);
  const [raffleInfo, setRaffleInfo] = useState(state);

  useEffect(() => {
    const receiveRaffleInfoFromServer = (raffleInfo) => {
      socket.emit("get_raffle_info");
    };

    socket.on("raffle_info", (raffleInfo) => {
      setRaffleInfo(raffleInfo);
      console.log(raffleInfo);
    });

    return () => {
      socket.off("raffle_info", receiveRaffleInfoFromServer);
    };
  }, [socket]);

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
