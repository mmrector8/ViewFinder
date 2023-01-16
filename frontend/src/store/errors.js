import { combineReducers } from "redux";
import { sessionErrorsReducer } from "./session";
import { tweetErrorsReducer } from "./tweets";

export default combineReducers({
  tweets: tweetErrorsReducer,
  session: sessionErrorsReducer,
});
