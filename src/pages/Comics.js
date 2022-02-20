import "../App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Comics = (props) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { title } = props;
  const [page, setPage] = useState(1);
  const navigate = useNavigate;

  const userToken = Cookies.get("userToken");

  useEffect(() => {
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
  }, [title, page]);

  const handleClickAddFavorite = async (title, comicsId, userToken) => {
    // console.log("title==>", title);
    // console.log("comicsId==>", comicsId);
    console.log("userToken==>", userToken);
    try {
      if (userToken) {
        const response = await axios.post(
          " http://localhost:4001/ajout/favoris/comics",
          { title, comicsId, userToken }
        );
        console.log(response.data);
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.log("error.response==>", error.response);
    }
  };

  return isLoading ? (
    <div>En cours de chargement</div>
  ) : (
    <div className="comics-page">
      <div className="container">
        <div className="pages">
          {page > 1 && (
            <button
              onClick={() => {
                setPage(page - 1);
              }}
            >
              Page précédente
            </button>
          )}

          <button
            onClick={() => {
              setPage(page + 1);
            }}
          >
            Page suivante
          </button>
        </div>

        <div className="card-section">
          {data.results.map((comic, index) => {
            const pictureComics = `${comic.thumbnail.path}.${comic.thumbnail.extension}`;

            const comicsTitle = comic.title;
            const comicsId = comic._id;
            return (
              <div key={comic._id} className="comic-card">
                <div>
                  <button
                    className="add-favoris"
                    onClick={() =>
                      handleClickAddFavorite(comicsTitle, comicsId, userToken)
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
                <div>{comic.title}</div>
                <div>
                  <img src={pictureComics} alt="" />
                </div>
                <div>{comic.description}</div>
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
              Page précédente
            </button>
          )}

          <button
            onClick={() => {
              setPage(page + 1);
            }}
          >
            Page suivante
          </button>
        </div>
      </div>
    </div>
  );
};

export default Comics;
