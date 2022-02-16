import "../App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Characters from "../components/Characters";

const Home = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:4001/characters");
      console.log(response.data);
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return isLoading ? (
    <div> En cours de chargement...</div>
  ) : (
    <div className="homepage">
      <div className="body-container"></div>
      Home Component
      <Characters data={data} />
    </div>
  );
};

export default Home;
