import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
/**
 * hook simple para GET con loading, error y data
 * @param {string} ruta
 * @returns data, loading & error
 */
export const useFetch = (ruta, body = null) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      let url = `https://pathexplorer-backend.onrender.com/api/${ruta}`;
    try {
      let response;
      const config = {
        headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      if (body && typeof body === "string") {
        response = await axios.get(url, body, config);
      } else {
        response = await axios.get(url, config);
      }
      setData(response.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
    };
    fetchData();
  }, [ruta]);

  return { data, error, loading };
};

export default useFetch;
