import "../App.css";

const Login = () => {
  return (
    <div className="login-page">
      <div className="container-form">
        <h2>Je me connecte</h2>
        <form className="signup-form">
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Mot de passe" />
          <button type="submit">Connexion</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
