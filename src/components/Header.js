import "../App.css";
import logo from "../assets/img/logo_marvel.png";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Header = (props) => {
  const { setTitle, setComicsName } = props;
  const location = useLocation();
  // console.log(location.pathname);
  return (
    <div className="header">
      <div className="header-container">
        <Link to="/" className="link-home">
          <div className="logo">
            <img src={logo} alt="" />
          </div>{" "}
        </Link>

        {location.pathname === "/" && (
          <div className="search-bar">
            <input
              type="text"
              placeholder="Recherche"
              onChange={(event) => {
                setTitle(event.target.value);
                setComicsName(event.target.value);
              }}
            />
          </div>
        )}
        {location.pathname === "/comics" && (
          <div className="search-bar">
            <input
              type="text"
              placeholder="Recherche"
              onChange={(event) => {
                setTitle(event.target.value);
                setComicsName(event.target.value);
              }}
            />
          </div>
        )}

        <div className="menu">
          <Link to="/comics">
            <div>Comics</div>
          </Link>

          <Link to="/favorites">
            <div>Favoris</div>
          </Link>

          <Link to="/login">
            <button>Se connecter</button>
          </Link>
          <Link to="/signup">
            <button>S'inscrire</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
