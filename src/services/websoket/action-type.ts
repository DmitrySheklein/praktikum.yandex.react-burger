import { TOrderInfo } from "../../types/data";
import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
} from "./constants";

export interface IWsConnectionStart {
  readonly type: typeof WS_CONNECTION_START;
}
export interface IWsConnectionSuccess {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}
export interface IWsConnectionError {
  readonly type: typeof WS_CONNECTION_ERROR;
  wsError: any;
}
export interface IWsConnectionClosed {
  readonly type: typeof WS_CONNECTION_CLOSED;
}
export interface IWsConnectionMsg {
  readonly type: typeof WS_GET_MESSAGE;
  messages: TOrderInfo[];
}

export type TWs =
  | IWsConnectionStart
  | IWsConnectionSuccess
  | IWsConnectionError
  | IWsConnectionClosed
  | IWsConnectionMsg;

export const wsConnectionStart = (): IWsConnectionStart => ({
  type: WS_CONNECTION_START,
});

export const wsConnectionClosed = (): IWsConnectionClosed => ({
  type: WS_CONNECTION_CLOSED,
});

export const wsConnectionMsg = (messages: TOrderInfo[]): IWsConnectionMsg => ({
  type: WS_GET_MESSAGE,
  messages,
});

export const wsConnectionError = (wsError: any): IWsConnectionError => ({
  type: WS_CONNECTION_ERROR,
  wsError,
});

export const TWsActions = {
  wsInit: WS_CONNECTION_START,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE,
};
