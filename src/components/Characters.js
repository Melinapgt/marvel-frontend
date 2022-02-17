import "../App.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Characters = (props) => {
  const { data } = props;
  return (
    <div className="characters-page">
      <div className="container">
        <div className="characters-section">
          {data.results.map((character, index) => {
            const picture = character.thumbnail;
            picture.image = `${picture.path}.${picture.extension}`; // console.log(picture);

            // console.log(character._id);
            return (
              <div key={character._id}>
                <div>
                  <FontAwesomeIcon
                    icon="fa-solid fa-heart"
                    className="favorite-icon"
                  />
                </div>
                <Link to={`/comics/${character._id}`}>
                  <div className="character-card">
                    <div className="character-avatar">
                      <div className="character-picture">
                        <img src={picture.image} alt="" />
                      </div>
                      <div className="character-name">
                        <span>{character.name}</span>
                      </div>
                    </div>
                    <div>
                      <p>{character.description}</p>
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
