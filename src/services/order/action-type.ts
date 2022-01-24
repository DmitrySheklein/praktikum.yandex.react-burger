import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILED,
} from "./constants";
import { TOrderCreated } from "../../types/data";

export interface ICreateOrderRequest {
  readonly type: typeof CREATE_ORDER_REQUEST;
}
export interface ICreateOrderSuccess {
  readonly type: typeof CREATE_ORDER_SUCCESS;
  order: TOrderCreated;
}
export interface ICreateOrderFailed {
  readonly type: typeof CREATE_ORDER_FAILED;
}

export type TOrder =
  | ICreateOrderRequest
  | ICreateOrderSuccess
  | ICreateOrderFailed;

export const createOrderRequestAction = (): ICreateOrderRequest => ({
  type: CREATE_ORDER_REQUEST,
});
export const createOrderSuccessAction = (
  order: TOrderCreated
): ICreateOrderSuccess => ({
  type: CREATE_ORDER_SUCCESS,
  order,
});
export const createOrderFailedAction = (): ICreateOrderFailed => ({
  type: CREATE_ORDER_FAILED,
});
