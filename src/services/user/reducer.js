import { ActionTypes } from "./actions";

const initialState = {
  data: null,
  userUpdateSending: false,
  userUpdateError: false,
};

export const currentUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.UPDATE_USER_DATA:
      return {
        ...state,
        data: { status: action.payload.success, user: action.payload.user },
      };
    case ActionTypes.UPDATE_USER_DATA_SEND:
      return {
        ...state,
        userUpdateSending: action.payload,
        userUpdateError: false,
      };
    case ActionTypes.UPDATE_USER_DATA_ERROR:
      return {
        ...state,
        userUpdateError: action.payload,
        userUpdateSending: false,
      };

    default:
      return state;
  }
};
