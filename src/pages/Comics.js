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
  const { title, setSelectedComic, selectedComic } = props;

  //states
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [showComicsModal, setShowComicsModal] = useState(false);
  const [page, setPage] = useState(1);

  //Cookies
  const userToken = Cookies.get("userToken");

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

  // Au clic Favoris
  const handleClickAddFavorite = async (
    title,
    comicsId,
    userToken,
    pictureComics,
    comicsDescription
  ) => {
    // console.log("title==>", title);
    // console.log("comicsId==>", comicsId);
    console.log("userToken==>", userToken);
    try {
      if (userToken) {
        const response = await axios.post(
          "http://localhost:4001/ajout/favoris/comics",
          { title, comicsId, userToken, pictureComics, comicsDescription }
        );
        console.log(response.data);
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.log("error.response==>", error.response);
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

            const comicsTitle = comic.title;
            const comicsId = comic._id;
            const comicsDescription = comic.description;
            return (
              <div
                key={comic._id}
                onClick={() => handleClickComics(comic)}
                className="comic-card "
              >
                <div>
                  <button
                    className="add-favoris"
                    onClick={() =>
                      handleClickAddFavorite(
                        comicsTitle,
                        comicsId,
                        userToken,
                        pictureComics,
                        comicsDescription
                      )
                    }
                  >
                    Favoris
                  </button>
                  {/* <FontAwesomeIcon
                  icon="fa-solid fa-heart"
                  className="favorite-icon"
                  onClick={() => handleClickAddFavorite(title, comicsId)}
                /> */}
                </div>

                <div>
                  <img className="hvr-grow" src={pictureComics} alt="" />
                </div>
                <div className="comics-title">{comic.title}</div>
                {/* <div>{comic.description}</div> */}
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
