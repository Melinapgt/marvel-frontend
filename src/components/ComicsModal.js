import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

const ComicsModal = (props) => {
  //Props
  const { showComicsModal, selectedComic, setShowComicsModal } = props;

  //hooks setting
  const navigate = useNavigate();

  //déclaration d'un prix fixe pour la démo (le même pour chaque comics)
  const price = (23.5).toFixed(2);

  const handleClickClose = () => {
    setShowComicsModal(false);
  };

  //fonction qui permet de naviguer vers la page de paiement
  //on envoie les informations nécessaire pour la requête stripe
  const handleClickBuy = () => {
    navigate("/payment", { state: { title: selectedComic.title, price } });
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
                <p className="comic-modal--price">{price}€</p>
                <button onClick={handleClickBuy}>
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
