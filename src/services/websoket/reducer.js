import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
} from "./actions";

const initialState = {
  wsConnected: false,
  weError: false,
  messages: null,
};

export const wsReducer = (state = initialState, action) => {
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
        wsError: action.payload,
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
        messages: action.payload,
      };

    default:
      return state;
  }
};
