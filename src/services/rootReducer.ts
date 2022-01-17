import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients/reducer";
import { constructorReducer } from "./constructor/reducer";
import { orderReducer } from "./order/reducer";
import { authReducer } from "./auth/reducer";
import { currentUserReducer } from "./user/reducer";
import { wsReducer } from "./websoket/reducer";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  constructorBurger: constructorReducer,
  order: orderReducer,
  auth: authReducer,
  currentUser: currentUserReducer,
  orders: wsReducer,
});
