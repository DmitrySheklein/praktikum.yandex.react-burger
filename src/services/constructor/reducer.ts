import {
  ADD_BUN,
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  RESET_CONSTRUCTOR,
  UPDATE_CONSTRUCTOR,
} from "./constants";
import { v4 as uuidv4 } from "uuid";
import update from "immutability-helper";
import { TProduct } from "../../types/data";
import { TConstructor } from "./action-type";

export type TInitialState = {
  bun: TProduct | null;
  ingredients: TProduct[];
};
const initialState: TInitialState = {
  bun: null,
  ingredients: [],
};

export const constructorReducer = (
  state = initialState,
  action: TConstructor
): TInitialState => {
  switch (action.type) {
    case ADD_BUN: {
      return {
        ...state,
        bun: { ...action.bun, uuid: uuidv4() },
      };
    }
    case ADD_INGREDIENT: {
      return {
        ...state,
        ingredients: [
          ...state.ingredients,
          { ...action.ingredient, uuid: uuidv4() },
        ],
      };
    }
    case REMOVE_INGREDIENT: {
      const { _id } = action.ingredient;
      let deleted = false;
      return {
        ...state,
        ingredients: state.ingredients.filter((el) => {
          if (el._id === _id && !deleted) {
            deleted = true;
            return false;
          }
          return true;
        }),
      };
    }
    case RESET_CONSTRUCTOR: {
      return {
        bun: null,
        ingredients: [],
      };
    }
    case UPDATE_CONSTRUCTOR: {
      const { dragIndex, hoverIndex } = action.value;
      const dragCard = state.ingredients[dragIndex];
      return {
        ...state,
        ingredients: update(state.ingredients, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragCard],
          ],
        }),
      };
    }
    default: {
      return state;
    }
  }
};
