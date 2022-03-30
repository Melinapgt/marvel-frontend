import "../App.css";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import ComicsModal from "../components/ComicsModal";

const Favorites = (props) => {
  //props
  const {
    favoriteComicsCookies,
    favoriteCharactersCookies,
    setShowComicsModal,
    setSelectedComic,
    selectedComic,
    showComicsModal,
  } = props;

  //cookies
  const userToken = Cookies.get("userToken");

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
          Mes personnages favoris <span>Nb</span>
        </h2>
        {favoriteCharactersCookies && (
          <div className="favorite-content">
            {" "}
            {JSON.parse(favoriteCharactersCookies).map((character, index) => {
              const pictureCharacter = `${character.thumbnail.path}.${character.thumbnail.extension}`;
              return (
                <div className="charachter-card" key={character._id}>
                  <div className="character-name">{character.name}</div>
                  <div className="character-picture">
                    <img src={pictureCharacter} alt="" />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <h2>
          Mes comics favoris{" "}
          <span>{`(${JSON.parse(favoriteComicsCookies).length})`}</span>
        </h2>
        <div className="favorite-content">
          {JSON.parse(favoriteComicsCookies).map((comic, index) => {
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
      </div>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default Favorites;
