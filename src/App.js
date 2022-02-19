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
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
library.add(faHeart);

function App() {
  const [title, setTitle] = useState("");
  const [comicsName, setComicsName] = useState("");

  return (
    <div className="app">
      <Router>
        <Header setTitle={setTitle} setComicsName={setComicsName} />
        <Routes>
          <Route path="/" element={<Home comicsName={comicsName} />} />
          <Route path="/comics/:characterId" element={<ComicsCharacterId />} />
          <Route path="/comics" element={<Comics title={title} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
