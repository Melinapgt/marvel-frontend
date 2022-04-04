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
  faCartPlus,
  faChevronLeft,
  faChevronRight,
  faCircleChevronRight,
  faHeart,
  faX,
} from "@fortawesome/free-solid-svg-icons";
library.add(
  faHeart,
  faChevronRight,
  faChevronLeft,
  faX,
  faCircleChevronRight,
  faCartPlus
);

function App() {
  //States
  const [title, setTitle] = useState("");
  const [comicsName, setComicsName] = useState("");
  const [selectedComic, setSelectedComic] = useState();
  const [showComicsModal, setShowComicsModal] = useState(false);
  const [userToken, setUserToken] = useState(Cookies.get("userToken") || null);

  //Paramétrage des Cookies
  const setUser = (userToken) => {
    if (userToken) {
      Cookies.set("userToken", userToken, { expires: 10 });
    } else {
      Cookies.remove("userToken");
    }

    setUserToken(userToken);
  };

  const favoriteComicStorage = (favoriteComics) => {
    // console.log("favoriteComics app ==>", favoriteComics);
    if (favoriteComics) {
      Cookies.set("favoriteComic", favoriteComics);
    }
  };

  const favoriteCharactersStorage = (favoriteCharacters) => {
    if (favoriteCharacters) {
      Cookies.set("favoriteCharacter", favoriteCharacters);
    }
  };

  // const favoriteCharactersStorage = (favoriteCharacters) => {
  //   if (favoriteCharacters) {
  //     Cookies.set("favoriteCharacter", favoriteCharacters);
  //   } else {
  //     Cookies.remove("favoriteCharacter");

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
          <Route
            path="/"
            element={
              <Home
                comicsName={comicsName}
                favoriteCharactersStorage={favoriteCharactersStorage}
              />
            }
          />
          <Route
            path="/comics/:characterId"
            element={
              <ComicsCharacterId
                setSelectedComic={setSelectedComic}
                setShowComicsModal={setShowComicsModal}
                showComicsModal={showComicsModal}
                selectedComic={selectedComic}
              />
            }
          />
          <Route
            path="/comics"
            element={
              <Comics
                title={title}
                setSelectedComic={setSelectedComic}
                selectedComic={selectedComic}
                favoriteComicStorage={favoriteComicStorage}
                showComicsModal={showComicsModal}
                setShowComicsModal={setShowComicsModal}
              />
            }
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route
            path="/favorites"
            element={
              <Favorites
                setShowComicsModal={setShowComicsModal}
                setSelectedComic={setSelectedComic}
                showComicsModal={showComicsModal}
                selectedComic={selectedComic}
              />
            }
          />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
