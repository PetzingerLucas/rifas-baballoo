import { useState } from "react";
import "./App.css";
import React from "react";
import Context from "./context/Context";
import Path from "./pages/routes";
import io from "socket.io-client";
const socket = io("http://localhost:8080");
socket.on("connect", () => {
  console.log("[IO] Connect => a new connection has been established");
});

function App() {
  const [total, setTotal] = useState(0);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [price, setPrice] = useState(10);
  const [containerData, setContainerData] = useState([]);

  const [user, setUser] = useState({
    name: "",
    selection: [],
    selectionQty: 0,
  });
  const [state, setState] = useState({
    name: "",
    price: 10,
    promoPrice: 7.5,
    offset: 2,
    description: "",
    quantity: 0,
    type: "",
  });

  const store = {
    total,
    setTotal,
    price,
    setPrice,
    isConfirmed,
    setIsConfirmed,
    user,
    setUser,
    state,
    setState,
    socket,
    containerData,
    setContainerData,
  };

  return (
    <Context.Provider value={store}>
      <Path />
    </Context.Provider>
  );
}

export default App;
