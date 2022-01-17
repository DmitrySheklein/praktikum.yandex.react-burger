import { NAME } from "./constants";

export const getIngredients = (store: any) => store[NAME].ingredients;
export const ingredientsIsLoading = (store: any) =>
  store[NAME].ingredientsRequest;
