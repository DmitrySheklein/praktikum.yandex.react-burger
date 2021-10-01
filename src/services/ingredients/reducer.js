import { ADD_ITEMS } from "./actions";

const initialState = {
  ingredients: [],
};

export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEMS: {
      return {
        ...state,
        ingredients: action.data,
      };
    }
    default: {
      return state;
    }
  }
};
