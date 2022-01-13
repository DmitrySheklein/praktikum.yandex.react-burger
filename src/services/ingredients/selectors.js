import { NAME } from "./constants";

export const getIngredients = (store) => store[NAME].ingredients;
export const ingredientsIsLoading = (store) => store[NAME].ingredientsRequest;
