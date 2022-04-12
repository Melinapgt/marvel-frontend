import "../App.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Login = (props) => {
  //props
  const { setUser, userIdCookies } = props;

  //states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  //hooks settings
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (email && password) {
        const response = await axios.post(
          "https://marvel-comics-backend.herokuapp.com/login",
          {
            email,
            password,
          }
        );
        console.log(response.data);

        setUser(response.data.userToken);
        userIdCookies(response.data.userId);
        navigate("/");
      } else {
        setMessage("Incorrect email or password!");
      }
    } catch (error) {
      console.log("erreur.response login==>", error.response);
      setMessage(error.response.data.message);
    }
  };

  return (
    <div className="login-page">
      <div className="container-form">
        <h2>Je me connecte</h2>
        <form onSubmit={handleSubmit}>
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
            CONNEXION{" "}
            <span className="hvr-icon-forward">
              <FontAwesomeIcon
                className="hvr-icon"
                icon="fa-solid fa-circle-chevron-right"
              />
            </span>{" "}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
