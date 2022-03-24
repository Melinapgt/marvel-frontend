import "../App.css";
import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LinesEllipsis from "react-lines-ellipsis";

const Characters = (props) => {
  const { data } = props;

  const userToken = Cookies.get("userToken");
  const navigate = useNavigate();

  const handleClickAddFavorite = async (
    userToken,
    pictureCharacter,
    characterName,
    characterId
  ) => {
    try {
      if (userToken) {
        const response = await axios.post(
          " http://localhost:4001/ajout/favoris/characters",
          { userToken, pictureCharacter, characterName, characterId }
        );
        console.log("response.data==>", response.data);
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.log("error.response==>", error.response);
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
                  <button
                    className="add-favoris"
                    onClick={() =>
                      handleClickAddFavorite(
                        userToken,
                        pictureCharacter,
                        characterName,
                        characterId
                      )
                    }
                  >
                    Favoris
                  </button>
                  {/* <FontAwesomeIcon
                    icon="fa-solid fa-heart"
                    className="favorite-icon"
                    onClick={() => {
                      const favorites = async () => {
                        const response = await localStorage.setItem("", "");
                        if (response) {
                          console.log(response);
                        }
                      };
                      favorites().then("valeur");
                    }}
                  /> */}
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
