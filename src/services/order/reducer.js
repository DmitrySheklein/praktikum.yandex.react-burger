import { CREATE_ORDER } from "./actions";

const initialState = {
  orderInfo: null,
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ORDER: {
      return {
        ...state,
        orderInfo: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
