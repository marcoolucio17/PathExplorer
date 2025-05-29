import { useState, useCallback } from "react";
import axios from "axios";

/**
 * hook simple para POST con loading, error, data, y una función trigger
 * @returns { triggerPost, data, loading, error }
 */
export const usePost = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const triggerPost = useCallback(async (ruta, body) => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
        const isFormData = body instanceof FormData;

        const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            ...(isFormData ? {} : { "Content-Type": "application/json" }),
        },
        };

        const response = await axios.post(
        `http://localhost:8080/${ruta}`,
        body,
        config
        );

      setData(response.data);
      return response.data; // optional return
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { triggerPost, data, error, loading };
};

export default usePost;
