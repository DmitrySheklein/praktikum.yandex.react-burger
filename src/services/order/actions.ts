import { SERVER_URL } from "../../utils/constants";
import { resetConstructorAction } from "../constructor/action-type";
import {
  createOrderRequestAction,
  createOrderSuccessAction,
  createOrderFailedAction,
} from "./action-type";
import { AppDispatch } from "../../types";
import { getCookie } from "../../utils/cookie";

export const createOrder = (
  data: {
    ingredients: (string | undefined)[];
  },
  setStartedOrder: (status: boolean) => void
) => {
  return async function (dispatch: AppDispatch) {
    try {
      dispatch(createOrderRequestAction());
      const res = await fetch(`${SERVER_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("accessToken")}`,
        },

        body: JSON.stringify(data),
      });
      const isJson =
        // @ts-ignore
        res.headers.get("content-type").indexOf("application/json") !== -1;
      if (!res.ok) {
        throw new Error("Ответ сети не ok");
      }
      if (!isJson) {
        throw new Error("Ответ сети не json");
      }
      const json = await res.json();
      if (json.success) {
        dispatch(createOrderSuccessAction(json));
        dispatch(resetConstructorAction());
        setStartedOrder(true);
      }
    } catch (error: any) {
      console.log(error.message);
      dispatch(createOrderFailedAction());
    }
  };
};
