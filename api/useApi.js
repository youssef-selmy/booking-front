import { useState } from "react";

const useApi = (apiFunc) => {
  const [loading, setLoading] = useState(false);
  const [globalErrors, setGlobalErrors] = useState([]);

  const request = async (...args) => {
    setLoading(true);
    setGlobalErrors([]);
    try {
      const response = await apiFunc(...args);
      return { ok: true, data: response.data };
    } catch (error) {
      console.log(error)
      const messages = error.response?.data?.errors?.map((ele) => ele.msg) || ["Something went wrong"];
      setGlobalErrors(messages);
      return { ok: false, errors: messages };
    } finally {
      setLoading(false);
    }
  };

  return { request, loading, globalErrors, setGlobalErrors };
};

export default useApi;