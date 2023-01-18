import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import errorsReducer from "./errors"
import uiReducer from "./ui";
import locationReducer from "./location";
import usersReducer from "./user";
import spotsReducer from "./spot";


const rootReducer = combineReducers({
  session: sessionReducer,
  errors: errorsReducer,
  ui: uiReducer,
  locations: locationReducer,
  users: usersReducer,
  spots: spotsReducer
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
