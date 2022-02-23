import React from "react";
// redux
import { useCurrentVideo } from "./redux/selectors/selectors";
// components
import VideoPlayer from "./components/VideoPlayer";
import Loading from "./components/Loading";
//controller
import useData from "./controller/useData";
// css
import "./App.css";

const App = () => {
  const { loading, videosList } = useData();
  const { active } = useCurrentVideo()?.currentVideo || { active: false };

  const renderList = () => {
    if (!loading && Array.isArray(videosList) && videosList.length > 0) {
      return videosList.map((item) => {
        const { id } = item;
        const activeCondition = +id === +active;
        return <VideoPlayer key={id} item={item} isPlay={activeCondition} />;
      });
    } else if (
      !loading &&
      ((Array.isArray(videosList) && videosList.length === 0) || !videosList)
    ) {
      return <p className="no-result">No Results</p>;
    } else return <Loading />;
  };

  return (
    <div className="video-list-parent">
      <h3 className="title">
        First, in Some Browser You Need to Have Interact With Browser to Play
        Video, for Example <button>Click on it</button>
      </h3>
      <div className="video-list-child">{renderList()}</div>
    </div>
  );
};

export default App;
