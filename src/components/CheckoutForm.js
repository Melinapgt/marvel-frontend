import "../App.css";
import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import Cookies from "js-cookie";

const CheckoutForm = (props) => {
  //props
  const { amount, title } = props;

  // settings
  const stripe = useStripe();
  const elements = useElements();

  //states
  //   const [completed, setCompleted] = useState(false);
  const [data, setData] = useState();

  //Cookies
  const userId = Cookies.get("userId");
  console.log("userId cookies", userId);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // On récupère ici les données bancaires que l'utilisateur rentre
      const cardElement = elements.getElement(CardElement);

      // Demande de création d'un token via l'API Stripe
      // On envoie les données bancaires dans la requête
      const stripeResponse = await stripe.createToken(cardElement, {
        name: userId,
      });
      console.log("stripeResponse==>", stripeResponse);
      const stripeToken = stripeResponse.token.id;
      // Une fois le token reçu depuis l'API Stripe
      // Requête vers notre serveur
      // On envoie le token reçu depuis l'API Stripe
      const response = await axios.post("http://localhost:4001/pay", {
        stripeToken,
        amount: amount,
        description: title,
      });

      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.log("erreur.response checkout==>", error.response);
    }
  };

  return (
    <div className="checkout">
      {data ? (
        data.status && <div> Félicitation ! Paiement effectué ! 🎉 </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <CardElement className="cardElement" />

          <button type="submit" className="pay-btn">
            Payer
          </button>
        </form>
      )}
    </div>
  );
};

export default CheckoutForm;
