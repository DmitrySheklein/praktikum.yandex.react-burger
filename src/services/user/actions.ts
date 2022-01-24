import { SERVER_URL } from "../../utils/constants";
import { getCookie } from "../../utils/cookie";
import { fetchWithRefresh } from "../../utils/auth-api";
import {
  updateUserErrorAction,
  updateUserRequestAction,
  updateUserSuccessAction,
} from "./actions-type";
import { AppDispatch } from "../../types";
import { TUser } from "../../types/data";

export function updateUser({ name, password, email }: TUser) {
  return async function (dispatch: AppDispatch) {
    dispatch(updateUserRequestAction(true));
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

        dispatch(updateUserSuccessAction({ success, user }));
        dispatch(updateUserRequestAction(false));
      });
    } else {
      dispatch(updateUserErrorAction(false));
      return Promise.resolve();
    }
  };
}
