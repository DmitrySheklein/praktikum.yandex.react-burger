import {
  UPDATE_USER_DATA,
  UPDATE_USER_DATA_SEND,
  UPDATE_USER_DATA_ERROR,
} from "./constants";
import { currentUserReducer } from "./reducer";
const sampleUser = {
  name: "username",
  email: "email@mail.com",
  password: "qwerty",
};

describe("user reducer", () => {
  it("should handle UPDATE_USER_DATA_SEND", () => {
    expect(
      currentUserReducer(
        {
          data: null,
          userUpdateSending: false,
          userUpdateError: false,
        },
        {
          type: UPDATE_USER_DATA_SEND,
          payload: {
            success: true,
            user: sampleUser,
          },
        }
      )
    ).toEqual({
      data: {
        status: true,
        user: sampleUser,
      },
      userUpdateSending: false,
      userUpdateError: false,
    });
  });
  it("should handle UPDATE_USER_DATA", () => {
    expect(
      currentUserReducer(
        {
          data: null,
          userUpdateSending: false,
          userUpdateError: false,
        },
        {
          type: UPDATE_USER_DATA,
          payload: true,
        }
      )
    ).toEqual({
      data: null,
      userUpdateSending: true,
      userUpdateError: false,
    });
  });
  it("should handle UPDATE_USER_DATA_ERROR", () => {
    expect(
      currentUserReducer(
        {
          data: null,
          userUpdateSending: false,
          userUpdateError: false,
        },
        {
          type: UPDATE_USER_DATA_ERROR,
          payload: true,
        }
      )
    ).toEqual({
      data: null,
      userUpdateSending: false,
      userUpdateError: true,
    });
  });
});
