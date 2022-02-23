import { useState, useEffect } from "react";
import axios from "axios";

const useData = () => {
  const [loading, setLoading] = useState(false);
  const [videosList, setVideosList] = useState([]);

  const getData = () => {
    try {
      const api = "http://api.aparat.com/fa/v1/video/video/mostViewedVideos";
      setLoading(true);
      axios(api)
        .then((res) => {
          const { data } = res?.data;
          setVideosList(data);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
          alert("error");
        });
    } catch (e) {
      alert("error");
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return { loading, videosList };
};

export default useData;
