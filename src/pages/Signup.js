import "../App.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Signup = () => {
  //states
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  //hook setting
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:4001/signup", {
        firstname,
        lastname,
        email,
        password,
      });
      console.log(response.data);
      navigate("/");
    } catch (error) {
      console.log("erreur.response signup==>", error.response);
      setMessage(error.response.data.message);
    }
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
              setMessage("");
            }}
          />
          <input
            type="text"
            placeholder="Nom"
            required={true}
            onChange={(event) => {
              setLastname(event.target.value);
              setMessage("");
            }}
          />
          <input
            type="email"
            placeholder="Email"
            required={true}
            onChange={(event) => {
              setEmail(event.target.value);
              setMessage("");
            }}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            required={true}
            onChange={(event) => {
              setPassword(event.target.value);
              setMessage("");
            }}
          />
          {message && <div className="warning">{message}</div>}
          <button type="submit">
            S'INSCRIRE{" "}
            <span className="hvr-icon-forward">
              <FontAwesomeIcon
                className="hvr-icon"
                icon="fa-solid fa-circle-chevron-right"
              />
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
