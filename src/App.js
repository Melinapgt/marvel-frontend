import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import ComicsCharacterId from "./pages/ComicsCharacterId";
import Comics from "./pages/Comics";
import { useState } from "react";

function App() {
  const [title, setTitle] = useState("");
  const [comicsName, setComicsName] = useState("");

  return (
    <div className="app">
      <Router>
        <Header setTitle={setTitle} setComicsName={setComicsName} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/comics/:characterId" element={<ComicsCharacterId />} />
          <Route path="/comics" element={<Comics />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
