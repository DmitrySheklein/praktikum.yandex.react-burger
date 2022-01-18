import { TOrderInfo } from "../../types/data";
import { TWs } from "./action-type";
import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
} from "./constants";

export type TInitialState = {
  wsConnected: boolean;
  weError: boolean;
  messages: TOrderInfo[] | null;
};
const initialState: TInitialState = {
  wsConnected: false,
  weError: false,
  messages: null,
};

export const wsReducer = (state = initialState, action: TWs) => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsError: false,
        wsConnected: true,
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsError: action.wsError,
        wsConnected: false,
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsError: false,
        wsConnected: false,
      };

    case WS_GET_MESSAGE:
      return {
        ...state,
        wsError: false,
        messages: action.messages,
      };

    default:
      return state;
  }
};
