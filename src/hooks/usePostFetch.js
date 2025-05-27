import { useEffect, useState } from "react";
import axios from "axios";

export const usePostFetch = (ruta, body = null) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const url = `http://localhost:8080/api/${ruta}`;

      try {
        const config = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        };

        const response = await axios.post(url, body, config);

        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    if (body !== null) {
      fetchData();
    }
  }, [ruta, body]);

  return { data, error, loading };
};

export default usePostFetch;
