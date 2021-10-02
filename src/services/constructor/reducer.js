import {
  ADD_BUN,
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  RESET_CONSTRUCTOR,
} from "./actions";

const initialState = {
  bun: null,
  ingredients: [],
};

export const consturctorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BUN: {
      return {
        ...state,
        bun: action.payload,
      };
    }
    case ADD_INGREDIENT: {
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload],
      };
    }
    case REMOVE_INGREDIENT: {
      const { _id } = action.payload;
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
    default: {
      return state;
    }
  }
};
