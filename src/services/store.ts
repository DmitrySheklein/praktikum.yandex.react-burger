import { createStore, applyMiddleware, compose } from "redux";
import { rootReducer } from "./rootReducer";
import thunk from "redux-thunk";

const composeEnhancers =
  (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const enhancer = composeEnhancers(applyMiddleware(thunk));
const store = createStore(rootReducer, enhancer);

export default store;
