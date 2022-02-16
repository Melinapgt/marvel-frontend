import "../App.css";
import logo from "../assets/img/logo_marvel.png";

const Header = () => {
  return (
    <div className="header">
      <div className="header-container">
        <div className="logo">
          <img src={logo} alt="" />
        </div>
        <div className="search-bar">
          <input type="text" placeholder="Recherche" />
        </div>
        <div className="menu">
          <button>Se connecter</button>
          <button>S'inscrire</button>
        </div>
      </div>
    </div>
  );
};

export default Header;
