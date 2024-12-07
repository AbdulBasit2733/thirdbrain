import axios from "axios";
import React, { useEffect, useState } from "react";

const useContent = () => {
  const [contents, setContent] = useState([]);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_BASEURL}/api/v1/content/all-contents`, {
        withCredentials: true,
      })
      .then((response) => {
        setContent(response.data.success ? response.data.contents : []);
      });
  }, []);

  return contents;
};

export default useContent;
