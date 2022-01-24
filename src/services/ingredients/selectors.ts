import { NAME } from "./constants";
import { RootState } from "../../types";

export const getIngredients = (store: RootState) => store[NAME].ingredients;
export const ingredientsIsLoading = (store: RootState) =>
  store[NAME].ingredientsRequest;
