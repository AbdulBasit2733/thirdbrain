import axios from "axios";
import React, { useEffect, useState } from "react";
import BACKEND_URL from "../../config";

const useContent = () => {
  const [contents, setContent] = useState([]);
  console.log(contents);
  
  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/content/content`, {
        withCredentials: true,
      })
      .then((response) => {
        setContent(response.data.contents);
      });
  }, []);

  return contents;
};

export default useContent;
