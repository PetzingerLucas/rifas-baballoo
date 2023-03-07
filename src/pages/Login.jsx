import React, { useState } from "react";
import { useNavigate } from "react-router";
import Header from "../components/Header";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "eliane" && password === "Petz1973") {
      navigate("/criar");
    } else {
      alert("Usuário ou senha incorretos!");
    }
  };

  return (
    <div className="App">
      <Header />
      <h1 style={{ width: "100%" }}>Login</h1>
      <div className="form">
        <label htmlFor="username">Usuário:</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          id="username"
          name="username"
          type="text"
        />

        <label htmlFor="password">Senha:</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="password"
          name="password"
          type="password"
        />

        <button onClick={handleLogin} className="button" type="submit">
          Entrar
        </button>
      </div>
    </div>
  );
}

export default Login;
