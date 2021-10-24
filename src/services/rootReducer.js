import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients/reducer";
import { consturctorReducer } from "./constructor/reducer";
import { orderReducer } from "./order/reducer";
import { authReducer } from "./auth/reducer";
import { currentUserReducer } from "./user/reducer";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  constructorBurger: consturctorReducer,
  order: orderReducer,
  auth: authReducer,
  currentUser: currentUserReducer,
});
