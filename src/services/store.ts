import { createStore, applyMiddleware, compose } from "redux";
import { rootReducer } from "./rootReducer";
import thunk from "redux-thunk";
import { WS_URL } from "../utils/constants";
import { TWsActions } from "./websoket/action-type";
import { socketMiddleware } from "./websoket/socketMiddleware";

const composeEnhancers =
  (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk, socketMiddleware(WS_URL, TWsActions))
);
export default createStore(rootReducer, enhancer);
