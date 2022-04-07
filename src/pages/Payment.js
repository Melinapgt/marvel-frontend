import "../App.css";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import { Navigate, useLocation } from "react-router-dom";

const Payment = (props) => {
  //props
  const { userToken } = props;

  //settings
  const location = useLocation();
  const { title, price } = location.state;

  const stripePromise = loadStripe(
    "pk_test_51KTR1zEtls8MP1LlERgTW0CJ9wbgMKswat63tpxgpqXfexMOnkCrpBbIPuJqPJM06XMHsUFvIrrsO7TSfH4dcjx200luWHPDrt"
  );

  const total = (Number(price) + 2 + 4).toFixed(2);

  return userToken ? (
    <Elements stripe={stripePromise}>
      <div className="payment-page">
        <div className="container">
          <div className="payment-card">
            <div className="payment-recap">
              <div className="title-payment">Résumé de la commande</div>
              <div className="payment-infos">
                <p>
                  Commande <span>{price}€</span>
                </p>
                <p>
                  Frais protection acheteurs <span>2.00€</span>
                </p>
                <p>
                  Frais de port <span>4.00€</span>
                </p>
              </div>
            </div>
            {/* ----------------------------------------------- */}
            <div className="divider"></div>
            <div className="total">
              <p>
                Total <span>{total} €</span>
              </p>
            </div>
            <div className="payment-section">
              <p>
                Il ne vous reste plus qu'un étape pour vous offrir
                <span> {title}</span>. Vous allez payer <span> 29,50 € </span>{" "}
                (frais de protection et frais de port inclus).
              </p>
              <div className="divider"></div>
              <div>
                <CheckoutForm amount={total} title={title} />
              </div>
            </div>

            {/* ----------------------------------------------- */}
          </div>
        </div>
      </div>
    </Elements>
  ) : (
    <Navigate to="/login" />
  );
};

export default Payment;
