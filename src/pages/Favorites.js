import "../App.css";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

const Favorites = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const userToken = Cookies.get("userToken");

  useEffect(() => {
    const fetchData = async () => {
      console.log("cookies ==>", userToken);
      const response = await axios.get(
        `http://localhost:4001/favoris?userToken=${userToken}`
      );
      console.log("response.data ==>", response.data);
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, [userToken]);
  return userToken ? (
    isLoading ? (
      <div>En cours de chargement</div>
    ) : (
      <div className="favorites-page">
        <div className="container">
          <div>
            Mes personnages favoris <span>Nb</span>
          </div>
          {data.favoritesCharacters.map((character, index) => {
            return (
              <div className="favorite-characters" key={character.characterId}>
                <div className="character-name">{character.characterName}</div>
                <img src={character.pictureCharacter} alt="" />
              </div>
            );
          })}
          <div>
            Mes comics favoris <span>Nb</span>
          </div>
          {data.favoritesComics.map((comic, index) => {
            return (
              <div key={comic.comicsId}>
                <div>{comic.title}</div>
                <img src={comic.pictureComics} alt="" />
              </div>
            );
          })}
        </div>
      </div>
    )
  ) : (
    <Navigate to="/login" />
  );
};

export default Favorites;
