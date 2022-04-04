import "../App.css";

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import ComicsModal from "../components/ComicsModal";

const ComicsCharacterId = (props) => {
  //props
  const {
    setSelectedComic,
    setShowComicsModal,
    showComicsModal,
    selectedComic,
    favoriteComicStorage,
  } = props;

  // Hooks settings
  const navigate = useNavigate();

  //States
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { characterId } = useParams();

  //   console.log("params==>", characterId);

  //Cookies
  const userToken = Cookies.get("userToken");

  let favoriteComics = [];
  if (Cookies.get("favoriteComic")) {
    // console.log(
    //   "favoriteComic on comics page==>",
    //   JSON.parse(Cookies.get("favoriteComic"))
    // );
    favoriteComics = JSON.parse(Cookies.get("favoriteComic"));
  }

  //requête au chargement de la page
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4001/comics/${characterId}`
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log("error comicsCharacterId pages ==>", error.response);
      }
    };
    fetchData();
  }, [characterId]);

  const handleClickComics = (comic) => {
    setShowComicsModal(true);
    setSelectedComic(comic);
  };

  const newFavoriteComics = [...favoriteComics];

  // Au clic Favoris
  const handleClickAddFavorite = async (comic) => {
    // console.log("userToken==>", userToken);
    // console.log("comic =>", comic);

    if (userToken) {
      //Ajout dans le cookies

      if (newFavoriteComics.find((el) => el._id === comic._id)) {
        for (let i = 0; i < newFavoriteComics.length; i++) {
          if (newFavoriteComics[i]._id === comic._id) {
            newFavoriteComics.splice(i, 1);
            // console.log(
            //   `pour i = ${i},newFavoriteComics[i].id=${newFavoriteComics[i]._id}`
            // );
            break;
          }
        }
      } else {
        newFavoriteComics.push(comic);
      }
      favoriteComicStorage(JSON.stringify(newFavoriteComics));
    } else {
      navigate("/login");
    }
  };

  return isLoading ? (
    <div>En cours de chargement ...</div>
  ) : (
    <div className="comic-characterId-page">
      <ComicsModal
        selectedComic={selectedComic}
        showComicsModal={showComicsModal}
        setSelectedComic={setSelectedComic}
        setShowComicsModal={setShowComicsModal}
      />
      <div className="container">
        {data.comics.map((comic, index) => {
          const pictureComics = `${comic.thumbnail.path}.${comic.thumbnail.extension}`;
          return (
            <div key={comic._id} className="comic-characterId--content">
              <div className="comic-card">
                <div>
                  <img
                    className="hvr-grow"
                    onClick={() => handleClickComics(comic)}
                    src={pictureComics}
                    alt=""
                  />
                </div>
                <div className="comic-card--text">
                  <div
                    className="comics-title"
                    onClick={() => handleClickComics(comic)}
                  >
                    {comic.title}
                  </div>
                  <div className="comic-description">{comic.description}</div>
                  <div className="icon-bar">
                    {favoriteComics.length > 0 ? (
                      <span className="add-favorite">
                        <FontAwesomeIcon
                          icon="fa-solid fa-heart"
                          className={`${
                            favoriteComics.find((el) => el._id === comic._id)
                              ? "favorite"
                              : "notFavorite"
                          }`}
                          onClick={() => handleClickAddFavorite(comic)}
                        />
                      </span>
                    ) : (
                      <span className="add-favorite">
                        <FontAwesomeIcon
                          icon="fa-solid fa-heart"
                          className=" notFavorite"
                          onClick={() => handleClickAddFavorite(comic)}
                        />
                      </span>
                    )}
                    <span
                      className="cart-icon"
                      onClick={() => handleClickComics(comic)}
                    >
                      <FontAwesomeIcon icon="fa-solid fa-cart-plus" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ComicsCharacterId;
