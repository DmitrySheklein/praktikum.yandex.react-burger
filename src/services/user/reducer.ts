import {
  UPDATE_USER_DATA_ERROR,
  UPDATE_USER_DATA_SEND,
  UPDATE_USER_DATA,
} from "./constants";
import { TUserUnion } from "./actions-type";
import { TUser } from "../../types/data";

export type TInitialStateUser = {
  data: {
    status: boolean;
    user: TUser;
  } | null;
  userUpdateSending: boolean;
  userUpdateError: boolean;
};
const initialState: TInitialStateUser = {
  data: null,
  userUpdateSending: false,
  userUpdateError: false,
};

export const currentUserReducer = (
  state = initialState,
  action: TUserUnion
): TInitialStateUser => {
  switch (action.type) {
    case UPDATE_USER_DATA_SEND:
      return {
        ...state,
        data: { status: action.payload.success, user: action.payload.user },
      };
    case UPDATE_USER_DATA:
      return {
        ...state,
        userUpdateSending: action.payload,
        userUpdateError: false,
      };
    case UPDATE_USER_DATA_ERROR:
      return {
        ...state,
        userUpdateError: action.payload,
        userUpdateSending: false,
      };

    default:
      return state;
  }
};
