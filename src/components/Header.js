import "../App.css";
import logo from "../assets/img/logo_marvel.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <div className="header-container">
        <Link to="/" className="link-home">
          <div className="logo">
            <img src={logo} alt="" />
          </div>{" "}
        </Link>

        <div className="search-bar">
          <input type="text" placeholder="Recherche" />
        </div>

        <div className="menu">
          <Link to="/comics">
            <div>Comics</div>
          </Link>

          <div>Favoris</div>
          <button>Se connecter</button>
          <button>S'inscrire</button>
        </div>
      </div>
    </div>
  );
};

export default Header;
