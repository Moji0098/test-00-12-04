import { combineReducers } from "redux";
import { currentVideo } from "../reducers/currentVideo";

const rootReducer = combineReducers({
  currentVideo,
});
export default rootReducer;
