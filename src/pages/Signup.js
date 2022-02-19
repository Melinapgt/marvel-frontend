import "../App.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await axios.post("http://localhost:4001/signup", {
      firstname,
      lastname,
      email,
      password,
    });
    console.log(response.data);
    navigate("/");
  };

  return (
    <div className="signup-page">
      <div className="container-form">
        <h2>Je m'inscris</h2>
        <form className="signup-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Prénom"
            required={true}
            onChange={(event) => {
              setFirstname(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Nom"
            required={true}
            onChange={(event) => {
              setLastname(event.target.value);
            }}
          />
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
          <button type="submit">S'inscrire</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
