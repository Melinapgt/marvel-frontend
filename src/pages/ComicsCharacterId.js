import "../App.css";

import axios from "axios";
import { useEffect, useState } from "react";

const ComicsCharacterId = (props) => {
  const { characterid } = props;
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  console.log(props);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios;
    };
  }, []);
  return <div>ComicsCharacterId Component</div>;
};

export default ComicsCharacterId;
