import {
  ADD_BUN,
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  RESET_CONSTRUCTOR,
  UPDATE_CONSTRUCTOR,
} from "./actions";
import { v4 as uuidv4 } from "uuid";
import update from "immutability-helper";

const initialState = {
  bun: null,
  ingredients: [],
};

export const consturctorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BUN: {
      return {
        ...state,
        bun: { ...action.payload, uuid: uuidv4() },
      };
    }
    case ADD_INGREDIENT: {
      return {
        ...state,
        ingredients: [
          ...state.ingredients,
          { ...action.payload, uuid: uuidv4() },
        ],
      };
    }
    case REMOVE_INGREDIENT: {
      const { _id } = action.payload;
      let deleted = false;
      return {
        ...state,
        ingredients: state.ingredients.filter(el => {
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
      const { dragIndex, hoverIndex } = action.payload;
      const dragCard = state.ingredients[dragIndex];
      console.log("ids", dragIndex, hoverIndex);
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
