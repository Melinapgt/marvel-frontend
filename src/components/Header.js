import "../App.css";
import logo from "../assets/img/logo_marvel.png";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
// import ResizeObserver from "react-resize-detector";
// import { withResizeDetector } from "react-resize-detector";
import { useResizeDetector } from "react-resize-detector";
import { Button, Wrapper, Menu, MenuItem } from "react-aria-menubutton";

const Header = (props) => {
  //props
  const { setTitle, setComicsName, userToken, setUser } = props;

  //States
  const [isBigScreen, setIsBigScreen] = useState(false);

  //hook settings
  const location = useLocation();

  // console.log(location.pathname);

  //gestion de la taille de l'écran l'affichage du menu
  const { width, height, ref } = useResizeDetector();

  useEffect(() => {
    setIsBigScreen(width >= 1024 ? true : false);
    if (isBigScreen) {
      console.log("big screen");
    } else {
      console.log("smallScreen");
    }
  }, [width]);

  const handleClickMenuIcon = () => {};

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
        ) : (
          <Wrapper className="MyMenuButton">
            <Button className="menu-icon" onClick={handleClickMenuIcon}>
              <FontAwesomeIcon icon="fa-solid fa-bars" />
            </Button>
            <Menu>
              <ul>
                <Link to="/comics" className="link-comics">
                  <div>COMICS</div>
                </Link>

                <Link to="/favorites" className="link-favorites">
                  <div>FAVORIS</div>
                </Link>
                {userToken ? (
                  <div
                    className="btn-logout"
                    onClick={() => {
                      setUser(null);
                    }}
                  >
                    Se déconnecter
                  </div>
                ) : (
                  <div>
                    <Link to="/login">
                      <div>Se connecter</div>
                    </Link>
                    <Link to="/signup">
                      <div>S'inscrire</div>
                    </Link>
                  </div>
                )}
              </ul>
            </Menu>
          </Wrapper>
        )}
      </div>
    </div>
  );
};

export default Header;
