import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients/reducer";
import { consturctorReducer } from "./constructor/reducer";
import { orderReducer } from "./order/reducer";
import { currentIngredientReducer } from "./currentIngredient/reducer";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  constructorBurger: consturctorReducer,
  order: orderReducer,
  currentIngredient: currentIngredientReducer,
});
