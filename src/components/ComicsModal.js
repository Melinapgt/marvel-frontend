import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ComicsModal = (props) => {
  //Props
  const { showComicsModal, selectedComic, setShowComicsModal } = props;

  const handleClickClose = () => {
    setShowComicsModal(false);
  };

  return (
    showComicsModal && (
      <div className="comic-modal">
        <div className="modal">
          <div className="modal-container">
            <div className="modal-content">
              <FontAwesomeIcon
                className="cross"
                icon="fa-solid fa-x"
                onClick={handleClickClose}
              />
              <div className="modal-picture">
                <img
                  src={`${selectedComic.thumbnail.path}.${selectedComic.thumbnail.extension}`}
                  alt=""
                />
              </div>
              <div className="comic-modal--text">
                <h3>{selectedComic.title}</h3>
                <p>{selectedComic.description}</p>
                <p className="comic-modal--price">23,50€</p>
                <button>
                  ACHETER{" "}
                  <span className="hvr-icon-forward">
                    <FontAwesomeIcon
                      className="hvr-icon"
                      icon="fa-solid fa-circle-chevron-right"
                    />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ComicsModal;
