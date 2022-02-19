import "../App.css";
import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await axios.post("http://localhost:4001/login", {
      email,
      password,
    });
    console.log(response.data);
  };

  return (
    <div className="login-page">
      <div className="container-form">
        <h2>Je me connecte</h2>
        <form className="signup-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            required={true}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            required={true}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <button type="submit">Connexion</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
