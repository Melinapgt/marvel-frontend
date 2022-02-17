import "../App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Characters from "../components/Characters";

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
      <div className="container"></div>
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
      <Characters data={data} />
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
  );
};

export default Home;
