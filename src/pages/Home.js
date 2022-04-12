import "../App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Characters from "../components/Characters";
import Hero from "../components/Hero";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Home = (props) => {
  //props
  const { comicsName, favoriteCharactersStorage } = props;

  //states
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  //Requête au chargement de la page
  useEffect(() => {
    const fetchData = async () => {
      if (comicsName) {
        try {
          const response = await axios.get(
            `https://marvel-comics-backend.herokuapp.com/characters?name=${comicsName}&page=${page}`
          );
          console.log(response.data);
          setData(response.data);
          setIsLoading(false);
        } catch (error) {
          console.log("error home ==>", error.response);
        }
      } else {
        try {
          const response = await axios.get(
            `https://marvel-comics-backend.herokuapp.com/characters?page=${page}`
          );
          console.log(response.data);
          setData(response.data);
          setIsLoading(false);
        } catch (error) {
          console.log("error home ==>", error.response);
        }
      }
    };
    fetchData();
  }, [comicsName, page]);

  return isLoading ? (
    <div> En cours de chargement...</div>
  ) : (
    <div className="homepage">
      <Hero />
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

            <span
              className="next"
              onClick={() => {
                setPage(page + 1);
              }}
            >
              {page + 1}
            </span>
          </div>
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
        </div>
        <h2>MARVEL'S CHARACTERS LIST</h2>
        <Characters
          data={data}
          favoriteCharactersStorage={favoriteCharactersStorage}
        />
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

            <span
              className="next"
              onClick={() => {
                setPage(page + 1);
              }}
            >
              {page + 1}
            </span>
          </div>
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
        </div>
      </div>
    </div>
  );
};

export default Home;
