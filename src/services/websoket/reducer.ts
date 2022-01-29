import { TOrderInfo } from "../../types/data";
import { TWs } from "./action-type";
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
} from "./constants";
export type TMessages = {
  success: boolean;
  orders: TOrderInfo[] | null;
  total: number;
  totalToday: number;
} | null;
export type TInitialState = {
  wsConnected: boolean;
  wsError: boolean;
  wsStart: boolean;
  messages: TMessages;
};
const initialState: TInitialState = {
  wsConnected: false,
  wsError: false,
  wsStart: false,
  messages: null,
};

export const wsReducer = (state = initialState, action: TWs) => {
  switch (action.type) {
    case WS_CONNECTION_START:
      return {
        ...state,
        wsError: false,
        wsConnected: false,
        wsStart: true,
      };
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsError: false,
        wsConnected: true,
        wsStart: false,
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsError: action.wsError,
        wsConnected: false,
        wsStart: false,
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsError: false,
        wsConnected: false,
        wsStart: false,
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
