import { SET_CURRENT_INGREDIENT, RESET_CURRENT_INGREDIENT } from "./actions";

const initialState = {
  current: null,
};

export const currentIngredientReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_INGREDIENT: {
      return {
        ...state,
        current: action.payload,
      };
    }
    case RESET_CURRENT_INGREDIENT: {
      return {
        ...state,
        current: null,
      };
    }
    default: {
      return state;
    }
  }
};
