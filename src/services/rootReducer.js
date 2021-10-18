import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients/reducer";
import { consturctorReducer } from "./constructor/reducer";
import { orderReducer } from "./order/reducer";
import { currentIngredientReducer } from "./currentIngredient/reducer";
import { authReducer } from "./auth/reducer";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  constructorBurger: consturctorReducer,
  order: orderReducer,
  currentIngredient: currentIngredientReducer,
  auth: authReducer,
});
