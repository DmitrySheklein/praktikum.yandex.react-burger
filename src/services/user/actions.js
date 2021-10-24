import { SERVER_URL } from "../../utils/constants";
import { getCookie } from "../../utils/cookie";
import { fetchWithRefresh } from "../../utils/auth-api";
export const name = "currentUser";

export const ActionTypes = {
  UPDATE_USER_DATA: `${name}/UPDATE_USER_DATA`,
  UPDATE_USER_DATA_SEND: `${name}/UPDATE_USER_DATA_SEND`,
  UPDATE_USER_DATA_ERROR: `${name}/UPDATE_USER_DATA_ERROR`,
};

export function updateUser({ name, password, email }) {
  return async function (dispatch) {
    dispatch({
      type: ActionTypes.UPDATE_USER_DATA_SEND,
      payload: true,
    });
    const token = localStorage.getItem("refreshToken");
    if (token) {
      return fetchWithRefresh(`${SERVER_URL}/auth/user`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("accessToken")}`,
        },
        body: JSON.stringify({ name, email, password }),
      }).then((res) => {
        const { user, success } = res;
        dispatch({
          type: ActionTypes.UPDATE_USER_DATA,
          payload: { success, user },
        });
        dispatch({
          type: ActionTypes.UPDATE_USER_DATA_SEND,
          payload: false,
        });
      });
    } else {
      dispatch({
        type: ActionTypes.UPDATE_USER_DATA_ERROR,
        payload: false,
      });
      return Promise.resolve();
    }
  };
}
