import "../App.css";

const Signup = () => {
  return (
    <div className="signup-page">
      <div className="container-form">
        <h2>Je m'inscris</h2>
        <form className="signup-form">
          <input type="text" placeholder="Prénom" />
          <input type="text" placeholder="Nom" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Mot de passe" />
          <button type="submit">S'inscrire</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
