import { LOAD_ITEMS, LOAD_ITEMS_SUCCESS, LOAD_ITEMS_FAILED } from "./constants";
import { TProduct } from "../../types/data";
import { TIngredient } from "./action-types";

type TInitialState = {
  ingredients: TProduct[];
  ingredientsRequest: boolean;
  ingredientsFailed: boolean;
};
const initialState: TInitialState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
};

export const ingredientsReducer = (
  state = initialState,
  action: TIngredient
) => {
  switch (action.type) {
    case LOAD_ITEMS_SUCCESS: {
      return {
        ...state,
        ingredients: action.data,
        ingredientsRequest: false,
        ingredientsFailed: false,
      };
    }
    case LOAD_ITEMS: {
      return {
        ...state,
        ingredientsRequest: true,
        ingredientsFailed: false,
      };
    }
    case LOAD_ITEMS_FAILED: {
      return {
        ...state,
        ingredientsRequest: false,
        ingredientsFailed: true,
      };
    }
    default: {
      return state;
    }
  }
};
