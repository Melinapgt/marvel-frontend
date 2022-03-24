import "../App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Characters from "../components/Characters";
import Hero from "../components/Hero";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Home = (props) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const { comicsName } = props;

  useEffect(() => {
    const fetchData = async () => {
      if (comicsName) {
        const response = await axios.get(
          `http://localhost:4001/characters?name=${comicsName}&page=${page}`
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } else {
        const response = await axios.get(
          `http://localhost:4001/characters?page=${page}`
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
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
        <Characters data={data} />
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
