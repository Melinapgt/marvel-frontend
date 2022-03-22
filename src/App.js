import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import ComicsCharacterId from "./pages/ComicsCharacterId";
import Comics from "./pages/Comics";
import { useState } from "react";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Cookies from "js-cookie";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faChevronLeft,
  faChevronRight,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
library.add(faHeart, faChevronRight, faChevronLeft);

function App() {
  const [title, setTitle] = useState("");
  const [comicsName, setComicsName] = useState("");
  const [userToken, setUserToken] = useState(Cookies.get("userToken") || null);
  // const [username, setUsername] = useState("");

  const setUser = (userToken) => {
    if (userToken) {
      Cookies.set("userToken", userToken, { expires: 10 });
    } else {
      Cookies.remove("userToken");
    }

    setUserToken(userToken);
  };

  // const setUsernameCookies = (username) => {
  //   if (username) {
  //     Cookies.set("username", username, { expires: 10 });
  //   }
  // };

  return (
    <div className="app">
      <Router>
        <Header
          setTitle={setTitle}
          setComicsName={setComicsName}
          userToken={userToken}
          setUser={setUser}
        />
        <Routes>
          <Route path="/" element={<Home comicsName={comicsName} />} />
          <Route path="/comics/:characterId" element={<ComicsCharacterId />} />
          <Route path="/comics" element={<Comics title={title} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
