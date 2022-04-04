import "../App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import ComicsModal from "../components/ComicsModal";

const Comics = (props) => {
  // Hooks settings
  const navigate = useNavigate();

  //Props
  const {
    title,
    setSelectedComic,
    selectedComic,
    favoriteComicStorage,
    showComicsModal,
    setShowComicsModal,
  } = props;

  //states
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

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
    try {
      const fetchData = async () => {
        if (title) {
          const response = await axios.get(
            `http://localhost:4001/comics?title=${title}&page=${page}`
          );
          console.log("response.data==>", response.data);
          setData(response.data);
          setIsLoading(false);
        } else {
          const response = await axios.get(
            `http://localhost:4001/comics?page=${page}`
          );
          console.log("response.data==>", response.data);
          setData(response.data);
          setIsLoading(false);
        }
      };

      fetchData();
    } catch (error) {
      console.log("error response comics ==>", error.response);
    }
  }, [title, page]);

  const refreshPage = () => {
    window.location.reload();
  };
  const newFavoriteComics = [...favoriteComics];

  // Au clic Favoris
  const handleClickAddFavorite = (comic) => {
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
        console.log("ajouté");
      }
      console.log("newFavoriteComics comicspage=+>", newFavoriteComics);
      favoriteComicStorage(JSON.stringify(newFavoriteComics));
      refreshPage();
    } else {
      navigate("/login");
    }
  };

  //Déclaration de variable
  const pageMax = 1493 / 100;

  const handleClickComics = (comic) => {
    setShowComicsModal(true);
    setSelectedComic(comic);
  };

  return isLoading ? (
    <div>En cours de chargement</div>
  ) : (
    <div className="comics-page">
      <ComicsModal
        selectedComic={selectedComic}
        showComicsModal={showComicsModal}
        setSelectedComic={setSelectedComic}
        setShowComicsModal={setShowComicsModal}
      />
      <div className="container">
        <div className="pages">
          {page > 1 && (
            <button
              onClick={() => {
                setPage(page - 1);
              }}
            >
              <FontAwesomeIcon
                className="chevron"
                icon="fa-solid fa-chevron-left"
              />
            </button>
          )}
          <div>
            {page - 1 > 0 && (
              <span
                className="prev"
                onClick={() => {
                  setPage(page - 1);
                }}
              >
                {page - 1}
              </span>
            )}
            <span className="current-page">{page}</span>
            {page < Math.ceil(pageMax) && (
              <span
                className="next"
                onClick={() => {
                  setPage(page + 1);
                }}
              >
                {page + 1}
              </span>
            )}
          </div>
          {page < Math.ceil(pageMax) && (
            <button
              onClick={() => {
                setPage(page + 1);
              }}
            >
              <FontAwesomeIcon
                className="chevron"
                icon="fa-solid fa-chevron-right"
              />
            </button>
          )}
        </div>

        <h2>MARVEL'S COMICS LIST</h2>

        <div className="card-section">
          {data.results.map((comic, index) => {
            const pictureComics = `${comic.thumbnail.path}.${comic.thumbnail.extension}`;
            return (
              <div key={comic._id}>
                <div className="comic-card ">
                  <div>
                    <img
                      className="hvr-grow"
                      onClick={() => handleClickComics(comic)}
                      src={pictureComics}
                      alt=""
                    />
                  </div>
                  <div
                    className="comics-title"
                    onClick={() => handleClickComics(comic)}
                  >
                    {comic.title}
                  </div>
                  {/* <div>{comic.description}</div> */}
                </div>

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
            );
          })}
        </div>
        <div className="pages">
          {page > 1 && (
            <button
              onClick={() => {
                setPage(page - 1);
              }}
            >
              <FontAwesomeIcon
                className="chevron"
                icon="fa-solid fa-chevron-left"
              />
            </button>
          )}
          <div>
            {page - 1 > 0 && (
              <span
                className="prev"
                onClick={() => {
                  setPage(page - 1);
                }}
              >
                {page - 1}
              </span>
            )}
            <span className="current-page">{page}</span>
            {page < Math.ceil(pageMax) && (
              <span
                className="next"
                onClick={() => {
                  setPage(page + 1);
                }}
              >
                {page + 1}
              </span>
            )}
          </div>
          {page < Math.ceil(pageMax) && (
            <button
              onClick={() => {
                setPage(page + 1);
              }}
            >
              <FontAwesomeIcon
                className="chevron"
                icon="fa-solid fa-chevron-right"
              />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comics;
