import axios from "axios";
import { useEffect, useState } from "react";
import "../App.css";

const Comics = (props) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { title } = props;
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:4001/comics");
      console.log("response.data==>", response.data);
      setData(response.data);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return isLoading ? (
    <div>En cours de chargement</div>
  ) : (
    <div className="comics-page">
      <div className="container">
        {data.results.map((comic, index) => {
          const pictureComics = `${comic.thumbnail.path}.${comic.thumbnail.extension}`;
          return (
            <div key={comic._id} className="comic-card">
              <div>{comic.title}</div>
              <div>
                <img src={pictureComics} alt="" />
              </div>
              <div>{comic.description}</div>
            </div>
          );
        })}
      </div>
      Comics Component
    </div>
  );
};

export default Comics;
