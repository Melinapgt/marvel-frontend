import "../App.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LinesEllipsis from "react-lines-ellipsis";

const Characters = (props) => {
  //Hooks setting
  const navigate = useNavigate();

  //props
  const { data, favoriteCharactersStorage, favoriteCharactersCookies } = props;

  //cookies
  const userToken = Cookies.get("userToken");
  if (favoriteCharactersCookies)
    console.log(
      "favoriteCharactersCookies==>",
      JSON.parse(favoriteCharactersCookies)
    );

  let newFavoriteCharacters = [];

  if (favoriteCharactersCookies) {
    newFavoriteCharacters = [...JSON.parse(favoriteCharactersCookies)];
  }

  const handleClickAddFavorite = async (userToken, character) => {
    // try {
    //   if (userToken) {
    //     const response = await axios.post(
    //       " http://localhost:4001/ajout/favoris/characters",
    //       { userToken, pictureCharacter, characterName, characterId }
    //     );
    //     console.log("response.data==>", response.data);
    //   } else {
    //     navigate("/login");
    //   }
    // } catch (error) {
    //   console.log("error.response==>", error.response);
    // }

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
            const characterName = character.name;
            const characterId = character._id;

            return (
              <div key={character._id}>
                <div>
                  <div className="icon-bar">
                    {favoriteCharactersCookies ? (
                      <span className="add-favorite">
                        <FontAwesomeIcon
                          icon="fa-solid fa-heart"
                          className={`${
                            JSON.parse(favoriteCharactersCookies).find(
                              (el) => el._id === character._id
                            )
                              ? "favorite"
                              : "notFavorite"
                          }`}
                          onClick={() =>
                            handleClickAddFavorite(userToken, character)
                          }
                        />
                      </span>
                    ) : (
                      <span className="add-favorite">
                        <FontAwesomeIcon
                          icon="fa-solid fa-heart"
                          className=" notFavorite"
                          onClick={() =>
                            handleClickAddFavorite(userToken, character)
                          }
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
                    {/* <div className="character-name">
                        <p>{character.name}</p>
                      </div> */}

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
