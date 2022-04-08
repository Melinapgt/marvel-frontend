import "../App.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import LinesEllipsis from "react-lines-ellipsis";

const Characters = (props) => {
  //Hooks setting
  const navigate = useNavigate();

  //props
  const { data, favoriteCharactersStorage } = props;

  //cookies
  const userToken = Cookies.get("userToken");

  let favoriteCharacters = [];
  if (Cookies.get("favoriteCharacter")) {
    // console.log(
    //   "favoriteCharacter on characters page==>",
    //   JSON.parse(Cookies.get("favoriteCharacter"))
    // );
    favoriteCharacters = JSON.parse(Cookies.get("favoriteCharacter"));
  }

  const newFavoriteCharacters = [...favoriteCharacters];

  //Fonction qui ajoute ou supprime un favoris
  //si le personnage est déjà présent dans le cookies alors il est supprimé
  const handleClickAddFavorite = (character) => {
    if (userToken) {
      if (newFavoriteCharacters.find((el) => el._id === character._id)) {
        for (let i = 0; i < newFavoriteCharacters.length; i++) {
          if (newFavoriteCharacters[i]._id === character._id) {
            newFavoriteCharacters.splice(i, 1);
            break;
          }
        }
      } else {
        newFavoriteCharacters.push(character);
      }
      favoriteCharactersStorage(JSON.stringify(newFavoriteCharacters));
    } else {
      navigate("/login");
    }
  };
  return (
    <div className="characters-page">
      <div className="container">
        <div className="characters-section">
          {data.results.map((character, index) => {
            const pictureCharacter = `${character.thumbnail.path}.${character.thumbnail.extension}`;

            return (
              <div key={character._id}>
                <div>
                  <div className="icon-bar">
                    {favoriteCharacters.length > 0 ? (
                      <span className="add-favorite">
                        <FontAwesomeIcon
                          icon="fa-solid fa-heart"
                          className={`${
                            favoriteCharacters.find(
                              (el) => el._id === character._id
                            )
                              ? "favorite"
                              : "notFavorite"
                          }`}
                          onClick={() => handleClickAddFavorite(character)}
                        />
                      </span>
                    ) : (
                      <span className="add-favorite">
                        <FontAwesomeIcon
                          icon="fa-solid fa-heart"
                          className=" notFavorite"
                          onClick={() => handleClickAddFavorite(character)}
                        />
                      </span>
                    )}
                  </div>
                </div>
                <Link
                  to={`/comics/${character._id}`}
                  className="link-characterId-comics"
                >
                  <div className="character-card hvr-grow">
                    <div className="character-picture">
                      <img src={pictureCharacter} alt="" />
                    </div>
                    <div className="character-text">
                      <div className="character-name">
                        <p>{character.name}</p>
                      </div>

                      <LinesEllipsis
                        text={character.description}
                        maxLine="3"
                        ellipsis="..."
                        trimRight
                        basedOn="letters"
                      />
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Characters;
