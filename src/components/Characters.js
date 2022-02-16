import "../App.css";

const Characters = (props) => {
  const { data } = props;
  return (
    <div className="characters-page">
      <div className="container">
        <div className="characters-section">
          {data.results.map((character, index) => {
            return (
              <div key={character._id}>
                <div className="character-card">
                  <div className="character-picture">
                    {/* <img src={character.thumbnail.path} alt="" /> */}
                  </div>
                  <div className="character-name">
                    <span>{character.name}</span>
                  </div>
                  <div>
                    <p>{character.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      Characters Component
    </div>
  );
};

export default Characters;
