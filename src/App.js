import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
// import Characters from "./components/Characters";
import Home from "./pages/Home";

function App() {
  return (
    <div className="app">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/characters" element={<Characters />} /> */}
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
