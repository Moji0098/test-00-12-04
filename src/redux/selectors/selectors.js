import { useSelector, shallowEqual } from "react-redux";

const useCurrentVideo = () => useSelector((state) => state, shallowEqual);

export { useCurrentVideo };
