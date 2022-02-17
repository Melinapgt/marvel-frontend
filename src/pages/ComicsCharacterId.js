import "../App.css";

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ComicsCharacterId = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { characterId } = useParams();

  //   console.log("params==>", characterId);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `http://localhost:4001/comics/${characterId}`
      );
      console.log(response.data);
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, [characterId]);
  return isLoading ? (
    <div>En cours de chargement ...</div>
  ) : (
    <div className="comic-characterId-page">
      <div className="container">
        {data.comics.map((comic, index) => {
          const comicPicture = `${comic.thumbnail.path}.${comic.thumbnail.extension}`;
          return (
            <div key={comic._id}>
              <div className="comic-card">
                <div>
                  <FontAwesomeIcon
                    icon="fa-solid fa-heart"
                    className="favorite-icon"
                  />
                </div>
                <div>{comic.title}</div>
                <div>
                  <div className="comic-picture">
                    <img src={comicPicture} alt="" />
                  </div>
                  <div>{comic.description}</div>
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
