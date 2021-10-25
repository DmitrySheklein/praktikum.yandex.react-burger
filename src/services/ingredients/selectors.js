import { name } from "./actions";

export const getIngredients = (store) => store[name].ingredients;
export const ingredientsIsLoading = (store) => store[name].ingredientsRequest;
