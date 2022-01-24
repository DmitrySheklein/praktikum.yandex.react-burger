import {
  UPDATE_USER_DATA,
  UPDATE_USER_DATA_SEND,
  UPDATE_USER_DATA_ERROR,
} from "./constants";
import { TUser } from "../../types/data";

export interface IUpdateUserRequest {
  readonly type: typeof UPDATE_USER_DATA;
  payload: boolean;
}
export interface IUpdateUserData {
  readonly type: typeof UPDATE_USER_DATA_SEND;
  payload: {
    success: boolean;
    user: TUser;
  };
}

export interface IUpdateUserError {
  readonly type: typeof UPDATE_USER_DATA_ERROR;
  payload: boolean;
}
export type TUserUnion =
  | IUpdateUserRequest
  | IUpdateUserData
  | IUpdateUserError;

export const updateUserRequestAction = (
  payload: boolean
): IUpdateUserRequest => ({
  type: UPDATE_USER_DATA,
  payload,
});
export const updateUserSuccessAction = (payload: {
  success: boolean;
  user: TUser;
}): IUpdateUserData => ({
  type: UPDATE_USER_DATA_SEND,
  payload,
});
export const updateUserErrorAction = (payload: boolean): IUpdateUserError => ({
  type: UPDATE_USER_DATA_ERROR,
  payload,
});
