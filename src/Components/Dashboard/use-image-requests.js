import { useCallback, useState } from "react";
const BASE_URL = "http://185.100.235.210/id_verify";

function useImageRequests() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const sendRequest = useCallback(async (config) => {
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch(BASE_URL + config.url, {
        method: config.method ? config.method : "GET",
        headers: config.headers ? config.headers : {},
      });

      if (!response.ok) throw new Error("Request Failed");

      const data = await response.blob();
      const imageObjectURL = URL.createObjectURL(data);
      setImageUrl(imageObjectURL);
    } catch (err) {
      setError(err.message || "Something went wrong");
    }
    setIsLoading(false);
  }, []);
  return [sendRequest, imageUrl, isLoading, error];
}

export default useImageRequests;
