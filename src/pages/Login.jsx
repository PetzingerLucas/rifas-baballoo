import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import Header from "../components/Header";
import Context from "../context/Context";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const context = useContext(Context); // Acessando o contexto
  const { setIsLogged, setIsAdmin } = context; // Acessando a função setIsLogged no contexto

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "eliane" && password === "Petz1973") {
      setIsLogged(true); // Atualizando o estado isLogged
      setIsAdmin(true); // Atualizando o estado isLogged
      localStorage.setItem("isLogged", true); // Salvando isLogged no localStorage
      localStorage.setItem("isAdmin", true); // Salvando isAdmin no localStorage
      navigate("/criar");
    } else {
      alert("Usuário ou senha incorretos!");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin(e);
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
          onKeyPress={handleKeyPress} // Adicionando o evento onKeyPress
        />

        <button onClick={handleLogin} className="button" type="submit">
          Entrar
        </button>
      </div>
    </div>
  );
}

export default Login;
