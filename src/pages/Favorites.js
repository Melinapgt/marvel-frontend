import "../App.css";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import ComicsModal from "../components/ComicsModal";

const Favorites = (props) => {
  //props
  const {
    setShowComicsModal,
    setSelectedComic,
    selectedComic,
    showComicsModal,
  } = props;

  //cookies
  const userToken = Cookies.get("userToken");

  let favoriteCharacters = [];
  if (Cookies.get("favoriteCharacter")) {
    console.log(
      "favoriteCharacter==>",
      JSON.parse(Cookies.get("favoriteCharacter"))
    );
    favoriteCharacters = JSON.parse(Cookies.get("favoriteCharacter"));
  }

  let favoriteComics = [];
  if (Cookies.get("favoriteComic")) {
    console.log(
      "favoriteComic on comics page==>",
      JSON.parse(Cookies.get("favoriteComic"))
    );
    favoriteComics = JSON.parse(Cookies.get("favoriteComic"));
  }

  //fonction qui permet d'ouvrir le modal comics
  const handleClickComics = (comic) => {
    setShowComicsModal(true);
    setSelectedComic(comic);
  };

  return userToken ? (
    <div className="favorites-page">
      <ComicsModal
        selectedComic={selectedComic}
        showComicsModal={showComicsModal}
        setSelectedComic={setSelectedComic}
        setShowComicsModal={setShowComicsModal}
      />
      <div className="container">
        <h2>
          Mes personnages favoris{" "}
          <span>{`(${favoriteCharacters.length})`}</span>
        </h2>
        {favoriteCharacters.length > 0 && (
          <div className="favorite-content">
            {favoriteCharacters.map((character, index) => {
              const pictureCharacter = `${character.thumbnail.path}.${character.thumbnail.extension}`;
              return (
                <div className="character-card" key={character._id}>
                  <div className="character-picture">
                    <img src={pictureCharacter} alt="" />
                  </div>
                  <div className="character-text">
                    <div className="character-name">{character.name}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <h2>
          Mes comics favoris{" "}
          {favoriteComics.length > 0 && (
            <span>{`(${favoriteComics.length})`}</span>
          )}
        </h2>
        {favoriteComics.length > 0 && (
          <div className="favorite-content">
            {favoriteComics.map((comic, index) => {
              const pictureComics = `${comic.thumbnail.path}.${comic.thumbnail.extension}`;
              return (
                <div
                  key={comic._id}
                  className="comic-card "
                  onClick={() => handleClickComics(comic)}
                >
                  <img src={pictureComics} alt="" />
                  <div className="comics-title">{comic.title}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default Favorites;
