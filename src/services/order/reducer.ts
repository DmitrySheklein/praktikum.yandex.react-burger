import {
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_FAILED,
} from "./constants";
import { TOrderInfo } from "../../types/data";
import { TOrder } from "./action-type";

type TInitialState = {
  orderInfo: TOrderInfo | null;
  orderRequest: boolean;
  orderFailed: boolean;
};
const initialState: TInitialState = {
  orderInfo: null,
  orderRequest: false,
  orderFailed: false,
};

export const orderReducer = (state = initialState, action: TOrder) => {
  switch (action.type) {
    case CREATE_ORDER_SUCCESS: {
      return {
        ...state,
        orderInfo: action.order,
      };
    }
    case CREATE_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
        orderFailed: false,
      };
    }
    case CREATE_ORDER_FAILED: {
      return {
        ...state,
        orderFailed: true,
        orderRequest: false,
      };
    }
    default: {
      return state;
    }
  }
};
