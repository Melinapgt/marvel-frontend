import axios from "axios";
import { useEffect, useState } from "react";
import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Comics = (props) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { title } = props;
  const [page, setPage] = useState(1);

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
            return (
              <div key={comic._id} className="comic-card">
                <div>
                  <FontAwesomeIcon
                    icon="fa-solid fa-heart"
                    className="favorite-icon"
                  />
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
