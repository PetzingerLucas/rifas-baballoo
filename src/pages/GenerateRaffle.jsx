import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Header from "../components/Header";
import Context from "../context/Context";

function GenerateRaffle() {
  const context = useContext(Context);
  const navigate = useNavigate();
  const socket = context.socket;
  const [state, setState] = useState({
    name: "",
    price: 0,
    promoPrice: 0,
    offset: 0,
    description: "",
    quantity: 0,
    type: "",
  });

  const handleChange = ({ target }) => {
    setState({
      ...state,
      [target.name]: target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    context.setState({
      ...context.state,
      name: state.name,
      price: state.price,
      promoPrice: state.promoPrice,
      offset: state.offset,
      description: state.description,
      quantity: state.quantity,
      type: state.type,
    });
    setInterval(sendRaffleInfoToServer, 2000);

    navigate("/rifa");
  };

  const sendRaffleInfoToServer = () => {
    // Envia as informações da rifa para o servidor websocket
    socket.emit("raffle_info", state);
  };
  return (
    <div className="App">
      <Header />
      <h1>Criar Rifa</h1>
      <div className="form">
        <label htmlFor="raffle_name">Nome da Rifa:</label>
        <input
          value={state.name}
          onChange={handleChange}
          id="raffle_name"
          name="name"
          type="text"
        />

        <label htmlFor="price">Preço Unitário:</label>
        <input
          type="number"
          style={{ width: "30px" }}
          value={state.price}
          onChange={handleChange}
          id="price"
          name="price"
        />
        <label htmlFor="promoPrice">Preço Promo:</label>
        <input
          type="number"
          style={{ width: "30px" }}
          value={state.promoPrice}
          name="promoPrice"
          onChange={handleChange}
          id="promoPrice"
        />
        <label htmlFor="offset">Faixa para promo:</label>
        <input
          type="number"
          style={{ width: "30px" }}
          value={state.offset}
          name="offset"
          onChange={handleChange}
          id="offset"
        />
        <label htmlFor="description">Descrição:</label>
        <textarea
          value={state.description}
          onChange={handleChange}
          id="description"
          name="description"
          rows="4"
          cols="50"
        ></textarea>
        <label htmlFor="quantity">Quantidade de nomes(multiplos de 5):</label>
        <input
          value={state.quantity}
          name="quantity"
          onChange={handleChange}
          style={{ width: "30px" }}
          id="quantity"
          type="number"
        />
        <label htmlFor="type">Tipo de nome:</label>
        <select
          onChange={handleChange}
          name="type"
          value={state.type}
          style={{ padding: "6px" }}
          id="type"
        >
          <option value="Pessoas">Pessoas</option>
          <option value="Animais">Animais</option>
        </select>
        <button onClick={handleSubmit} className="button" type="submit">
          Criar Rifa
        </button>
      </div>
    </div>
  );
}

export default GenerateRaffle;
