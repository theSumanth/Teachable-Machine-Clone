import axios from "axios";
import { useState } from "react";

export default function useHttp(url, initialData) {
  const [isLoading, setIsLoading] = useState(false);
  const [fetchedData, setFetchedData] = useState(initialData);
  const [error, setError] = useState();

  async function fetchModel(formData) {
    setIsLoading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const res = await axios.post(url, formData, config);

      setFetchedData(res.data);
      setIsLoading(false);
    } catch (err) {
      console.log("Error details:", err);
      setError(err.response);
      setIsLoading(false);
    }
  }

  return {
    isLoading,
    fetchedData,
    error,
    fetchModel,
  };
}
