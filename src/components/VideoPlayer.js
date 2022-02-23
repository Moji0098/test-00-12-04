import React, { useState, useEffect, useRef } from "react";
import { Waypoint } from "react-waypoint";
// redux
import { useDispatch } from "react-redux";
import { useCurrentVideo } from "./../redux/selectors/selectors";
import {
  AddVideoIsInViewAction,
  RemoveVideoIsNotInViewAction,
} from "../redux/actions/currentVideo";

const VideoPlayer = React.memo(({ item, isPlay = false }) => {
  const [isScrolling, setIsScrolling] = useState(false);
  const [upIsEnter, setUpIsEnter] = useState(false);
  const [downIsEnter, setDownIsEnter] = useState(false);

  const vidRef = useRef();
  const video_box = useRef();
  const topElem = useRef();
  const bottomElem = useRef();

  const { preview_src, id } = item?.attributes;
  const videosInView = useCurrentVideo()?.currentVideo?.list;

  const dispatch = useDispatch();

  const scrolling = () => setIsScrolling(true);
  useEffect(() => {
    try {
      window.addEventListener("scroll", scrolling);
      const handleActiveVideo = () => {
        // const BOX = video_box?.current?.getBoundingClientRect();
        // const TOP = BOX ? BOX?.top : 0;
        // const BOTTOM = BOX ? BOX?.bottom : 0;
        // we can use getBoundingClientRect,
        // but i think my solution is better!

        const TOP_ELEM = topElem?.current?.offsetTop;
        const BOTTOM_ELEM = bottomElem?.current?.offsetTop;
        const TOP = TOP_ELEM || 0;
        const BOTTOM = BOTTOM_ELEM || 0;

        if (upIsEnter && downIsEnter) {
          const existedId = videosInView.find((item) => +item?.id === +id);
          if (!existedId) {
            dispatch(AddVideoIsInViewAction({ id, top: TOP, bottom: BOTTOM }));
          }
        } else {
          const existedId = videosInView.find((item) => +item?.id === +id);
          if (existedId) {
            dispatch(
              RemoveVideoIsNotInViewAction({ id, top: TOP, bottom: BOTTOM })
            );
          }
        }
      };
      handleActiveVideo();
    } catch (e) {
      alert("error");
    }
    return () => window.addEventListener("scroll", scrolling);
  }, [upIsEnter, downIsEnter, isScrolling]);

  const handleEnterViewportUp = () => {
    if (!upIsEnter) {
      setUpIsEnter(true);
    }
  };
  const handleExitViewportUp = () => {
    if (upIsEnter) {
      setUpIsEnter(false);
    }
  };

  const handleEnterViewportDown = () => {
    if (!downIsEnter) {
      setDownIsEnter(true);
    }
  };

  const handleExitViewportDown = () => {
    if (downIsEnter) {
      setDownIsEnter(false);
    }
  };

  useEffect(() => {
    try {
      if (isPlay) vidRef?.current?.play();
      else vidRef?.current?.pause();
    } catch (e) {
      alert("error");
    }
  }, [isPlay]);

  return (
    <div className="video-box" ref={video_box}>
      <span className="top-elem" ref={topElem}></span>
      <span className="bottom-elem" ref={bottomElem}></span>
      <Waypoint
        onEnter={handleEnterViewportUp}
        onLeave={handleExitViewportUp}
      />
      <video
        className="video-player"
        loop
        ref={vidRef}
        src={preview_src || null}
        type="video/mp4"
      />
      <Waypoint
        onEnter={handleEnterViewportDown}
        onLeave={handleExitViewportDown}
      />
    </div>
  );
});

export default VideoPlayer;
