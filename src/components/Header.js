import "../App.css";
import logo from "../assets/img/logo_marvel.png";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useResizeDetector } from "react-resize-detector";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const Header = (props) => {
  //props
  const { setTitle, setComicsName, userToken, setUser } = props;

  //States
  const [isBigScreen, setIsBigScreen] = useState(false);

  //hook settings
  const location = useLocation();

  //gestion de la taille de l'écran l'affichage du menu
  const { width, ref } = useResizeDetector();

  useEffect(() => {
    setIsBigScreen(width >= 1024 ? true : false);
    if (isBigScreen) {
      console.log("big screen");
    } else {
      console.log("smallScreen");
    }
  }, [width, isBigScreen]);

  // MUI paramétrages pour le menu dropdown responsive
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="header" ref={ref}>
      <div className="header-container">
        <Link to="/" className="link-home">
          <div className="logo">
            <img src={logo} alt="" />
          </div>{" "}
        </Link>

        {location.pathname === "/" && (
          <div className="search-bar">
            <span>
              <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
            </span>
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
        {isBigScreen ? (
          <div className="menu">
            <Link to="/comics" className="link-comics">
              <div>COMICS</div>
            </Link>

            <Link to="/favorites" className="link-favorites">
              <div>FAVORIS</div>
            </Link>
            {userToken ? (
              <button
                className="btn-logout"
                onClick={() => {
                  setUser(null);
                }}
              >
                Se déconnecter
              </button>
            ) : (
              <div>
                <Link to="/login">
                  <button>Se connecter</button>
                </Link>
                <Link to="/signup">
                  <button>S'inscrire</button>
                </Link>
              </div>
            )}
          </div>
        ) : userToken ? (
          <div>
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <FontAwesomeIcon className="menu-icon" icon="fa-solid fa-bars" />
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose}>
                {" "}
                <Link className="link" to="/comics">
                  Comics
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link className="link" to="/favorites">
                  Favorites
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link className="link" to="/">
                  Logout
                </Link>
              </MenuItem>
            </Menu>
          </div>
        ) : (
          <div>
            {" "}
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <FontAwesomeIcon className="menu-icon" icon="fa-solid fa-bars" />
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose}>
                {" "}
                <Link className="link" to="/comics">
                  Comics
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link className="link" to="/favorites">
                  Favorites
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link className="link" to="/login">
                  Login
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link className="link" to="/signin">
                  Signin
                </Link>
              </MenuItem>
            </Menu>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
